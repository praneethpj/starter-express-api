const db = require("../models");
const config = require("../config/auth.config");
 
const jwt = require("jsonwebtoken");
 
const ChatMessages = db.chatmessages;
const { Op } = require("sequelize");
 



exports.readAllChatMessagesByUser = (req, res) => {

    // const targetClientId = req.params.recipientId;


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
 

    ChatMessages.findAll({
        where: {
          [Op.or]: [
            { userId: userId },
            { targetClientId: userId },
          ],
        },
        group: ['userId', 'targetClientId'] ,
        order: [['createdAt', 'ASC']] 
      })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ "targetClientId": "-1", "text": "", "isText": "true", "userId": "-1" });
        });

}


exports.readChatMessagesByRecipientId = (req, res) => {

    const targetClientId = req.params.recipientId;


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
 

    ChatMessages.findAll({
        where: {
          [Op.and]: [
            { userId: userId },
            { targetClientId: targetClientId },
          ],
        },
      })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ "targetClientId": "-1", "text": "", "isText": "true", "userId": "-1" });
        });

}