module.exports = (sequelize, Sequelize) => {
  const Userurl = sequelize.define("user_urls", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    videoId: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    url:{
      type: Sequelize.STRING
    },
    playonstart:{
      type: Sequelize.BOOLEAN
    },
    playonmid:{
      type: Sequelize.BOOLEAN
    },
    playonend:{
      type: Sequelize.BOOLEAN
    },
    playonperiod:{
      type: Sequelize.DOUBLE
    },
    activate:{
      type: Sequelize.INTEGER
    }
  });

  return Userurl;

  };