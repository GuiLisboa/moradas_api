const Login = require("../models/user_login.model.js");

exports.findByLogin = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const login = new Login({
        emailLogin: req.body.email,
        passwordLogin: req.body.password
    });

    Login.findByLogin(login, (err, data) => {
        if(!req.body) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
        }

        if(err) {
            if(err.kind === "not_found") {
                res.status(300).send({
                    message: `Not found User with email ${req.params.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with email " + req.params.email
                });
            }
        } else res.status(200).send(data);
    });
}