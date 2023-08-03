const sql = require("./db.js");


const Ticket = function (ticket) {
    this.idOcorrencia = ticket.idTicket;
    this.dataOcorrencia = ticket.ocorrenceDate;
    this.TipoOcorrencia_idTipoOcorrencia = ticket.ticketType;
    this.descricaoOcorrencia = ticket.ticketDescription;
    this.localOcorrencia = ticket.ticketLocalDescription;
    this.StatusOcorrencia_idStatusOcorrencia = ticket.status;
    this.createdOn = ticket.createdOn;
    this.morador_idMorador = ticket.morador_idMorador;
};

Ticket.create = (newTicket, result) => {
    sql.query("INSERT INTO ocorrencia SET ?", newTicket, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created ticket: ", { id: res.insertId, ...newTicket });
        result(null, { id: res.insertId, ...newTicket });
    });
};

Ticket.getAll = result => {
    sql.query("SELECT Oco.idOcorrencia, Oco.dataOcorrencia, Tip.tipoOcorrencia as TipoOcorrencia_idTipoOcorrencia, Oco.descricaoOcorrencia, Oco.localOcorrencia, Sta.statusOcorrencia as StatusOcorrencia_idStatusOcorrencia, Oco.createdOn FROM ocorrencia Oco INNER JOIN statusocorrencia Sta on StatusOcorrencia_idStatusOcorrencia = idStatusOcorrencia INNER JOIN tipoocorrencia Tip on TipoOcorrencia_idTipoOcorrencia = idTipoOcorrencia", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("ocorrencia: ", res);
        result(null, res);
    });
};

Ticket.findById = (idMorador, result) => {
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

Ticket.updateById = (idMorador, user, result) => {
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

Ticket.deleteById = (idMorador, result) => {
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

Ticket.ticketType = result => {
    sql.query("SELECT * FROM tipoocorrencia", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return
        }
        console.log("tipoocorrencia: ", res);
        result(null, res);
    });
};

module.exports = Ticket;
