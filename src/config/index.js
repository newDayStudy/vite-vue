import {
  Button,
  Tab,
  Form,
  Col,
  Row
} from 'vant'
function registerComponent(app) {
  app.use(Button).use(Col).use(Row)
}
export default registerComponent


