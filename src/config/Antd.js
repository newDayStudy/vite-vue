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
    .use(Table);
}
export default antdRegisterComponent;
