const WebSocket = require('ws');
const config = require("../config/auth.config");
const settingconfig = require("../config/setting.config");
 

const connectedUsers = new Map(); // create a map to store connected users
  
exports.createUserStatusWebSocketServer = () => {
    const wss = new WebSocket.Server({ port: settingconfig.statusport });
  
    wss.on('connection', (ws, req) => {
      const userId = req.url.split('?')[1].split('=')[1];
      console.log('Client status connected with id', userId);
  
      ws.userId = userId; // assign userId to the WebSocket object
      connectedUsers.set(userId, ws); // add user to the map
  
      ws.on('message', userId => {
        console.log(`Received message from user ${ws.userId}: ${userId}`);
         
          const isOnline = connectedUsers.has(userId);
          ws.send(`User ${userId} is ${isOnline ? 'online' : 'offline'}`);
        
      });
  
      ws.on('close', () => {
        console.log(`Client disconnected with id ${ws.userId}`);
      
        connectedUsers.delete(ws.userId); // remove user from the map
      });
    });
  }

  exports.isUserOnline = (userId) => {
    return connectedUsers.has(userId);
  }
  
 