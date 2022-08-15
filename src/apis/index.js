import instance from "./http";
export default {
  getTableData(params) {
    return instance.post("getArticleList", params);
  },
  deleteRowData(params) {
    return instance.post("deleteArticle", params);
  },
};
