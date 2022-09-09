<script>
import { defineComponent, h, isReactive } from "vue";
import componentMap from "./FormItem";
import { Form, FormItem } from "ant-design-vue";
export default defineComponent({
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
        return {
          layout: "inline",
        };
      },
    },
    formItems: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit, slots }) {
    console.log(isReactive(props.modelValue));
    return () =>
      h(
        Form,
        {
          model: props.modelValue,
          ...props.formProps,
        },
        [
          props.formItems.map((item) => {
            const componentName = componentMap.get(item.type);
            const name =
              item.formItemProps.name.charAt(0).toUpperCase() +
              item.formItemProps.name.substring(1);
            return h(
              FormItem,
              {
                key: item.formItemProps.name,
                ...item.formItemProps,
              },
              [
                item.customRender
                  ? h(item.customRender(item))
                  : h(componentName, {
                      [`model${name}`]:
                        props.modelValue[item.formItemProps.name],
                      ...item.comProps,
                      ...item.comOns,
                    }),
              ]
            );
          }),
          slots.default && slots.default(),
        ]
      );
  },
});
</script>
