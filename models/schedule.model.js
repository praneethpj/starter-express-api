module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER
    },
    day:{
      type: Sequelize.STRING
    },
    time:{
      type: Sequelize.STRING
    },
     
    activate:{
      type: Sequelize.INTEGER
    }
  });

  return Schedule;

  };