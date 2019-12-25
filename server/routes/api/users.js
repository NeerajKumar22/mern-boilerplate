var express = require('express');
var router = express.Router();
var userController = require("./../../controller/userController");

router.get("/", userController.welcomeMessage);

router.get("/test", userController.testMessage);

module.exports = router;
