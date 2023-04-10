const db = require("../models");
const config = require("../config/auth.config");
const { userurl } = require("../models");
const User = db.user;
const url = require('url');
const Userurl = db.userurl;
const jwt = require("jsonwebtoken");
var uuid = require("uuid");
const { userInfo } = require("os");


exports.generateUrl = (req, res) => {

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

    var errors = []
    if (!req.body.hls) {
        errors.push("No hls specified");
    }
    if (!req.body.vast) {
        errors.push("No vast specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    //const encodedUrls = encodeURIComponent(req.body.hls + "|" + req.body.vast);
    const encodedUrls = req.body.hls + "|" + req.body.vast + "|" + req.body.playonstart + "|" + req.body.playonmid + "|" + req.body.playonend + "|" + req.body.playonperiod;

    let fullurl = url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
    let finalUrl = encodedUrls;
    var videoid = uuid.v4();

    userurl.create({
        userId: userid,
        url: finalUrl,
        videoId: videoid,
        activate: 1
    });

    res.json({
        "message": "success",
        "generatedUrl": finalUrl,
        "id": this.lastID
    })


}

exports.extractUrl = (req, res) => {

    let token = req.headers["x-access-token"];
    let userid = "";

    jwt.verify(token, config.secret, (err, decoded) => {

        userid = decoded.id;

    });

    let videoid = req.body.videoid;
    Userurl.findAll({
        where: {
            userId: userid,
            videoId: videoid,
            activate: 1
        }
    }).then(urlinfo => {


        if (urlinfo[0] !== undefined) {
            res.json({

                "url": urlinfo[0].url,
                "playonstart": urlinfo[0].playonstart,
                "playonmid": urlinfo[0].playonmid,
                "playonend": urlinfo[0].playonend,
                "playonperiod": urlinfo[0].playonperiod,
            })
        } else {
            res.status(403).send({
                message: "Url extraction is Not granted to you"
            });
        }

        // return   res.status(200).send({
        //     message: urlinfo[0].url
        //   });

        // let buff = decodeURIComponent(videoid);


    })





}