module.exports = app => {
    const reserve = require("../controllers/reserve.controller.js");
    
    var router = require("express").Router();
    
    app.use('/api/reserve', router);
    
    
    router.get("/findAllLocation", reserve.getAllLocation);

    router.get("/findReserveByUserId/:id", reserve.getReserveByUserId);
    
    
    };