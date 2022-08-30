module.exports = {
  server: {
    port: 8080
  },
  database: {
    url: `mongodb://localhost:27017/library`,
    properties: {
    }
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpireInSeconds: 1440
  },
  pagination: {
    defaultPage: 1,
    defaultLimit: 10
  }
};