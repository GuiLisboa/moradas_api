module.exports = app => {
    const doc = require("../controllers/doc.controller.js");

    var router = require("express").Router();

    app.use('/api/doc', router);

    router.get("/findAllDoc", doc.findAllDoc);
    router.post("/createDoc", doc.createDoc);

};