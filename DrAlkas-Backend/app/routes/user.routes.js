module.exports = app => {
  const user = require("../controllers/user.js")

  var router = require("express").Router();

  // Create new user
  router.post("/create", user.createUser);

  //  Get login details
  router.post("/login", user.login);
  router.get("/getOtp", user.getOtp);
  router.get("/verify", user.verify);
  router.post("/sendMail", user.sendMail);



  app.use("/", router);
};
