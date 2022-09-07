import instance from "./http";
export const getTableData = (params) => instance.post("getArticleList", params);
export const deleteRowData = (params) => instance.post("deleteArticle", params);
export const addQuestion = (params) => instance.post("addQuestion", params);
export const getQuestion = (params) => instance.get("getQuestion", params);
export const addAnswer = (params) => instance.post("addAnswer", params);
export const getTopic = (params) => instance.get("/getTopic", params);
export const exportExcel = (params) => instance.post("/export", params);
export const updateArticle = (params) =>
  instance.post("/updateArticle", params);
export default {
  getTableData(params) {
    return instance.post("getArticleList", params);
  },
  deleteRowData(params) {
    return instance.post("deleteArticle", params);
  },
  addQuestion(params) {
    return instance.post("addQuestion", params);
  },
};
