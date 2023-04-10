module.exports = (sequelize, Sequelize) => {
    const Notifications = sequelize.define("notifications", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title:{
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      calldate:{
        type: Sequelize.STRING
      },
      calltime:{
        type: Sequelize.STRING
      },
      paymentId:{
        type: Sequelize.INTEGER
      },
      status:{
        type: Sequelize.INTEGER
      }
    });
  
    return Notifications;
  
    };