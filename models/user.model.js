module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      subscriptionkey:{
        type:Sequelize.STRING,
        default:0
      },
      useractive:{
        type:Sequelize.INTEGER,
        default:0
      },
      paymentactive:{
        type:Sequelize.INTEGER,
        default:0
      }
    });
  
    return User;
  };