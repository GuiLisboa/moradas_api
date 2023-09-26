module.exports = app => {
const ticket = require("../controllers/ticket.controller.js");

var router = require("express").Router();

app.use('/api/ticket', router);

router.post("/createTicket", ticket.create);

router.get("/findAll", ticket.getAll);

router.get("/findById/:id", ticket.findById);

router.put("/updateById/:id", ticket.updateById);

router.put("/updateTicketStatus/:id", ticket.updateTicketStatus);

router.delete("/deleteById/:id", ticket.deleteById);

router.get("/ticketType", ticket.ticketType);

};