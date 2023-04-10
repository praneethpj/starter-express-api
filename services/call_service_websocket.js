const WebSocket = require('ws');
const config = require("../config/auth.config");
const settingconfig = require("../config/setting.config");
const jwt = require("jsonwebtoken");
const { sequelize } = require('../models');

function createCallWebSocketServer() {
  const wss = new WebSocket.Server({ port: settingconfig.callport });

  wss.on('connection', (ws, req) => {
    console.log('Client connected ');
 
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        ws.close();
        return;
      }
      const userId = decoded.id;
      console.log('User authenticated with id', userId);
      ws.userId = userId;
    });

    console.log(`WebSocket server URL: ws://${req.headers.host}${req.url}`);

    const userId = req.url.split('?')[1].split('=')[1];
    console.log('User connected with id', userId);

    ws.on('message', message => {
      console.log(`Received message from user ${ws.userId}: ${message}`);
    });
    const timer = setInterval(() => {
      var dbresult="";
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      const minutesToAdd = 15;
      const currentDate = new Date();
      const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);

      const formattedDate = futureDate.toISOString().slice(0, 19).replace('T', ' ');

      // console.log(formatDate(futureDate));
      // console.log(formatDate(currentDate));

      sequelize.query("select * from notifications where STR_TO_DATE(calldate , '%Y-%m-%d %H:%i:%s')  between '"+formatDate(currentDate)+"' and '"+formatDate(futureDate)+"'  and userId ="+userId+"    and status=0", null, { raw: true })
        .then((result) => {
          // console.log(result[0]);
          dbresult=result[0];
       
          ws.send(JSON.stringify(dbresult));

        }).catch((err) => {

        });

    }, 1000);

    ws.on('close', () => {
      console.log(`Client disconnected with id ${ws.userId}`);
      clearInterval(timer);
    });
  });
}

module.exports = createCallWebSocketServer;
