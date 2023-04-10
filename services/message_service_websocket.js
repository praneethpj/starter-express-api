const WebSocket = require('ws');
const config = require("../config/auth.config");
const settingconfig = require("../config/setting.config");
const jwt = require("jsonwebtoken");
const { sequelize } = require('../models');
const server = require('http').createServer();
const io = require('socket.io')(server);
const path = require("path");
const fs = require("fs");
const admin = require('firebase-admin');
const db = require("../models");
const ChatMessages = db.chatmessages;

//const io = require('socket.io')(server);


// const wss = new WebSocket.Server({ port: settingconfig.messageport });

function createMessageWebSocketServer() {
  let clients = {}; // Map to store connected clients by ID
   let isText=true;
   let customimagePath="";
  io.on('connection', (client) => {
    //console.log('Client connected:', client.id);

    
    client.on('register', (clientId) => {
      clients[clientId] = client;
    });

    client.on('checkOnline', (userId) => {
      let isOnline = clients.hasOwnProperty(userId);
      client.emit('onlineStatus', {
        'userId': userId,
        'isOnline': isOnline
      });
    });

  client.on('msg', (data) => {
  console.log(`Received message from client: ${data.message}, userId: ${data.userId}, targetClientId: ${data.targetClientId}`);
 
  //client.id=data.userId;
   console.log('Client connected:', client.id);
  if (data.targetClientId) {

    
  // Save the image to disk, if present
  let imageFilename = '';

  if (data.image) {
    isText=false;
    const base64Data = data.image.replace(/^data:image\/png;base64,/, "");
    imageFilename = `image_${Date.now()}.png`;
    const dir="./upload/"+data.userId+"/messages";
    if (!fs.existsSync(dir)){    //check if folder already exists
    fs.mkdirSync(dir);    //creating folder
}
    const imagePath = dir+"/"+imageFilename;
    fs.writeFile(imagePath, base64Data, "base64", (err) => {
      if (err) {
        console.log(`Error saving image: ${err}`);
      } else {
        console.log(`Image saved to ${imagePath}`);
      }
    });

         // Get a reference to the messages collection in Firebase
         const messagesRef = admin.firestore().collection('messages');

         // Create a new message document
          const customimagePath = data.userId+"/messages/"+imageFilename;
          
     
         try {
          ChatMessages.create({
            userId:  data.userId,
            targetClientId: data.targetClientId,
            isText: false,
            imageUrl:customimagePath,
            message:"",
            status: 1,
          })
           console.log('Image saved to Firebase');
         } catch (error) {
           console.error('Error saving message:', error);
         }


           // if ( targetClientSender) {
    const now = new Date();
    const dateTimeString = now.toLocaleString();
      const jdata = {
        targetClientId: data.targetClientId,
        text: '',
        isText: false,
        userId: data.userId,
        imageUrl:customimagePath,
        createdAt: dateTimeString,
        status: 1
      };
 
      console.log(`Sending message to customimagePath: ${customimagePath},  ${ data.userId}`);
      const jsonData = JSON.stringify(jdata);
      let clientId = data.userId;
      let clientSocket = clients[clientId];
      if (clientSocket) {
        clientSocket.emit('fromServer', jsonData);
      }
   // }
  }else{

     
      try {
 
          ChatMessages.create({
            userId:  data.userId,
            targetClientId: data.targetClientId,
            isText: true,
            imageUrl:"",
            message:data.message,
            status: 1,
          })
        console.log('Message saved to Firebase');
      } catch (error) {
        console.error('Error saving message:', error);
      }
 
    const now = new Date();
    const dateTimeString = now.toLocaleString();
      const jdata = {
        targetClientId: data.targetClientId,
        text: data.message,
        isText: true,
        userId: data.userId,
        imageUrl:"",
        createdAt: dateTimeString,
        status: 1
      };
      isText=true;
      console.log(`Sending message to customimagePath: ${customimagePath},`);
      const jsonData = JSON.stringify(jdata);

     
//       const hasClient = clients.has(data.userId);
// if (hasClient) {
//   console.log('User is connected!');
// } else {
//   console.log('User is not connected.');
// }
  var targetClientSender = client.in(client.id);
    if (targetClientSender  ) {
      console.log(`Sending message to client: ${data.message}, ${client.id}`);
      targetClientSender.emit('fromServer', data.message);
    }

      // io.to(data.targetClientId).emit('fromServer', jsonData);
      // io.to(client.id).emit('fromServer', jsonData);
      // io.emit('fromServer', jsonData);
      let clientId = data.userId;
      let clientSocket = clients[clientId];
      if (clientSocket) {
        clientSocket.emit('fromServer', jsonData);
      }
      
   // }
  }
  } else {
    client.emit('fromServer', 'ok');
  }
});
    client.on('disconnect', () => {
      console.log(`Client disconnected: ${client.id}`);
   //   clients.delete(client.id); // Remove client from Map on disconnect
    });
  });

  io.listen(8888);
}



module.exports = createMessageWebSocketServer;