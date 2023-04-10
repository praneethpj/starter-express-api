module.exports = (sequelize, Sequelize) => {
  const type = sequelize.define("type", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
    },
    imagepath:{
      type: Sequelize.STRING
    },
    activate:{
      type: Sequelize.INTEGER
    }
  });

  return type;

  };