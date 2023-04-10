const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/call.controller");

module.exports = function(app) {

    app.put(
        "/api/call/updateendcall",
        controller.updateEndCall
      );


      app.get(
        "/api/call/upcomingcalls",
        [authJwt.verifyToken],
        controller.getUpcomingCalls
      );

      
      app.get(
        "/api/call/historycalls",
        [authJwt.verifyToken],
        controller.getHistoryCalls
      );

        app.get(
        "/api/call/comment/:id",
        [authJwt.verifyToken],
        controller.getCommentsofProfessions
      );
    }