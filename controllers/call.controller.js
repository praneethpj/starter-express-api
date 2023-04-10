const db = require("../models");
const config = require("../config/auth.config");
const { payment, sequelize } = require("../models");
const User = db.user;
 
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const notification = db.notification;
const Userprofessionals = db.userprofessional;
const CallHistory = db.callhistory;
const Op = db.Sequelize.Op;

exports.updateEndCall = (req, res) => {

    let token = req.headers["x-access-token"];
   // let userId = "";
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
        userId = decoded.id;

    });

    let starttime=req.body.starttime;
    let endtime=req.body.endtime;
    let talkcount=req.body.talkcount;
    let totalhours=req.body.totalhours;
    let rating=req.body.rating;
    let professionalId=req.body.professionalId;
    let calluserId=req.body.calluserId;
    let comments=req.body.comments;

    // Retrieve the user's current data from the database
    db.userprofessional.findOne({ where: { name: professionalId } })
      .then(user => {
        // Calculate the new ratings, talk count, and total hours
        const newTalkCount = user.talkcount + talkcount;
        const newTotalHours = user.totalhours + totalhours;
        const newRatings = ((user.rating + rating) /3);
    
        // Update the user's data in the database
        db.userprofessional.update({
          talkcount: newTalkCount,
          totalhours: newTotalHours,
          rating: newRatings
        }, { where: {name: professionalId } })
          .then(() => {
            //res.status(200).json({ message: 'User data updated successfully.' });
          
            CallHistory.create({
                professionaluserId:professionalId,
                calluserId:calluserId,
                rating:rating,
                starttime:starttime,
                endtime:endtime,
                comments:comments,
                activate:1
            });
        })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Internal server error.' });
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Internal server error.' });
      });



}



exports.getUpcomingCalls = (req, res) => {

  let token = req.headers["x-access-token"];
  let userId = "";
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
      userId = decoded.id;

  });


  notification.findAll({
    where: {
      userId: userId,
      status: 0
    },
    order: [['createdAt', 'DESC']]
}).then((result) => {
  res.json({
    "result": result,
});
}).catch((err) => {
    res.status(500).send({
        message: "Error  " + err
    });
});

}


exports.getHistoryCalls = (req, res) => {

  let token = req.headers["x-access-token"];
  let userId = "";
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
      userId = decoded.id;

  });


  notification.findAll({
    where: {
      userId: userId,
      status: {
        [Op.in]: [1, 2]  
    }
    },
    order: [['createdAt', 'DESC']]
}).then((result) => {
  res.json({
    "result": result,
});
}).catch((err) => {
    res.status(500).send({
        message: "Error  " + err
    });
});

}



exports.getCommentsofProfessions = (req, res) => {

    let token = req.headers["x-access-token"];
    let userId = "";
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
        userId = decoded.id;
  
    });
  
  
    CallHistory.findAll({
      where: {
        professionaluserId: req.params.id,
      },
      order: [['createdAt', 'DESC']]
  }).then((result) => {
    res.json({
      "result": result,
  });
  }).catch((err) => {
      res.status(500).send({
          message: "Error  " + err
      });
  });
  
  }