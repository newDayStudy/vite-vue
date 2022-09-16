import instance from "./http";
export const getTableData = (params) => instance.post("getArticleList", params);
export const deleteRowData = (params) => instance.post("deleteArticle", params);
export const addQuestion = (params) => instance.post("addQuestion", params);
export const getQuestion = (params) => instance.get("getQuestion", params);
export const addAnswer = (params) => instance.post("addAnswer", params);
export const getTopic = (params) => instance.get("/getTopic", params);
export const exportExcel = (params) => instance.post("/export", params);
export const getUsers = (params) => instance.post("/getUsers", params);
export const addUser = (params) => instance.post("/addUser", params);
export const getMenus = (params) => instance.get("/getMenus", params);
export const addMenu = (params) => instance.post("/addMenu", params);
export const updateArticle = (params) =>
  instance.post("/updateArticle", params);

export const getRoles = (params) => instance.get("/getRoles", params);
export const getMenuByUserId = (params) =>
  instance.post("/getMenuByUserId", params);
