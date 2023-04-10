module.exports = (sequelize, Sequelize) => {
    const CallHistory = sequelize.define("call_history", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      professionaluserId: {
        type: Sequelize.STRING
      },
      calluserId: {
        type: Sequelize.STRING
      },
      starttime:{
        type: Sequelize.STRING
      },
      endtime:{
        type: Sequelize.STRING
      },
      rating:{
        type: Sequelize.STRING
      },
      comments:{
        type: Sequelize.STRING
      },
      activate:{
        type: Sequelize.INTEGER
      }
    });
  
    return CallHistory;
  
    };