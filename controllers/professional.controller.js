const db = require("../models");
const config = require("../config/auth.config");
const { userurl, userprofessional, sequelize, call_schedule, Sequelize } = require("../models");
const User = db.user;
const url = require('url');
const Userprofessionals = db.userprofessional;
const Documents = db.documents;
const type = db.type;
const title = db.title;
const schedule = db.schedule;
const jwt = require("jsonwebtoken");
const uploadFileMiddleware = require("../middleware/upload");
const { where } = require("sequelize");
const op = Sequelize.Op;
const notification = db.notification;
const multer = require('multer');
const fs = require('fs');
const { log } = require("console");

exports.uploadgovermentId=function(request, response, next){
    console.log("request "+request.userId);
        const dir="./upload/"+request.userId+"/";
        if (!fs.existsSync(dir)){    //check if folder already exists
        fs.mkdirSync(dir);    //creating folder
    }
    var file="";
    var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload/'+request.userId+"/");
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = request.userId+"_govermentId";

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name +  '.' + temp_file_extension);

            file=temp_file_name +  '.' + temp_file_extension;
		 
            Documents.upsert({
                userId: request.userId,
                documentname: file,
                documentpath: request.userId+"/"+file,
                activate: 1
              }, {
                where: {
                  //userId: request.userId,
                  documentname: file
                },
                returning: true
              }).then(([document, created]) => {
                console.log(document.get({
                  plain: true
                }));
                console.log(created);
              }).catch(err => {
                console.error(err);
              });
		}

	});

	var upload = multer({storage:storage}).single('govermentid_img');
  
	upload(request, response, function(error){

        if (error instanceof multer.MulterError) {
            response.json({status: "Error", error_message: "Some kind of error with multer"});
        } else if(error) {
            response.json({status: "Error", error_message: error.message});
        } else {
            response.json({status: "Success", success_message: "Image uploaded successfully."});
          
        }

		 
            
      

	});


}


exports.uploadProfessionalProfilePic=function(request, response, next){
    console.log("request "+request.userId);
        const dir="./upload/"+request.userId+"/";
        if (!fs.existsSync(dir)){    //check if folder already exists
        fs.mkdirSync(dir);    //creating folder
    }
    
    var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload/'+request.userId+"/");
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = request.userId+"_professionalprofile";

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name +  '.' + temp_file_extension);
           var file=temp_file_name +  '.' + temp_file_extension;
		 
            Documents.upsert({
                userId: request.userId,
                documentname: file,
                documentpath: request.userId+"/"+file,
                activate: 1
              }, {
                where: {
                  //userId: request.userId,
                  documentname: file
                },
                returning: true
              }).then(([document, created]) => {
                console.log(document.get({
                  plain: true
                }));
                console.log(created);
              }).catch(err => {
                console.error(err);
              });

			//callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}

	});

	var upload = multer({storage:storage}).single('professional_img');
  
	upload(request, response, function(error){

        if (error instanceof multer.MulterError) {
            response.json({status: "Error", error_message: "Some kind of error with multer"});
        } else if(error) {
            response.json({status: "Error", error_message: error.message});
        } else {
            response.json({status: "Success", success_message: "Image uploaded successfully."});
        }

		 

	});


}

exports.uploadAppoinmentLetter=function(request, response, next){
    console.log("request "+request.userId);
        const dir="./upload/"+request.userId+"/";
        if (!fs.existsSync(dir)){    //check if folder already exists
        fs.mkdirSync(dir);    //creating folder
    }
    var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload/'+request.userId+"/");
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = request.userId+"_appoinmentLetter";

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name +  '.' + temp_file_extension);

            var file=temp_file_name +  '.' + temp_file_extension;
		 
            Documents.upsert({
                userId: request.userId,
                documentname: file,
                documentpath: request.userId+"/"+file,
                activate: 1
              }, {
                where: {
                  //userId: request.userId,
                  documentname: file
                },
                returning: true
              }).then(([document, created]) => {
                console.log(document.get({
                  plain: true
                }));
                console.log(created);
              }).catch(err => {
                console.error(err);
              });

			//callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}

	});

	var upload = multer({storage:storage}).single('appoinment_img');
  
	upload(request, response, function(error){

        if (error instanceof multer.MulterError) {
            response.json({status: "Error", error_message: "Some kind of error with multer"});
        } else if(error) {
            response.json({status: "Error", error_message: error.message});
        } else {
            response.json({status: "Success", success_message: "Image uploaded successfully."});
        }

		 

	});


}

