module.exports = (sequelize, Sequelize) => {
    const Gender = sequelize.define("gender", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.INTEGER
      },
    });
  
    return Gender;
  };