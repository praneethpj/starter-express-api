const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/professional.controller");
const uploadcontroller = require("../middleware/upload");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/applyprofessional",
    [authJwt.verifyToken],
    controller.applyProfessionalAccount
  );
  
  
  app.post(
    "/api/updateProfessional",
    [authJwt.verifyToken],
    controller.updateProfessionalAccount
  );
  app.post(
    "/api/addtype",
    [authJwt.verifyToken],
    controller.addtype
  );

 

  app.post(
    "/api/documentupload",
    [authJwt.verifyToken],
    uploadcontroller
  );

  app.post(
    "/api/addShedule",
    [authJwt.verifyToken],
    controller.addShedule
  );

  app.get(
    "/api/getAllProfessional",
    controller.getAllProfessionals
  );

  app.get(
    "/api/getProfessionalById/:id",
    controller.getProfessionalById
  );
  app.get(
    "/api/getProfessionalScheduleById/:id/:day/:year/:month/:date",
    controller.getProfessionalScheduleById
  );

  app.post(
    "/api/checkcalls",
    [authJwt.verifyToken],
    controller.checkcalls
  );
  app.put(
    "/api/updatecallstatustoreceived",
    [authJwt.verifyToken],
    controller.updateCallstatusToreceived
  );
  app.post(
    "/api/uploadgovermentid",
    [authJwt.verifyToken],
    controller.uploadgovermentId
  );

  app.post(
    "/api/uploadhighestqualification",
    [authJwt.verifyToken],
    controller.uploadHighestQualification
  );

  app.post(
    "/api/uploadprofessionalprofilepic",
    [authJwt.verifyToken],
    controller.uploadProfessionalProfilePic
  );
  app.post(
    "/api/uploadappoinmentletter",
    [authJwt.verifyToken],
    controller.uploadAppoinmentLetter
  );
  app.post(
    "/api/uploadlivephoto",
    [authJwt.verifyToken],
    controller.uploadLivePhoto
  );
  app.post(
    "/api/uploadlivephoto",
    [authJwt.verifyToken],
    controller.getProfessionalDetails
  );

  app.post(
    "/api/createSchedules",
    [authJwt.verifyToken],
    controller.createSchedules
  );
  app.get(
    "/api/getschedulesbyuserid/:day",
    [authJwt.verifyToken],
    controller.getSchedulesByUserIdDay
  );

   app.put(
    "/api/updateschedulesbyuseridandday",
    [authJwt.verifyToken],
    controller.updateSchedulesByUserIdAndDay
  );

  app.get(
    "/api/getProfessionalsTypeById/:typeId/:page/:limit",
    controller.getProfessionalsTypeById
  );

  app.get(
    "/api/getProfessionalsBySearchText/:searchText/:page/:limit",
    controller.getProfessionalsBySearchText
  );

  app.get(
    "/api/getProfessionalsAllTypeByAllId/:page/:limit",
    controller.getProfessionalsAllTypeByAllId
  );

  app.delete(
    "/api/resetAllScheduleByUserId",
    [authJwt.verifyToken],
    controller.resetAllScheduleByUserId
  );

  app.get(
    "/api/getSchedulesByUserId",
    [authJwt.verifyToken],
    controller.getSchedulesByUserId
  );
};