exports.uploadLivePhoto=function(request, response, next){
    console.log("request "+request.userId);
        const dir="./upload/"+request.userId+"/";
        if (!fs.existsSync(dir)){    //check if folder already exists
        fs.mkdirSync(dir);    //creating folder
    }
    var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload/'+request.userId+"/");
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = request.userId+"_livePhoto";

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name +  '.' + temp_file_extension);

            var file=temp_file_name +  '.' + temp_file_extension;
		 
            Documents.upsert({
                userId: request.userId,
                documentname: file,
                documentpath: request.userId+"/"+file,
                activate: 1
              }, {
                where: {
                  //userId: request.userId,
                  documentname: file
                },
                returning: true
              }).then(([document, created]) => {
                console.log(document.get({
                  plain: true
                }));
                console.log(created);
              }).catch(err => {
                console.error(err);
              });

			//callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}

	});

	var upload = multer({storage:storage}).single('live_img');
  
	upload(request, response, function(error){

        if (error instanceof multer.MulterError) {
            response.json({status: "Error", error_message: "Some kind of error with multer"});
        } else if(error) {
            response.json({status: "Error", error_message: error.message});
        } else {
            response.json({status: "Success", success_message: "Image uploaded successfully."});
        }

		 

	});


}

exports.uploadHighestQualification=function(request, response, next){
    console.log("request "+request.userId);
        const dir="./upload/"+request.userId+"/";
        if (!fs.existsSync(dir)){    //check if folder already exists
        fs.mkdirSync(dir);    //creating folder
    }
    var storage = multer.diskStorage({

		destination:function(request, file, callback)
		{
			callback(null, './upload/'+request.userId+"/");
		},
		filename : function(request, file, callback)
		{
			var temp_file_arr = file.originalname.split(".");

			var temp_file_name = request.userId+"_highestqualification";

			var temp_file_extension = temp_file_arr[1];

			callback(null, temp_file_name +  '.' + temp_file_extension);

            var file=temp_file_name +  '.' + temp_file_extension;
		 
            Documents.upsert({
                userId: request.userId,
                documentname: file,
                documentpath: request.userId+"/"+file,
                activate: 1
              }, {
                where: {
                  //userId: request.userId,
                  documentname: file
                },
                returning: true
              }).then(([document, created]) => {
                console.log(document.get({
                  plain: true
                }));
                console.log(created);
              }).catch(err => {
                console.error(err);
              });

			//callback(null, temp_file_name + '-' + Date.now() + '.' + temp_file_extension);
		}

	});

	var upload = multer({storage:storage}).single('highestQualification_img');
  
	upload(request, response, function(error){

        if (error instanceof multer.MulterError) {
            response.json({status: "Error", error_message: "Some kind of error with multer"});
        } else if(error) {
            response.json({status: "Error", error_message: error.message});
        } else {
            response.json({status: "Success", success_message: "Image uploaded successfully."});
        }

		 

	});


}



exports.addtype = (req, res) => {

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
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    type.findAll({
        where: {
            name: req.body.name
        }
    }).then((result) => {

        if (!result[0]) {
            let name = req.body.name;

            type.create({
                name: name,
                activate: 1,
            });

            res.json({
                "message": "success",
                "name": name,
            })

        } else {
            res.status(403).send({
                message: "This type aleady exists"
            });
        }

    }).catch((err) => {
        res.status(500).send({
            message: "Error  " + err
        });
    });
}


