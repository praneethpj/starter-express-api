const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/makepayment",
    [authJwt.verifyToken,authJwt.isUserActive],
    controller.makePayment
  );

  app.post(
    "/api/bookaprofessional",
    [authJwt.verifyToken,authJwt.isUserActive],
    controller.bookaprofessional
  );

  app.post(
    "/api/getPaymentsById/:billid",
    [authJwt.verifyToken,authJwt.isUserActive],
    controller.getPaymentsById
  );
};