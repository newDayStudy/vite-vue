import { Button, Col, Row } from "vant";
function vantRegisterComponent(app) {
  app.use(Button).use(Col).use(Row);
}
export default vantRegisterComponent;
