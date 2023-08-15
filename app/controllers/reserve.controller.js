const Reserve = require("../models/reserve.model.js");

exports.getAllLocation = (req, res) => {
    Reserve.getAllLocation((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
}

exports.getReserveByUserId = (req, res) => {
    Reserve.getReserveByUserId(req.params.id, (err, data) => {

        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Reserve with User id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Reserve with User id " + req.params.id
                });
            }
        }else res.send(data); 
    });
}

exports.createNewReserveLocation = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    };

    const reserveLocation = new Reserve({
        idEspacosComuns: req.body.idEspacosComuns,
        title: req.body.title,
        leftIcon: req.body.leftIcon,
        usageFee: req.body.usageFee,
        capacity: req.body.capacity,
        active: 1
    });

    Reserve.createNewReserveLocation(reserveLocation, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Reserve."
            });
        else res.send(data);
    });
}
