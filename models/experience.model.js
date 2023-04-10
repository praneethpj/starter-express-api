module.exports = (sequelize, Sequelize) => {
    const Experience = sequelize.define("experience", {
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
  
    return Experience;
  };