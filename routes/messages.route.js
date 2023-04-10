const { authJwt } = require("../middleware");
const controller = require("../controllers/chatmessages.controller");

 
module.exports = function(app) {
  
      app.get(
        "/api/readallchatmessagesbyuser",
        [authJwt.verifyToken,authJwt.isUserActive],
        controller.readAllChatMessagesByUser
      );
        app.get(
        "/api/readchatmessagesbyrecipientId/:recipientId",
        [authJwt.verifyToken,authJwt.isUserActive],
        controller.readChatMessagesByRecipientId
      );
      // app.get(
      //   "/user-status/:userId",
      //   [authJwt.verifyToken,authJwt.isUserActive],
      //   controller.checkUserStatus
      // );
}