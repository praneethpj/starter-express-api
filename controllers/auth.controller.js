const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Userurl = db.userurl;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var uuid = require("uuid");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    useractive: 1,
    subscriptionkey: uuid.v4(),
    paymentactive: 0
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then((ttt) => {
            // res.send({ message: "User registered successfully!" });
            console.log("ttt "+ttt.id);
            res.status(200).send({
              username: req.body.username,
              email: req.body.email
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then((ttt) => {
          // res.send({ message: "User registered successfully!" });
        //  console.log("ttt "+ttt.id);
          res.status(200).send({
            username: req.body.username,
            email: req.body.email
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: '1365d' 
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.checkvalidkey = (req, res) => {
  let key = req.params.subscriptionkey;
  User.findAll({
    where: {
      subscriptionkey: key,
      useractive: 1,
      paymentactive: 1
    }
  }).then(urlinfo => {


    if (urlinfo[0] !== undefined) {
      res.status(200).send();
    } else {
      res.status(403).send({
        message: "Subskription key is invalided"
      });
    }
  })
}

exports.getAlltags = (req, res) => {
  let key = req.params.subscriptionkey;
  User.findAll({
    where: {
      subscriptionkey: key,
      useractive: 1,
      paymentactive: 1
    }
  }).then(urlinfo => {

    if (urlinfo[0] === undefined) {
      res.status(403).send({
        message: "Subscription key is invalided"
      });
    } else {

      Userurl.findAll({
        where: {

          userId: urlinfo[0].id
        },
        raw: true
      }).then(userlist => {
        if (userlist[0] !== undefined) {
          res.status(200).send({
            accessToken: null,
            data: userlist
          });
        } else {
          res.status(404).send({
            message: "No urls have registed"
          });
        }
      });
    }

  })
}


exports.getavideo = (req, res) => {
  let key = req.params.subscriptionkey;
  let videid = req.params.videoid;
  User.findAll({
    where: {
      subscriptionkey: key,
      useractive: 1,
      paymentactive: 1
    }
  }).then(urlinfo => {

    if (urlinfo[0] === undefined) {
      res.status(403).send({
        message: "Subscription key is invalided"
      });
    } else {

      Userurl.findAll({
        where: {

          userId: urlinfo[0].id,
          videoId:videid
        },
        raw: true
      }).then(userlist => {
        if (userlist[0] !== undefined) {
          res.status(200).send({
            accessToken: null,
            data: userlist
          });
        } else {
          res.status(404).send({
            message: "No urls have registed"
          });
        }
      });
    }

  })
}