exports.addDocument = (req, res) => {

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
    if (!req.body.documentname) {
        errors.push("No Document specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    type.findAll({
        where: {
            documentname: req.body.documentname
        }
    }).then((result) => {

        if (!result[0]) {

            let name = req.body.documentname;

            type.create({
                name: name,
                activate: 1,
            });

            res.json({
                "message": "success",
                "name": name,
            })

        } else {
            res.status(403).send({
                message: "This type aleady exists"
            });
        }

    }).catch((err) => {
        res.status(500).send({
            message: "Error  " + err
        });
    });
}



exports.addShedule = (req, res) => {

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
    // if (!req.body.time) {
    //     errors.push("No time range specified");
    // }
    // if (!req.body.day) {
    //     errors.push("No day specified");
    // }

    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }


    console.log(req.body);
    for (const { day, times } of req.body) {
        for (const { time, activate } of times) {
            // await Schedule.create({ day, time, activate });

            schedule.findOne({ where: { userid: userid, day: day, time: time } }).then(function (obj) {
                if (obj) {
                    var values = {
                        userId: userid,
                        userProfessionalId: userid,
                        day: day,
                        time: time,
                        activate: activate
                    };
                    var condition = { where: { userid: userid, day: day, time: time } };
                    options = { multi: true };
                    schedule.update(values, condition, options);
                } else {
                    schedule.create({
                        userId: userid,
                        userProfessionalId: userid,
                        day: day,
                        time: time,
                        activate: activate
                    });
                }
            })





        }
    }

    res.json({
        "message": "success",
        "result": req.body,

    })




}

exports.resetAllScheduleByUserId = (req, res) => {
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
   
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    console.log(req.body);
 
    schedule.destroy({
     where: { userid: userid} 
      }).then(() => {
        res.json({
            "message": "success",
            "result": req.body,
    
        })
      }).catch((error) => {
        res.json({
            "message": "error "+error,
            "result": req.body,
    
        })
      });
      
      Userprofessionals.update({
      activate:0
    
    }, {
        where: {
            userId: userid
        }
    });

}


exports.getAllProfessionals = (req, res) => {

    // Userprofessionals.findAll({
    //     include: [{
    //       model: title,
    //       attributes: ['name']
    //     }, {
    //       model: type,
    //       attributes: ['name']
    //     }]
    //   }).then((result) => {
    //     // You can access the Title and type names for each Userprofessional object like this:
    //     const userProfessionalsWithTitlesAndTypes = result.map((userProfessional) => {
    //       return {
    //         ...userProfessional.toJSON(),
    //         titleName: userProfessional.title.name,
    //         typeName: userProfessional.type.name
    //       }
    //     });
    //     res.json({
    //       "result": userProfessionalsWithTitlesAndTypes,
    //     });
    //   });
      
      
    sequelize.query("SELECT Userprofessionals.id, Userprofessionals.userId,Userprofessionals.name,experiences.name as experiences,Userprofessionals.title as titleid  ,countries.name as countryName ,languages.name  as languages, Userprofessionals.legalfirstname, Userprofessionals.legallastname,genders.name AS gender, Userprofessionals.profileimage, Userprofessionals.mobileno, Userprofessionals.professionname,Perhourcharges.name AS costperhour, titles.name AS titleName, types.name AS typeName, Userprofessionals.rating, Userprofessionals.totalhours, Userprofessionals.talkcount, Userprofessionals.currentworkingaddress, Userprofessionals.comments,Userprofessionals.approve, Userprofessionals.activate, Userprofessionals.createdAt, Userprofessionals.updatedAt FROM Userprofessionals LEFT JOIN titles ON Userprofessionals.title = titles.id LEFT JOIN types ON Userprofessionals.typeId = types.id LEFT JOIN Perhourcharges ON Userprofessionals.costperhour = Perhourcharges.id LEFT JOIN genders ON Userprofessionals.gender = genders.id LEFT JOIN countries ON Userprofessionals.country = countries.id LEFT JOIN languages ON Userprofessionals.mainlanguage = languages.id LEFT JOIN experiences ON Userprofessionals.experiences = experiences.id where Userprofessionals.activate =1  GROUP BY Userprofessionals.userId;", { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      res.json({  "result": result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error: " + err.message
      });
    });

}

