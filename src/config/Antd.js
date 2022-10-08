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
} from "ant-design-vue";
function antdRegisterComponent(app) {
  app
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
