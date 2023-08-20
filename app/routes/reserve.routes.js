module.exports = app => {
const reserve = require("../controllers/reserve.controller.js");

var router = require("express").Router();

app.use('/api/reserve', router);

router.post("/createNewReserveLocation", reserve.createNewReserveLocation);

router.get("/findAllLocation", reserve.getAllLocation);

router.get("/findReserveByUserId/:id", reserve.getReserveByUserId);

router.delete("/deleteReserveById/:id", reserve.deleteReserveById);

};