exports.getProfessionalById = (req, res) => {


    sequelize.query("select u.*,t.name from userprofessionals u inner join types t on u.typeId = t.id  where u.userId ="+req.params.id+" ", { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      res.json({  "result": result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error: " + err.message
      });
    });
     
     
}

exports.getProfessionalScheduleById = (req, res) => {
    var month=req.params.month;
    var date=req.params.date;
    var year=req.params.year;
  
    var customdate=year+"-"+month+"-"+date;
  
 
    var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  
 
    var today = new Date();
    var customdateObj = new Date(customdate);
    var isToday = customdateObj.getDate() == today.getDate() &&
                  customdateObj.getMonth() == today.getMonth() &&
                  customdateObj.getFullYear() == today.getFullYear();
  
     
    var sqlQuery = 'SELECT schedules.id,schedules.day,schedules.time,(SELECT IF(COUNT(*) > 0, 0, 1) AS book FROM call_schedules WHERE userId = "'+req.params.id+'" AND date(call_schedules.dateval) = "'+customdate+'" and call_schedules.time=schedules.time LIMIT 1) as "available" FROM `call_schedules` right join schedules on schedules.userId=call_schedules.userId where schedules.userId='+req.params.id+' and schedules.day='+req.params.day;
  
    if (isToday) {
      sqlQuery += ' and schedules.time > "' + currentTime + '"';
    }
  
    sqlQuery += ' group by schedules.time';

    console.log("sqlQuery "+sqlQuery);
  
    sequelize.query(sqlQuery, null, { raw: true })
      .then((result) => {
        console.log(result[0]);
        var result=result[0];
        res.json({ result });
      }).catch((err) => {
        res.status(500).send({
          message: "Error: " + err.message
        });
      });
  }
  



exports.checkcalls = (req, res) => {

 
    let token = req.headers["x-access-token"];
    let id = "";
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
        id = decoded.id;

    });

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
// console.log("userID "+id);
// console.log(formatDate(futureDate));
// console.log(formatDate(currentDate));
 

 //select * from notifications T where date_sub(T.calldate, INTERVAL 20 MINUTE) >= NOW() and userId =1;
 //SELECT * FROM call_schedules  WHERE starttime  >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) and userId =  '+id+' || clientId ='+id+' '
    sequelize.query("select * from notifications where STR_TO_DATE(calldate , '%Y-%m-%d %H:%i:%s')  between '"+formatDate(currentDate)+"' and '"+formatDate(futureDate)+"'  and userId ="+id+" and status=0 ", null, { raw: true })
    .then((result) => {
     //   console.log(result[0]);
        var result=result[0];
        res.json({ result });

      }).catch((err) => {
        res.status(500).send({
          message: "Error: " + err.message
        });
      });
   

}


exports.updateCallstatusToreceived = (req, res) => {
  let token = req.headers["x-access-token"];
    let id = "";
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
        id = decoded.id;

    });

    notification.update(
        { status: 1 },
        { where: { id: req.body.id } }

    ).then(result=>{
        res.status(200).send({
            message: "success "
          });
    }).catch((error=>{
        res.status(500).send({
            message: "error: "+error
          });
    }));

     

}


