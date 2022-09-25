module.exports = {
  server: {
    port: 8080,
  },
  database: {
    url: `mongodb://localhost:27017/library`,
    properties: {},
  },
  key: {
    privateKey: "37LvDSm4XvjYOh9Y",
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
  },
};
