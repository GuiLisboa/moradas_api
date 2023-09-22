const Rent = require("../models/rent.model.js");

exports.createNewRent = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    };

    const rentLocation = new Rent({
        idMorador: req.body.idMorador,
        idEspacosComuns: req.body.idEspacosComuns,
        dataLocacao: req.body.dataLocacao
    });

    Rent.createNewRent(rentLocation, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reserve."
            });
        else res.send(data);
    });
}
