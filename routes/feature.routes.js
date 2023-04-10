const { authJwt } = require("../middleware");
const controller = require("../controllers/features.controller");

module.exports = function(app) {

    app.get(
        "/api/feature/countrylist",
       
        controller.getAllCountryList
      );

      app.get(
        "/api/feature/genderlist",
       
        controller.getAllGenderList
      );

      app.get(
        "/api/feature/experiencelist",
       
        controller.getAllExperienceList
      );

      app.get(
        "/api/feature/languagelist",
       
        controller.getAllLanguageList
      );

      app.get(
        "/api/feature/perhourchargelist",
       
        controller.getAllPerhourchargeList
      );

      app.get(
        "/api/feature/professionaltype",
       
        controller.getAllProfessionalTypeList
      );

      app.get(
        "/api/feature/getalltitle",
       
        controller.getAllTitleList
      );

      app.put(
        "/api/feature/updateallnotifications",
        [authJwt.verifyToken],
        controller.updateAllNotifications
      );
}