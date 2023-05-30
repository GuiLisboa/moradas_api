module.exports = app => {
const user = require("../controllers/user.controller.js");

var router = require("express").Router();

app.use('/api/user', router);

// Create a new User
router.post("/createUser", user.create);

router.get("/findAll", user.getAll);

router.get("/findById/:id", user.findById);

router.put("/updateById/:id", user.updateById);

router.delete("/deleteById/:id", user.deleteById);

};