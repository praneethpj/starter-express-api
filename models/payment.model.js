module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER
      },
      paypaltoken:{
        type: Sequelize.STRING
      },
      dateval:{
        type: Sequelize.DATE
      },
      time:{
        type: Sequelize.STRING
      },
      userfee:{
        type: Sequelize.DOUBLE
      },
      taxfee:{
        type: Sequelize.DOUBLE
      },
      platformfee:{
        type: Sequelize.DOUBLE
      },
      totalfee:{
        type: Sequelize.DOUBLE
      },
      paymentstatus:{
        type: Sequelize.INTEGER
      }
    });
  
    return Payment;
  };