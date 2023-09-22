module.exports = app => {
    const rent = require("../controllers/rent.controller.js");

    var router = require("express").Router();

    app.use('/api/rent', router);

    router.post("/createNewRent", rent.createNewRent);
};