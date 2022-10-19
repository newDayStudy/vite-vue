import {
  Button,
  Col,
  Row,
  Layout,
  ConfigProvider,
  Checkbox,
  Input,
  InputPassword,
  InputNumber,
  Form,
  Table,
  Card,
  DatePicker,
  Divider,
  Modal,
  List,
  Collapse,
  Menu,
  Spin,
  notification,
  TreeSelect,
  Select,
  Drawer,
  Tree,
  Calendar,
  Tabs,
} from "ant-design-vue";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileAddOutlined,
} from "@ant-design/icons-vue";
function antdRegisterComponent(app) {
  app
    .component("UserOutlined", UserOutlined)
    .component("borderless-table-outlined", BorderlessTableOutlined)
    .component("file-add-outlined", FileAddOutlined);

  app
    .use(Tabs)
    .use(Calendar)
    .use(Tree)
    .use(Drawer)
    .use(Select)
    .use(TreeSelect)
    .use(InputNumber)
    .use(InputPassword)
    .use(Spin)
    .use(Button)
    .use(Col)
    .use(Row)
    .use(Layout)
    .use(ConfigProvider)
    .use(Checkbox)
    .use(Input)
    .use(Form)
    .use(Card)
    .use(DatePicker)
    .use(Divider)
    .use(Modal)
    .use(List)
    .use(Collapse)
    .use(Menu)
    .use(Table);

  app.config.globalProperties.notification = notification;
}
export default antdRegisterComponent;
