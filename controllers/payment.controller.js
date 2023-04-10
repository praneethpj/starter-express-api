const db = require("../models");
const config = require("../config/auth.config");
const { payment, sequelize } = require("../models");
const User = db.user;
const schedule = db.schedule;
const callSchedule = db.call_schedule;
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const notification = db.notification;
const Userprofessionals = db.userprofessional;

exports.makePayment = (req, res) => {


    User.update(
        { paymentactive: 1 },
        { where: { id: req.body.userid } }
    ).then(user => {

        payment.upsert({
            userId: req.body.userid,
            amount: req.body.amount,
            period: req.body.period
        }).then(pay => {
            res.send({ message: "Payment updated successfully!" });
        }

        )

    });

}

exports.bookaprofessional = (req, res) => {

 
    let token = req.headers["x-access-token"];
    let clientId = "";
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
        clientId = decoded.id;

    });

    var values = { activate: 0 };
    var condition = { where: { id: req.body.scheduleId } };
    options = { multi: false };

    const timezone = 'Asia/Colombo';
    const [startTime, endTime] = req.body.time.split('-');
    const startDateTimeString = `${req.body.realdate} ${startTime}:00`;


      formattedDateTimeString = moment(startDateTimeString, 'YYYY-MMM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
       formattedDateTimeString = moment.tz(formattedDateTimeString, timezone).format('YYYY-MM-DD HH:mm:ss');


    console.log("startDateTimeString  "+formattedDateTimeString);

    payment.create({
        userId: req.body.userId,
        clientId:req.body.clientId,
        dateval: req.body.realdate,
        time: req.body.time,
        paymentstatus: 0,
        paypaltoken:req.body.paypaltoken,
        userfee:req.body.userfee,
        taxfee:req.body.taxfee,
        platformfee:req.body.platformfee,
        totalfee:req.body.totalfee,
    }).then(pay => {
      
        var paymentid=pay.id;
        console.log("Paymentid "+paymentid);
        schedule.update(values, condition, options).then(update => {
            
            

            callSchedule.create({
                userId: req.body.userId,
                clientId: req.body.clientId,
                dateval: formattedDateTimeString,
                time: req.body.time,
                starttime:formattedDateTimeString,
                paymentId:paymentid,
                activate: 1
            });

            
            User.findAll({
                where: {
                    id: req.body.userId
        
                }
            }).then((result) => {
                
                notification.create({
                    userId: req.body.userId,
                    title:result[0].username +",You have a call with,"+req.body.clientusername,
                    calldate:formattedDateTimeString,
                    calltime: req.body.time,
                    paymentId:paymentid,
                    status:0
                });

                notification.create({
                    userId: req.body.clientId,
                    title:req.body.clientusername+",You have a call with,"+result[0].username,
                    calldate:formattedDateTimeString,
                    calltime: req.body.time,
                    paymentId:paymentid,
                    status:0
                });
                });
          
            

            //     Userprofessionals.findAll({
            //     where: {
            //         userId:  req.body.userId,
        
            //     }
            // }).then((result) => {
                
               
            //     });
        }).then(resultSchedule=>{
            res.json({
                "message": "Payment updated successfully",
                "result": req.body,
                "status":200
            })
    
        });
    })

}

exports.getPaymentsById = (req, res) => {

     
    let token = req.headers["x-access-token"];
    let clientId = "";
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
        clientId = decoded.id;

    });

    payment.findOne({
        where: {
          id: req.params.billid
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}


