module.exports = (sequelize, Sequelize) => {
    const Perhourcharge = sequelize.define("perhourcharge", {
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
  
    return Perhourcharge;
  };