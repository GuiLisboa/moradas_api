module.exports = app => {
const ticket = require("../controllers/ticket.controller.js");

var router = require("express").Router();

app.use('/api/ticket', router);

// Create a new User
router.post("/createTicket", ticket.create);

router.get("/findAll", ticket.getAll);

router.get("/findById/:id", ticket.findById);

router.put("/updateById/:id", ticket.updateById);

router.delete("/deleteById/:id", ticket.deleteById);

};