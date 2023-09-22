module.exports = app => {
    const notice = require("../controllers/notice.controller.js");

    var router = require("express").Router();

    app.use('/api/notice', router);

    router.get("/findAllNotice", notice.findAllNotice);
    router.post("/createNotice", notice.createNotice);

};