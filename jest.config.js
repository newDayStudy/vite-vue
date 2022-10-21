// 单元测试https://juejin.cn/post/7043812248988418084
module.exports = {
  testEnvironment: "jsdom",

  moduleFileExtensions: ["js", "vue"],
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.js?$": "babel-jest",
    "^.+\\.vue?$": "@vue/vue3-jest",
  },
  testMatch: ["<rootDir>/__tests__/**/*.spec.js"],

  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.{js,vue}", "!src/main.js", "!src/App.vue"],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 80,
      lines: 90,
      statements: 80,
    },
  },
};
