import { defineComponent, isReactive, ref } from "vue";
import formItemMap from "./FormItem";
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => {},
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    formProps: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const createFormItem = (item) => {
      // 组件 必须用v-model:value, 否则无法绑定值
      const componentName = formItemMap.get(item.type);
      return (
        <a-col>
          <a-form-item {...item.formItemProps}>
            {item.customRender ? (
              item.customRender(item)
            ) : (
              <componentName
                v-model:value={props.modelValue[item.formItemProps.name]}
                {...{ ...(item.comProps || {}), ...(item.comOns || {}) }}
              />
            )}
          </a-form-item>
        </a-col>
      );
    };
    return () => (
      <a-form model={props.modelValue} {...props.formProps}>
        <a-row>
          {props.formItems.map((item) => {
            if (Array.isArray(item)) {
              return item.map((item) => {
                return createFormItem(item);
              });
            }
            return createFormItem(item);
          })}
        </a-row>
      </a-form>
    );
  },
});
