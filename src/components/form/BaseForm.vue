<script>
import { h } from "vue";
import componentMap from "./FormItem";
import { Form, FormItem, Row, Col } from "ant-design-vue";
export default {
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
    formProps: {
      type: Object,
      default() {
        return {};
      },
    },
    formItems: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, slots }) {
    return () =>
      h(
        Form,
        {
          ref: "ruleForm",
          model: props.modelValue,
          ...props.formProps,
        },
        {
          default: () => [
            h(
              Row,
              {
                gutter: 20,
              },
              {
                default: () => [
                  props.formItems.map((item) => {
                    const componentName = componentMap.get(item.type);
                    return h(
                      Col,
                      {
                        span: item.col || 8,
                      },
                      {
                        default: () => [
                          h(
                            FormItem,
                            {
                              key: item.formItemProps.name,
                              ...item.formItemProps,
                            },
                            {
                              default: () => [
                                item.customRender
                                  ? h(item.customRender(item))
                                  : h(componentName, {
                                      value:
                                        props.modelValue[
                                          item.formItemProps.name
                                        ],
                                      onChange(e) {
                                        props.modelValue[
                                          item.formItemProps.name
                                        ] = e.target.value;
                                      },
                                      placeholder: "请输入",
                                      allowClear: true,
                                      disabled: false,
                                      ...item.comProps,
                                      ...item.comOns,
                                    }),
                              ],
                            }
                          ),
                        ],
                      }
                    );
                  }),
                ],
              }
            ),
            slots.default && slots.default(),
          ],
        }
      );
  },
};
</script>
