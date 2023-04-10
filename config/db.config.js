module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "timetotalk2",
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 30000, // set the connect timeout to 30 seconds (30000 milliseconds)
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };