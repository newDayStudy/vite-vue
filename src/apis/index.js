import http from "./http";

export const getTableData = (params) => http.post("getArticleList", params);
export const deleteRowData = (params) => http.post("deleteArticle", params);
export const addQuestion = (params) => http.post("addQuestion", params);
export const getQuestion = (params) => http.get("getQuestion", params);
export const addAnswer = (params) => http.post("addAnswer", params);
export const getTopic = (params) => http.get("/getTopic", params);
export const exportExcel = (params) => http.post("/export", params);
export const getUsers = (params) => http.post("/getUsers", params);
export const addUser = (params) => http.post("/addUser", params);
export const getMenus = (params) => http.get("/getMenus", params);
export const addMenu = (params) => http.post("/addMenu", params);
export const updateMenu = (params) => http.post("/updateMenu", params);
export const deleteMenu = (params) => http.post("/deleteMenu", params);
export const updateArticle = (params) => http.post("/updateArticle", params);
export const getRoles = (params) => http.get("/getRoles", params);
export const getMenuByUserId = (params) =>
  http.post("/getMenuByUserId", params);
export const setIp = (params) => http.post("/setIp", params);
export const getIp = (params) => http.get("/getIp", params);
export const answer = (params) => http.post("/answer", params);
export const setRoles = (params) => http.post("/setRoles", params);
export const getUserRole = (params) => http.post("/getUserRole", params);
export const getRolesByRoleId = (params) =>
  http.post("/getRolesByRoleId", params);
export const login = (params) => http.post("/login", params);
