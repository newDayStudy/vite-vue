import articleList from "../../data/articleList.json";
import Menus from "../../data/menus.json";
import question from "../../data/question.json";
import topic from "../../data/topic.json";
import users from "../../data/user.json";
function handleDeep(data) {
  const newArr = [...data];
  const length = newArr.length;
  const values = [];
  for (const k of newArr) {
    k.children = [];
    for (const j of newArr) {
      if (k.id == j.parent_id) {
        j.used = true;
        k.children.push(j);
      }
    }
    values.push(k);
  }
  return data.filter((item) => !item.used);
}
export default [
  {
    url: "/getMenuByUserId",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: handleDeep(Menus),
      };
    },
  },
  {
    url: "/getArticleList",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: {
          total: 5,
          records: articleList,
        },
      };
    },
  },
  {
    url: "/getQuestion",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: question,
      };
    },
  },
  {
    url: "/getTopic",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: topic,
      };
    },
  },
  {
    url: "/getUsers",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: users,
      };
    },
  },
];
