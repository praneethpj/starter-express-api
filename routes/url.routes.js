const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/url.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/generate",
    [authJwt.verifyToken,authJwt.isPaymentActive],
    controller.generateUrl
  );
  app.post(
    "/api/extract",
    [authJwt.verifyToken,authJwt.isUserActive,authJwt.isPaymentActive],
    controller.extractUrl
  );
};