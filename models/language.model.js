module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("language", {
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
  
    return Language;
  };