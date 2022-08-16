import {
  Button,
  Col,
  Row,
  Layout,
  ConfigProvider,
  Checkbox,
  Input,
  Form,
  Table,
  Card,
  DatePicker,
  Divider,
  Modal,
  List,
  Collapse,
} from "ant-design-vue";
function antdRegisterComponent(app) {
  app
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
    .use(Table);
}
export default antdRegisterComponent;
