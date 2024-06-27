const express = require("express");
const {registerController,loginController}= require("../controllers/authControllers");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);
router.post("/login", loginController);
// LOGIN || POST
// router.post("/login", loginController);

module.exports = router;