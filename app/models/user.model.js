const sql = require("./db.js");


const User = function (user) {
    this.idMorador = user.idMorador;
    this.fullName = user.fullName;
    this.cpf = user.cpf;
    this.phone = user.phone;
    this.email = user.email;
    this.tower = user.tower;
    this.apartment = user.apartment;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
    this.isActive = user.isActive;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO morador SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM morador", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("morador: ", res);
        result(null, res);
    });
};

User.findById = (idMorador, result) => {
    sql.query(`SELECT * FROM morador WHERE idMorador = ${idMorador}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("morador: ", res);
        result(null, res);
    });
};

User.updateById = (idMorador, user, result) => {
    sql.query(
        "UPDATE morador SET fullName = ?, cpf = ?, phone = ?, email = ?, tower = ?, apartment = ?, password = ? WHERE idMorador = ?",
        [user.fullName, user.cpf, user.phone, user.email, user.tower, user.apartment, user.password, idMorador],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { idMorador: idMorador, ...user });
            result(null, { idMorador: idMorador, ...user });
        }
    );
};

User.deleteById = (idMorador, result) => {
    sql.query("DELETE FROM morador WHERE idMorador = ?", idMorador, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted User with id: ", idMorador);
        result(null, res);
    });
};

module.exports = User;
