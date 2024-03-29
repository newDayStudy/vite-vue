// Backbone.ModelBinder v0.1.5
// (c) 2012 Bart Wood
// Distributed Under MIT License

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["underscore", "jquery", "backbone"], factory);
  } else {
    // Browser globals
    factory(_, $, Backbone);
  }
})((_, $, Backbone) => {
  if (!Backbone) {
    throw "Please include Backbone.js before Backbone.ModelBinder.js";
  }

  Backbone.ModelBinder = function () {
    _.bindAll(this);
  };

  // Current version of the library.
  Backbone.ModelBinder.VERSION = "0.1.5";
  Backbone.ModelBinder.Constants = {};
  Backbone.ModelBinder.Constants.ModelToView = "ModelToView";
  Backbone.ModelBinder.Constants.ViewToModel = "ViewToModel";

  _.extend(Backbone.ModelBinder.prototype, {
    bind(model, rootEl, attributeBindings) {
      this.unbind();

      this._model = model;
      this._rootEl = rootEl;

      if (!this._model) throw "model must be specified";
      if (!this._rootEl) throw "rootEl must be specified";

      if (attributeBindings) {
        // Create a deep clone of the attribute bindings
        this._attributeBindings = $.extend(true, {}, attributeBindings);

        this._initializeAttributeBindings();
        this._initializeElBindings();
      } else {
        this._initializeDefaultBindings();
      }

      this._bindModelToView();
      this._bindViewToModel();
    },

    unbind() {
      this._unbindModelToView();
      this._unbindViewToModel();

      if (this._attributeBindings) {
        delete this._attributeBindings;
        this._attributeBindings = undefined;
      }
    },

    // Converts the input bindings, which might just be empty or strings, to binding objects
    _initializeAttributeBindings() {
      var attributeBindingKey,
        inputBinding,
        attributeBinding,
        elementBindingCount,
        elementBinding;

      for (attributeBindingKey in this._attributeBindings) {
        inputBinding = this._attributeBindings[attributeBindingKey];

        if (_.isString(inputBinding)) {
          attributeBinding = { elementBindings: [{ selector: inputBinding }] };
        } else if (_.isArray(inputBinding)) {
          attributeBinding = { elementBindings: inputBinding };
        } else if (_.isObject(inputBinding)) {
          attributeBinding = { elementBindings: [inputBinding] };
        } else {
          throw "Unsupported type passed to Model Binder " + attributeBinding;
        }

        // Add a linkage from the element binding back to the attribute binding
        for (
          elementBindingCount = 0;
          elementBindingCount < attributeBinding.elementBindings.length;
          elementBindingCount++
        ) {
          elementBinding =
            attributeBinding.elementBindings[elementBindingCount];
          elementBinding.attributeBinding = attributeBinding;
        }

        attributeBinding.attributeName = attributeBindingKey;
        this._attributeBindings[attributeBindingKey] = attributeBinding;
      }
    },

    // If the bindings are not specified, the default binding is performed on the name attribute
    _initializeDefaultBindings() {
      var elCount, namedEls, namedEl, name;
      this._attributeBindings = {};
      namedEls = $("[name]", this._rootEl);

      for (elCount = 0; elCount < namedEls.length; elCount++) {
        namedEl = namedEls[elCount];
        name = $(namedEl).attr("name");

        // For elements like radio buttons we only want a single attribute binding with possibly multiple element bindings
        if (!this._attributeBindings[name]) {
          var attributeBinding = { attributeName: name };
          attributeBinding.elementBindings = [
            { attributeBinding, boundEls: [namedEl] },
          ];
          this._attributeBindings[name] = attributeBinding;
        } else {
          this._attributeBindings[name].elementBindings.push({
            attributeBinding: this._attributeBindings[name],
            boundEls: [namedEl],
          });
        }
      }
    },

    _initializeElBindings() {
      var bindingKey,
        attributeBinding,
        bindingCount,
        elementBinding,
        foundEls,
        elCount,
        el;
      for (bindingKey in this._attributeBindings) {
        attributeBinding = this._attributeBindings[bindingKey];

        for (
          bindingCount = 0;
          bindingCount < attributeBinding.elementBindings.length;
          bindingCount++
        ) {
          elementBinding = attributeBinding.elementBindings[bindingCount];
          if (elementBinding.selector === "") {
            foundEls = $(this._rootEl);
          } else {
            foundEls = $(elementBinding.selector, this._rootEl);
          }

          if (foundEls.length === 0) {
            throw (
              "Bad binding found. No elements returned for binding selector " +
              elementBinding.selector
            );
          } else {
            elementBinding.boundEls = [];
            for (elCount = 0; elCount < foundEls.length; elCount++) {
              el = foundEls[elCount];
              elementBinding.boundEls.push(el);
            }
          }
        }
      }
    },

    _bindModelToView() {
      this._model.on("change", this._onModelChange, this);

      this.copyModelAttributesToView();
    },

    // attributesToCopy is an optional parameter - if empty, all attributes
    // that are bound will be copied.  Otherwise, only attributeBindings specified
    // in the attributesToCopy are copied.
    copyModelAttributesToView(attributesToCopy) {
      var attributeName, attributeBinding;

      for (attributeName in this._attributeBindings) {
        if (
          attributesToCopy === undefined ||
          _.indexOf(attributesToCopy, attributeName) !== -1
        ) {
          attributeBinding = this._attributeBindings[attributeName];
          this._copyModelToView(attributeBinding);
        }
      }
    },

    _unbindModelToView() {
      if (this._model) {
        this._model.off("change", this._onModelChange);
        this._model = undefined;
      }
    },

    _bindViewToModel() {
      $(this._rootEl).delegate("", "change", this._onElChanged);
      // The change event doesn't work properly for contenteditable elements - but blur does
      $(this._rootEl).delegate("[contenteditable]", "blur", this._onElChanged);
    },

    _unbindViewToModel() {
      if (this._rootEl) {
        $(this._rootEl).undelegate("", "change", this._onElChanged);
        $(this._rootEl).undelegate(
          "[contenteditable]",
          "blur",
          this._onElChanged
        );
      }
    },

    _onElChanged(event) {
      var el, elBindings, elBindingCount, elBinding;

      el = $(event.target)[0];
      elBindings = this._getElBindings(el);

      for (
        elBindingCount = 0;
        elBindingCount < elBindings.length;
        elBindingCount++
      ) {
        elBinding = elBindings[elBindingCount];
        if (this._isBindingUserEditable(elBinding)) {
          this._copyViewToModel(elBinding, el);
        }
      }
    },

    _isBindingUserEditable(elBinding) {
      return (
        elBinding.elAttribute === undefined ||
        elBinding.elAttribute === "text" ||
        elBinding.elAttribute === "html"
      );
    },

    _getElBindings(findEl) {
      var attributeName,
        attributeBinding,
        elementBindingCount,
        elementBinding,
        boundElCount,
        boundEl;
      var elBindings = [];

      for (attributeName in this._attributeBindings) {
        attributeBinding = this._attributeBindings[attributeName];

        for (
          elementBindingCount = 0;
          elementBindingCount < attributeBinding.elementBindings.length;
          elementBindingCount++
        ) {
          elementBinding =
            attributeBinding.elementBindings[elementBindingCount];

          for (
            boundElCount = 0;
            boundElCount < elementBinding.boundEls.length;
            boundElCount++
          ) {
            boundEl = elementBinding.boundEls[boundElCount];

            if (boundEl === findEl) {
              elBindings.push(elementBinding);
            }
          }
        }
      }

      return elBindings;
    },

    _onModelChange() {
      var changedAttribute, attributeBinding;

      for (changedAttribute in this._model.changedAttributes()) {
        attributeBinding = this._attributeBindings[changedAttribute];

        if (attributeBinding) {
          this._copyModelToView(attributeBinding);
        }
      }
    },

    _copyModelToView(attributeBinding) {
      var elementBindingCount, elementBinding, boundElCount, boundEl;
      var value = this._model.get(attributeBinding.attributeName);

      for (
        elementBindingCount = 0;
        elementBindingCount < attributeBinding.elementBindings.length;
        elementBindingCount++
      ) {
        elementBinding = attributeBinding.elementBindings[elementBindingCount];

        if (!elementBinding.isSetting) {
          var convertedValue = this._getConvertedValue(
            Backbone.ModelBinder.Constants.ModelToView,
            elementBinding,
            value
          );

          for (
            boundElCount = 0;
            boundElCount < elementBinding.boundEls.length;
            boundElCount++
          ) {
            boundEl = elementBinding.boundEls[boundElCount];
            this._setEl($(boundEl), elementBinding, convertedValue);
          }
        }
      }
    },

    _setEl(el, elementBinding, convertedValue) {
      if (elementBinding.elAttribute) {
        this._setElAttribute(el, elementBinding, convertedValue);
      } else {
        this._setElValue(el, convertedValue);
      }
    },

    _setElAttribute(el, elementBinding, convertedValue) {
      switch (elementBinding.elAttribute) {
        case "html":
          el.html(convertedValue);
          break;
        case "text":
          el.text(convertedValue);
          break;
        case "enabled":
          el.attr("disabled", !convertedValue);
          break;
        case "displayed":
          el[convertedValue ? "show" : "hide"]();
          break;
        case "hidden":
          el[convertedValue ? "hide" : "show"]();
          break;
        case "css":
          el.css(elementBinding.cssAttribute, convertedValue);
          break;
        case "class":
          var previousValue = this._model.previous(
            elementBinding.attributeBinding.attributeName
          );
          if (!_.isUndefined(previousValue)) {
            previousValue = this._getConvertedValue(
              Backbone.ModelBinder.Constants.ModelToView,
              elementBinding,
              previousValue
            );
            el.removeClass(previousValue);
          }

          if (convertedValue) {
            el.addClass(convertedValue);
          }
          break;
        default:
          el.attr(elementBinding.elAttribute, convertedValue);
      }
    },

    _setElValue(el, convertedValue) {
      if (el.attr("type")) {
        switch (el.attr("type")) {
          case "radio":
            if (el.val() === convertedValue) {
              el.attr("checked", "checked");
            }
            break;
          case "checkbox":
            if (convertedValue) {
              el.attr("checked", "checked");
            } else {
              el.removeAttr("checked");
            }
            break;
          default:
            el.val(convertedValue);
        }
      } else if (el.is("input") || el.is("select") || el.is("textarea")) {
        el.val(convertedValue);
      } else {
        el.text(convertedValue);
      }
    },

    _copyViewToModel(elementBinding, el) {
      if (!elementBinding.isSetting) {
        elementBinding.isSetting = true;
        this._setModel(elementBinding, $(el));

        if (elementBinding.converter) {
          this._copyModelToView(elementBinding.attributeBinding);
        }

        elementBinding.isSetting = false;
      }
    },

    _getElValue(elementBinding, el) {
      switch (el.attr("type")) {
        case "checkbox":
          return el.prop("checked") ? true : false;
        default:
          if (el.attr("contenteditable") !== undefined) {
            return el.html();
          }
          return el.val();
      }
    },

    _setModel(elementBinding, el) {
      var data = {};
      var elVal = this._getElValue(elementBinding, el);
      elVal = this._getConvertedValue(
        Backbone.ModelBinder.Constants.ViewToModel,
        elementBinding,
        elVal
      );
      data[elementBinding.attributeBinding.attributeName] = elVal;
      this._model.set(data, { changeSource: "ModelBinder" });
    },

    _getConvertedValue(direction, elementBinding, value) {
      if (elementBinding.converter) {
        value = elementBinding.converter(
          direction,
          value,
          elementBinding.attributeBinding.attributeName,
          this._model
        );
      }

      return value;
    },
  });

  Backbone.ModelBinder.CollectionConverter = function (collection) {
    this._collection = collection;

    if (!this._collection) {
      throw "Collection must be defined";
    }
    _.bindAll(this, "convert");
  };

  _.extend(Backbone.ModelBinder.CollectionConverter.prototype, {
    convert(direction, value) {
      if (direction === Backbone.ModelBinder.Constants.ModelToView) {
        return value ? value.id : undefined;
      }
      return this._collection.get(value);
    },
  });

  // A static helper function to create a default set of bindings that you can customize before calling the bind() function
  // rootEl - where to find all of the bound elements
  // attributeType - probably 'name' or 'id' in most cases
  // converter(optional) - the default converter you want applied to all your bindings
  // elAttribute(optional) - the default elAttribute you want applied to all your bindings
  Backbone.ModelBinder.createDefaultBindings = function (
    rootEl,
    attributeType,
    converter,
    elAttribute
  ) {
    var foundEls, elCount, foundEl, attributeName;
    var bindings = {};

    foundEls = $("[" + attributeType + "]", rootEl);

    for (elCount = 0; elCount < foundEls.length; elCount++) {
      foundEl = foundEls[elCount];
      attributeName = $(foundEl).attr(attributeType);

      if (!bindings[attributeName]) {
        var attributeBinding = {
          selector: "[" + attributeType + '="' + attributeName + '"]',
        };
        bindings[attributeName] = attributeBinding;

        if (converter) {
          bindings[attributeName].converter = converter;
        }

        if (elAttribute) {
          bindings[attributeName].elAttribute = elAttribute;
        }
      }
    }

    return bindings;
  };

  // Helps you to combine 2 sets of bindings
  Backbone.ModelBinder.combineBindings = function (destination, source) {
    _.each(source, (value, key) => {
      var elementBinding = { selector: value.selector };

      if (value.converter) {
        elementBinding.converter = value.converter;
      }

      if (value.elAttribute) {
        elementBinding.elAttribute = value.elAttribute;
      }

      if (!destination[key]) {
        destination[key] = elementBinding;
      } else {
        destination[key] = [destination[key], elementBinding];
      }
    });
  };

  return Backbone.ModelBinder;
});
