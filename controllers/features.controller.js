const db = require("../models");
const config = require("../config/auth.config");
const { payment, sequelize } = require("../models");
const Type = db.type;
const Title = db.title;
const Countries = db.country;
const Experience = db.experience;
const Gender = db.gender;
const Language = db.language;
const Perhourcharge = db.perhourcharge;
const jwt = require("jsonwebtoken");
const notification = db.notification;

exports.getAllCountryList = (req, res) => {
    Countries.findAll({
        where: {
            active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllGenderList = (req, res) => {
    Gender.findAll({
        where: {
            active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllPerhourchargeList = (req, res) => {
    Perhourcharge.findAll({
        where: {
            active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllExperienceList = (req, res) => {
    Experience.findAll({
        where: {
            active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllLanguageList = (req, res) => {
    Language.findAll({
        where: {
            active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllProfessionalTypeList = (req, res) => {
  Type.findAll({
        where: {
          activate: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.getAllTitleList = (req, res) => {
  Title.findAll({
        where: {
          active: 1
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}

exports.updateAllNotifications = (req, res) => {

  let token = req.headers["x-access-token"];
  let userIds = "";
  if (!token) {
      return res.status(403).send({
          message: "No token provided!"
      });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
          return res.status(401).send({
              message: "Unauthorized!"
          });
      }
      userIds = decoded.id;

  });

  notification.update(
    { status: 2 },
    { where: { 
        userId: userIds,
        status: { [Op.gt]: 1 } // status greater than 1
      } 
    }
).then(result => {
    res.status(200).send({
        message: "success"
    });
}).catch(error => {
    res.status(500).send({
        message: "error: " + error
    });
});

}