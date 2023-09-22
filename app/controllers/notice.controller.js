const Notice = require("../models/notice.model.js");


exports.findAllNotice = (req, res) => {
    Notice.findAllNotice((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving notices."
            });
        else res.send(data);
    });
};


exports.createNotice = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    };

    const notice = new Notice({
        title: req.body.titulo,
        description: req.body.descricao,
        dateStart: req.body.dataInicio,
        dateEnd: req.body.dataFim
    });

    Notice.createNotice(notice, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Notice."
            });
        else res.send(data);
    });
};

