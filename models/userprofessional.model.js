module.exports = (sequelize, Sequelize) => {
    const Userprofessionals = sequelize.define("userprofessionals", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING
      },
      legalfirstname:{
        type: Sequelize.STRING
      },
      legallastname:{
        type: Sequelize.STRING
      },
      mobileno:{
        type: Sequelize.INTEGER
      },
      gender:{
        type: Sequelize.INTEGER
      },
      profileimage:{
        type: Sequelize.STRING
      },
      title:{
        type: Sequelize.INTEGER
      },
      country:{
        type: Sequelize.INTEGER
      },
      mainlanguage:{
        type: Sequelize.INTEGER
      },
      professionname:{
        type: Sequelize.INTEGER
      },
      experiences:{
        type: Sequelize.INTEGER
      },
      typeId: {
        type: Sequelize.INTEGER
      },
      scheduleId: {
        type: Sequelize.INTEGER
      },
      // documentId: {
      //   type: Sequelize.INTEGER
      // },
      rating: {
        type: Sequelize.DOUBLE
      },
      totalhours: {
        type: Sequelize.DOUBLE
      },
      talkcount:{
        type: Sequelize.DOUBLE
      },
      costperhour:{
        type: Sequelize.DOUBLE
      },
      currentworkingaddress:{
        type: Sequelize.STRING
      },
      comments:{
        type: Sequelize.STRING
      },
      approve:{
        type: Sequelize.INTEGER
      },
      activate:{
        type: Sequelize.INTEGER
      },
   
    });
  
    return Userprofessionals;
  
    };