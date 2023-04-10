module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("call_schedule", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      clientId:{
        type: Sequelize.INTEGER
      },
      dateval:{
        type: Sequelize.STRING
      },
      time:{
        type: Sequelize.STRING
      },
      starttime:{
        type: Sequelize.STRING
      },
      paymentId:{
        type: Sequelize.INTEGER
      },
      activate:{
        type: Sequelize.INTEGER
      }
    });
  
    return Schedule;
  
    };