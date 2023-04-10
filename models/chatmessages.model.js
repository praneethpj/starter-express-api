module.exports = (sequelize, Sequelize) => {
    const ChatMessages = sequelize.define("chatmessages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
      },
      targetClientId: {
        type: Sequelize.STRING,
      },
      isText: {
        type: Sequelize.BOOLEAN,
      },
      message:{
        type: Sequelize.STRING,
      },
      imageUrl:{
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER
      },
    });
  
    return ChatMessages;
  };