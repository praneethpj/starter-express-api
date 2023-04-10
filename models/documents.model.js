module.exports = (sequelize, Sequelize) => {
  const Documents = sequelize.define("documets", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER
    },
    documentname:{
      type: Sequelize.STRING,
      unique: true
    },
    documentpath:{
      type: Sequelize.STRING
    },
    activate:{
      type: Sequelize.INTEGER
    }
  });

  return Documents;

  };