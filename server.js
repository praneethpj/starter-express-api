const port = 3000;

var corsOptions = {
    origin: "http://localhost:3000"
  };
  


const express = require('express');
const app = express();
const path = require('path');
const url = require('url');
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require('node-cron');
const multer = require('multer');
const callWebSocketServer = require('./services/call_service_websocket');
const messageWebSocketServer = require('./services/message_service_websocket');
 
const initializeFirebase = require("./middleware/initializeFirebase");

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "js")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads', express.static('uploads'));


// database
const db = require("./models");
const { sequelize } = require('./models');
const Role = db.role;

db.sequelize.sync();
 
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to application." });
//   });

  
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/professional.routes')(app);
require('./routes/payment.routes')(app);
require('./routes/feature.routes')(app);
require('./routes/messages.route')(app);
require('./routes/call.routes')(app);



app.get('/image/:folder/:filename', (req, res) => {
  const folder = req.params.folder;
  const filename = req.params.filename;
  res.sendFile(__dirname + `/upload/${folder}/${filename}`);
});

app.get('/chatimage/:folder1/:folder2/:filename', (req, res) => {
  const folder = req.params.folder1;
  const filename = req.params.filename;
  res.sendFile(__dirname + `/upload/${folder}/messages/${filename}`);
});

// app.get('/video/:id', (req, res) => res.sendFile(__dirname + '/index.html'));

// app.get("/api/video/:id", (req, res, next) => {
//     var params = [req.params.id]

//     let buff = decodeURIComponent(params);

//      res.json({
//         "message": "success",
//         "data": buff
//     })
 
// });


// app.post("/api/video/", (req, res, next) => {
//     var errors = []
//     if (!req.body.hls) {
//         errors.push("No hls specified");
//     }
//     if (!req.body.vast) {
//         errors.push("No vast specified");
//     }
//     if (errors.length) {
//         res.status(400).json({ "error": errors.join(",") });
//         return;
//     }

//     const encodedUrls =   encodeURIComponent(req.body.hls+"|"+req.body.vast);

//     let fullurl=url.format({
//         protocol: req.protocol,
//         host: req.get('host')
//       });
//         res.json({
//             "message": "success",
//             "generatedUrl": fullurl+"/video/"+encodedUrls,
//             "id": this.lastID
//         })
 
// });




const analytics = initializeFirebase();

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
callWebSocketServer();
messageWebSocketServer();
//createUserStatusWebSocketServer();

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

  cron.schedule('* * * * *', function() {
    sequelize.query('SELECT * FROM call_schedules  WHERE starttime  >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) and userId =  '+id+' || clientId ='+id+' ', null, { raw: true })
    .then((result) => {
        console.log(result[0]);
      

      }).catch((err) => {
        console.error("err "+err);
      });
  });





