const Doc = require('../models/doc.model.js');


exports.findAllDoc = (req, res) => {
    Doc.findAllDoc((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving docs."
            });
        else res.send(data);
    });
};

exports.createDoc = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    };

    const doc = new Doc({
        title: req.body.tituloDocumento,
        description: req.body.descricaoDocumento,
        path: req.body.nomeDocumento
    });

    Doc.createDoc(doc, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Doc."
            });
        else res.send(data);
    });

};