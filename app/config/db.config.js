module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_api_wa_gateway",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };