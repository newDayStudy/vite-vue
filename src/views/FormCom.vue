<script setup>
import { reactive, ref, unref, onMounted } from "vue";
import Form from "@/components/form/Form";
import { addQuestion, getQuestion, addAnswer } from "@/apis";
const formItems = reactive([
  {
    key: "title",
    formItemProps: {
      label: "问题名称",
      rules: [{ required: true, message: "请输入问题名称" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入问题名称",
      allowClear: true,
    },
  },
  {
    key: "sort",
    formItemProps: {
      label: "排序",
      rules: [{ required: true, message: "请输入排序" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入排序",
      allowClear: true,
    },
  },
  {
    key: "type",
    formItemProps: {
      label: "选择类型",
    },
    type: "Select",
    slotProps: {
      placeholder: "请选择类型",
      allowClear: true,
      model: "value",
      style: {
        width: "200px",
      },
      options: [
        { label: "单选框(Radio)", value: 1 },
        { label: "多选款(Checkbox)", value: 0 },
      ],
    },
  },
  {
    key: "publisher",
    formItemProps: {
      label: "发布人",
      rules: [{ required: true, message: "请输入发布人" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入发布人",
      allowClear: true,
    },
  },
]);
const formRef = ref(null);

const add = () => {
  const form = unref(formRef);
  form.onsubmit();
};

const onsubmit = async (values) => {
  const res = await addQuestion(values);
  if (res.code == 200) {
    alert("添加成功");
  }
};

const formItems1 = reactive([
  {
    key: "title",
    formItemProps: {
      label: "选项名称",
      rules: [{ required: true, message: "请输入选项名称" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入选项名称",
      allowClear: true,
    },
  },
  {
    key: "sort",
    formItemProps: {
      label: "排序",
      rules: [{ required: true, message: "请输入排序" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入排序",
      allowClear: true,
    },
  },
  {
    key: "publisher",
    formItemProps: {
      label: "发布人",
      rules: [{ required: true, message: "请输入发布人" }],
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请输入发布人",
      allowClear: true,
    },
  },

  {
    key: "score",
    formItemProps: {
      label: "分数",
    },
    type: "Input",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请选择",
      allowClear: true,
    },
  },
  {
    key: "question_id",
    formItemProps: {
      label: "对应问题",
      rules: [{ required: true, message: "请选择对应问题" }],
    },
    type: "Select",
    defaultValue: "",
    slotProps: {
      model: "value",
      placeholder: "请选择",
      allowClear: true,
      style: {
        width: "200px",
      },
      options: [],
    },
  },
]);

const visible = ref(false);

const question = async () => {
  const res = await getQuestion();
  if (res.code == 200) {
    formItems1[formItems1.length - 1].slotProps.options = res.data.map(
      (item) => {
        return {
          label: item.title,
          value: item.id,
        };
      }
    );
    visible.value = true;
  }
};

onMounted(question);

const formRef1 = ref(null);
const add1 = () => {
  const form = unref(formRef1);
  form.onsubmit();
};
const onsubmit1 = async (values) => {
  const res = await addAnswer(values);
  if (res.code == 200) {
    alert("添加成功");
  }
};
const activeKey = ref("1");
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <a-collapse v-model:activeKey="activeKey" accordion>
        <a-collapse-panel key="1" a-collapse-panel header="添加问题">
          <Form
            ref="formRef"
            :item-list="formItems"
            :form-props="{ layout: 'vertical' }"
            @submit="onsubmit"
          >
            <template #footer>
              <a-form-item>
                <a-button type="primary" @click="add">添加问题</a-button>
              </a-form-item>
            </template>
          </Form>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="添加选项">
          <Form
            v-if="visible"
            ref="formRef1"
            :item-list="formItems1"
            :form-props="{ layout: 'vertical' }"
            @submit="onsubmit1"
          >
            <template #footer>
              <a-form-item>
                <a-button type="primary" @click="add1">添加选项</a-button>
              </a-form-item>
            </template>
          </Form>
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </a-layout>
</template>
<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
</style>
