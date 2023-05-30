const User = require("../models/user.model.js");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const user = new User({
        idMorador: req.body.idMorador,
        fullname: req.body.fullname,
        cpf: req.body.cpf,
        phone: req.body.phone,
        email: req.body.email,
        tower: req.body.tower,
        apartment: req.body.apartment,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.status(201).send(data);
    });
};

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    User.findById(req.params.id, (err, data) => {

        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        }else res.send(data); 
    });
};

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    };

    console.log(req.body);

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.deleteById = (req, res) => {
    User.deleteById(req.params.id, (err) => {
        
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
}