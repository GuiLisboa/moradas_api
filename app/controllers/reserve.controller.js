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