exports.applyProfessionalAccount = (req, res) => {

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
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.legalfirstname) {
        errors.push("No Legal First name specified");
    }
    if (!req.body.legallastname) {
        errors.push("No Legal Last name specified");
    }
    if (!req.body.mobileno) {
        errors.push("No Mobile No specified");
    }
    if (!req.body.title) {
        errors.push("No title specified");
    }
    if (!req.body.typeId) {
        errors.push("No typeId specified");
    }
    if (!req.body.gender) {
        errors.push("No gender specified");
    }
    if (!req.body.country) {
        errors.push("No country specified");
    }
    if (!req.body.mainlanguage) {
        errors.push("No Main Language specified");
    }
    if (!req.body.profileimage) {
        errors.push("No profileimage specified");
    }
    if (!req.body.professionname) {
        errors.push("No Profession specified");
    }
    if (!req.body.experiences) {
        errors.push("No experiences specified");
    }
    if (!req.body.costperhour) {
        errors.push("No costperhour specified");
    }
    if (!req.body.currentworkingaddress) {
        errors.push("No address of work specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    Userprofessionals.findAll({
        where: {
            userId: userid

        }
    }).then((result) => {

        if (!result[0]) {
            let name = req.body.name;
            let legalfirstname=req.body.legalfirstname;
            let legallastname=req.body.legallastname;
            let mobileno=req.body.mobileno;
            let gender=req.body.gender;
            let title = req.body.title;
            let typeId = req.body.typeId;
            let country = req.body.country;
            let profileimage = req.body.profileimage;
            let costperhour=req.body.costperhour;
            let mainlanguage=req.body.mainlanguage;
            let professionname=req.body.professionname;
            let experiences=req.body.experiences;
            let currentworkingaddress=req.body.currentworkingaddress;
            let comment=req.body.comment;

            Userprofessionals.create({
                userId: userid,
                name: name,
                legalfirstname:legalfirstname,
                legallastname:legallastname,
                mobileno:mobileno,
                title: title,
                typeId: typeId,
                gender:gender,
                country: country,
                mainlanguage:mainlanguage,
                professionname:professionname,
                profileimage: profileimage,
                experiences:experiences,
                rating: 0,
                totalhours: 0,
                talkcount: 0,
                costperhour:costperhour,
                currentworkingaddress:currentworkingaddress,
                comments:comment,
                approve: 1,
                activate: 1,
            });

            res.json({
                "message": "success",
                "userId": userid,
                "name": name,
                "title": title,
                "typeId": typeId,
           
                "country": country,
                "costperhour":costperhour
            })

        } else {
            res.status(403).send({
                message: "This user aleady exists as a professional"
            });
        }

    }).catch((err) => {
        res.status(500).send({
            message: "Error  " + err
        });
    });
}

exports.updateProfessionalAccount = (req, res) => {

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
    if (!req.body.name) {
        errors.push("No name specified");
    }
    if (!req.body.legalfirstname) {
        errors.push("No Legal First name specified");
    }
    if (!req.body.legallastname) {
        errors.push("No Legal Last name specified");
    }
    if (!req.body.mobileno) {
        errors.push("No Mobile No specified");
    }
    if (!req.body.title) {
        errors.push("No title specified");
    }
    if (!req.body.typeId) {
        errors.push("No typeId specified");
    }
    if (!req.body.gender) {
        errors.push("No gender specified");
    }
    if (!req.body.country) {
        errors.push("No country specified");
    }
    if (!req.body.mainlanguage) {
        errors.push("No Main Language specified");
    }
    if (!req.body.profileimage) {
        errors.push("No profileimage specified");
    }
    if (!req.body.professionname) {
        errors.push("No Profession specified");
    }
    if (!req.body.experiences) {
        errors.push("No experiences specified");
    }
    if (!req.body.costperhour) {
        errors.push("No costperhour specified");
    }
    if (!req.body.currentworkingaddress) {
        errors.push("No address of work specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    Userprofessionals.findAll({
        where: {
            userId: userid

        }
    }).then((result) => {

        if (result[0]) {
            let name = req.body.name;
            let legalfirstname=req.body.legalfirstname;
            let legallastname=req.body.legallastname;
            let mobileno=req.body.mobileno;
            let gender=req.body.gender;
            let title = req.body.title;
            let typeId = req.body.typeId;
            let country = req.body.country;
            let profileimage = req.body.profileimage;
            let costperhour=req.body.costperhour;
            let mainlanguage=req.body.mainlanguage;
            let professionname=req.body.professionname;
            let experiences=req.body.experiences;
            let currentworkingaddress=req.body.currentworkingaddress;
            let comment=req.body.comment;

            Userprofessionals.update({
                userId: userid,
                name: name,
                legalfirstname:legalfirstname,
                legallastname:legallastname,
                mobileno:mobileno,
                title: title,
                typeId: typeId,
                gender:gender,
                country: country,
                mainlanguage:mainlanguage,
                experiences:experiences,
                costperhour:costperhour,
                currentworkingaddress:currentworkingaddress,
                comments:comment,
            
            }, {
                where: {
                    userId: userid
                }
            });

            res.status(200).json({
                "message": "success"
              
            })

        } else {
            res.status(403).send({
                message: "This user professional details not found"
            });
        }

    }).catch((err) => {
        res.status(500).send({
            message: "Error  " + err
        });
    });
}


