const util = require("util");
const multer = require("multer");
var path = require('path');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const _parentpath = path.resolve();




const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _parentpath + "/resources/static/user_documents");
  },
  filename: (req, file, cb) => {

    let token = req.headers["x-access-token"];
    let userid = "";
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
      userid = decoded.id;
    
    });

    console.log(req.body['document']);
    console.log(req.body.document);
    console.log(req.body.name);
    console.log(file.originalname);

    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;