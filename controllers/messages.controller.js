const db = require("../models");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const admin = require('firebase-admin');

const userStatus  = require('../services/user_status_websocket');
 
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
 
    const messagesRef = admin.firestore().collection('messages');
  
    try {
        const querySnapshot =   messagesRef
        .where('userId', '==', userId.toString())
        .orderBy('timestamp', 'asc')
        .get()
        .catch((err) => console.log("err " + err));
      
        var toResult= querySnapshot.then(querySnapshot => {
            if (!querySnapshot.empty) {
              const users = querySnapshot.docs.map(doc => {
                const user = doc.data();
                const createdAtTimestamp = user.timestamp;
                const createdAtDate = new Date(createdAtTimestamp.seconds * 1000);
                const createdAtString = createdAtDate.toLocaleString();
                user.createdAt = createdAtString;
                return user;
              });
             return users;
            } else {
                return [];
            }
          });
      

          const querySnapshot2 =   messagesRef
          .where('targetClientId', '==', targetClientId)
          .orderBy('timestamp', 'asc')
          .get()
          .catch((err) => console.log("err " + err));
        
          var fromResult= querySnapshot2.then(querySnapshot => {
              if (!querySnapshot.empty) {
                const users = querySnapshot.docs.map(doc => {
                  const user = doc.data();
                  const createdAtTimestamp = user.timestamp;
                  const createdAtDate = new Date(createdAtTimestamp.seconds * 1000);
                  const createdAtString = createdAtDate.toLocaleString();
                  user.createdAt = createdAtString;
                  return user;
                });
               return users;
              } else {
                  return [];
              }
            });

        // const messages = querySnapshot.docs.map((doc) => {
        //   const message = doc.data();
        //   message.id = doc.id;
        //   return message;
        // });
        console.log("Messages found:");
        // handle the messages array
        //this.handleEvents(messages);
        Promise.all([toResult, fromResult]).then(([toResultData, fromResultData]) => {
            const combinedResult = [...toResultData, ...fromResultData];
            console.log(combinedResult);
            res.status(200).json(combinedResult);
          });
          
  
    //   console.log(`Fetched ${messages.length} messages for user ${userId}`);
    //   res.status(200).json(messages);
    } catch (error) {
      console.error(`Error fetching messages for user ${userId}:`, error);
      res.status(500).json({ error: error.message });
    }
}


exports.readAllChatMessagesByUser = (req, res) => {
  
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
 
    const messagesRef = admin.firestore().collection('messages');
  
    try {
      const querySnapshot =   messagesRef
  .where('userId', '==', userId.toString())
  .orderBy('timestamp', 'desc')
  .get()
  .catch((err) => console.log("err " + err));

  const messagesByTargetClientId = {};

  var fromResult = querySnapshot.then(querySnapshot => {
    const users = querySnapshot.docs.map(doc => {
      const user = doc.data();
      const createdAtTimestamp = user.timestamp;
      const createdAtDate = new Date(createdAtTimestamp.seconds * 1000);
      const createdAtString = createdAtDate.toLocaleString();
      user.createdAt = createdAtString;
  
      const targetClientId = user.targetClientId;
      if (!messagesByTargetClientId[targetClientId]) {
        messagesByTargetClientId[targetClientId] = user;
      }
    return user;
});
return Object.values(users);
    
  
   
});


const querySnapshot2 =   messagesRef
.where('targetClientId', '==', userId.toString())
.orderBy('timestamp', 'desc')
.get()
.catch((err) => console.log("err " + err));

var toResult = querySnapshot2.then(querySnapshot => {
    const users = querySnapshot.docs.map(doc => {
      const user = doc.data();
      const createdAtTimestamp = user.timestamp;
      const createdAtDate = new Date(createdAtTimestamp.seconds * 1000);
      const createdAtString = createdAtDate.toLocaleString();
      user.createdAt = createdAtString;
  
      const targetClientId = user.targetClientId;
      if (!messagesByTargetClientId[targetClientId]) {
        messagesByTargetClientId[targetClientId] = user;
      }
    return user;
    });
    return Object.values(users);
  
  
 
});
const size = Object.keys(messagesByTargetClientId).length;
console.log("Messages found: ", size);

 
Promise.all([toResult, fromResult]).then(([toResultData, fromResultData]) => {
    const combinedResult = [...toResultData, ...fromResultData];
    const uniqueResult = combinedResult.filter((item, index, array) => {
        return array.findIndex(other => other.targetClientId === item.targetClientId && other.isText === item.isText) === index;
    });
    const cleanedResult = uniqueResult.map(({ userId, ...rest }) => rest); // remove userId key
    console.log(cleanedResult);
    res.status(200).json(cleanedResult);
});

  
  

// if (size > 0) {
//     const messages = Object.values(messagesByTargetClientId);
//     res.json(messages);
//   } else {
//     res.status(404).json({ "targetClientId": "-1", "text": "", "isText": "true", "userId": "-1" });
//   }

 



      
    //   console.log(`Fetched ${messages.length} messages for user ${userId}`);
    //   res.status(200).json(messages);
    } catch (error) {
      console.error(`Error fetching messages for user ${userId}:`, error);
      res.status(500).json({ error: error.message });
    }
}

exports.checkUserStatus = (req, res) => {
    const { userId } = req.params;
    const isUserOnline = userStatus.isUserOnline(userId);
    res.send({ isUserOnline });
}