exports.getProfessionalDetails = (req, res) => {

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

    Userprofessionals.findAll({
        where: {
            userId: userid

        }
    }).then((result) => {

        res.status(200).send({
       
            result: result
          });

        });

}


exports.createSchedules =   (req, res) => {
  try {

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
    const schedulesData = req.body;

    for (const day in schedulesData) {
      const slots = schedulesData[day];
      console.log("slot "+day+" "+" "+slots);
      console.log("day "+schedulesData[day]);
      for (const time in slots) {
        const availability = slots[time].availability;

    
        const scheduletmp = {
          userId: userid, // assuming user authentication is implemented
          day: day,
          time: time,
          activate: availability
        };

        schedule.create(scheduletmp);
 
      }
    }

    Userprofessionals.update({	
        activate:1	
      	
      }, {	
          where: {	
              userId: userid	
          }	
      });	
    res.status(200).json({ message: 'Schedules created successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// helper function to format time string
const formatTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};


exports.getSchedulesByUserIdDay =   (req, res) => {

    try {

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
        sequelize.query("SELECT day, time, activate FROM schedules WHERE userId = "+userid+" and day="+req.params.day+" ", null, { raw: true })
        .then((result) => {
            console.log(result[0]);
            var result=result[0];
            res.json({ result });
    
          }).catch((err) => {
            res.status(500).send({
              message: "Error: " + err.message
            });
          });
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

exports.updateSchedulesByUserIdAndDay =   (req, res) => {

    try {

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

        const newValues = {
            activate: req.body.activate, 
          };
        
          const conditions = {
            userId: userid,  
            day: req.body.day,  
            time:req.body.time
          };
        schedule.update(newValues, {
            where: conditions,
          })
            .then((numAffectedRows) => {
              console.log(`${numAffectedRows} records updated`);
            })
            .catch((error) => {
              console.error(`Error updating records: ${error}`);
            });
            res.status(200).json({ message: 'Updated Successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};


exports.getProfessionalsTypeById = (req, res) => {

 
    let typeId=  req.params.typeId;
    let limits=  req.params.limit;
    let pagesize=  req.params.page;

    sequelize.query("SELECT Userprofessionals.id, Userprofessionals.userId, Userprofessionals.name, experiences.name as experiences, Userprofessionals.title as titleid, countries.name as countryName, languages.name as languages, Userprofessionals.legalfirstname, Userprofessionals.legallastname, genders.name AS gender, Userprofessionals.profileimage, Userprofessionals.mobileno, Userprofessionals.professionname, Perhourcharges.name AS costperhour, titles.name AS titleName, types.name AS typeName, Userprofessionals.rating, Userprofessionals.totalhours, Userprofessionals.talkcount, Userprofessionals.currentworkingaddress, Userprofessionals.comments, Userprofessionals.approve, Userprofessionals.activate, Userprofessionals.createdAt, Userprofessionals.updatedAt FROM Userprofessionals LEFT JOIN titles ON Userprofessionals.title = titles.id LEFT JOIN types ON Userprofessionals.typeId = types.id LEFT JOIN Perhourcharges ON Userprofessionals.costperhour = Perhourcharges.id LEFT JOIN genders ON Userprofessionals.gender = genders.id LEFT JOIN countries ON Userprofessionals.country = countries.id LEFT JOIN languages ON Userprofessionals.mainlanguage = languages.id LEFT JOIN experiences ON Userprofessionals.experiences = experiences.id WHERE typeId = "+typeId+"  and Userprofessionals.activate =1 GROUP BY Userprofessionals.userId LIMIT "+limits+" OFFSET "+pagesize+"; ", { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      res.json({  "result": result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error: " + err.message
      });
    });

}

exports.getProfessionalsBySearchText = (req, res) => {

 
    let searchText=  req.params.searchText;
    let limits=  req.params.limit;
    let pagesize=  req.params.page;

    let query="SELECT Userprofessionals.id, Userprofessionals.userId, Userprofessionals.name, experiences.name as experiences, Userprofessionals.title as titleid, countries.name as countryName, languages.name as languages, Userprofessionals.legalfirstname, Userprofessionals.legallastname, genders.name AS gender, Userprofessionals.profileimage, Userprofessionals.mobileno, Userprofessionals.professionname, Perhourcharges.name AS costperhour, titles.name AS titleName, types.name AS typeName, Userprofessionals.rating, Userprofessionals.totalhours, Userprofessionals.talkcount, Userprofessionals.currentworkingaddress, Userprofessionals.comments, Userprofessionals.approve, Userprofessionals.activate, Userprofessionals.createdAt, Userprofessionals.updatedAt FROM Userprofessionals LEFT JOIN titles ON Userprofessionals.title = titles.id LEFT JOIN types ON Userprofessionals.typeId = types.id LEFT JOIN Perhourcharges ON Userprofessionals.costperhour = Perhourcharges.id LEFT JOIN genders ON Userprofessionals.gender = genders.id LEFT JOIN countries ON Userprofessionals.country = countries.id LEFT JOIN languages ON Userprofessionals.mainlanguage = languages.id LEFT JOIN experiences ON Userprofessionals.experiences = experiences.id WHERE Userprofessionals.name like '%"+searchText+"%'  and Userprofessionals.activate =1 GROUP BY Userprofessionals.userId ; ";
    console.log(query);
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      res.json({  "result": result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error: " + err.message
      });
    });

}

exports.getProfessionalsAllTypeByAllId = (req, res) => {

 
    //let typeId=  req.params.typeId;
    let limits=  req.params.limit;
    let pagesize=  req.params.page;

    sequelize.query("SELECT Userprofessionals.id, Userprofessionals.userId, Userprofessionals.name, experiences.name as experiences, Userprofessionals.title as titleid, countries.name as countryName, languages.name as languages, Userprofessionals.legalfirstname, Userprofessionals.legallastname, genders.name AS gender, Userprofessionals.profileimage, Userprofessionals.mobileno, Userprofessionals.professionname, Perhourcharges.name AS costperhour, titles.name AS titleName, types.name AS typeName, Userprofessionals.rating, Userprofessionals.totalhours, Userprofessionals.talkcount, Userprofessionals.currentworkingaddress, Userprofessionals.comments, Userprofessionals.approve, Userprofessionals.activate, Userprofessionals.createdAt, Userprofessionals.updatedAt FROM Userprofessionals LEFT JOIN titles ON Userprofessionals.title = titles.id LEFT JOIN types ON Userprofessionals.typeId = types.id LEFT JOIN Perhourcharges ON Userprofessionals.costperhour = Perhourcharges.id LEFT JOIN genders ON Userprofessionals.gender = genders.id LEFT JOIN countries ON Userprofessionals.country = countries.id LEFT JOIN languages ON Userprofessionals.mainlanguage = languages.id LEFT JOIN experiences ON Userprofessionals.experiences = experiences.id and Userprofessionals.activate =1   GROUP BY Userprofessionals.userId LIMIT "+limits+" OFFSET "+pagesize+"; ", { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      res.json({  "result": result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error: " + err.message
      });
    });

}

exports.getSchedulesByUserId = (req, res) => {

     
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
     
    schedule.findOne({
        where: {
          id: userId
        }
      }).then(result=>{
        res.json({
         
            "result": result,
           
        });
      });

}