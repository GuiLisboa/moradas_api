const Ticket = require("../models/ticket.model.js");

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

    const ticket = new Ticket({
        idTicket: req.body.idTicket,
        ocorrenceDate: req.body.ocorrenceDate,
        ticketType: req.body.ticketType,
        ticketDescription: req.body.ticketDescription,
        ticketLocalDescription: req.body.ticketLocalDescription,
        status: req.body.status,
        createdOn: dateNow,
        morador_idMorador: req.body.morador_idMorador
        
    });

    Ticket.create(ticket, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.status(201).send(data);
    });
};

exports.getAll = (req, res) => {
    Ticket.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.findById = (req, res) => {
    Ticket.findById(req.params.id, (err, data) => {

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

    Ticket.updateById(
        req.params.id,
        new Ticket(req.body),
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
    Ticket.deleteById(req.params.id, (err) => {
        
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
};

exports.ticketType = (req, res) => {
    Ticket.ticketType((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};