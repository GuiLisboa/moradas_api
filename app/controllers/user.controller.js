const User = require("../models/user.model.js");


exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

let dateNow = year + "-" + month + "-" + date;

    const user = new User({
        idMorador: req.body.idMorador,
        fullName: req.body.fullName,
        cpf: req.body.cpf,
        phone: req.body.phone,
        email: req.body.email,
        tower: req.body.tower,
        apartment: req.body.apartment,
        password: req.body.password,
        createdOn: dateNow,
        isAdmin: req.body.isAdmin,
        isActive: req.body.isActive,
        moradia_idMoradia: 1
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
    User.deleteById(req.params.id, (err, data) => {
        oi = data.toString();
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
        } if (oi.length > 45) {
            res.status(404).send({ message: `User could not delete! Virify if the user has a dependecy!`});
            
        } else res.send({ message: `User was deleted successfully!` + data });
    });
};
