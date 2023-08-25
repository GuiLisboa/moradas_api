module.exports = app => {
const login = require("../controllers/user_login.controller.js");

var router = require("express").Router();

app.use('/api/login', router);

router.post("/findByLogin", login.findByLogin);

};