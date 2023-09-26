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
    sql.query(`SELECT  O.idOcorrencia, O.dataOcorrencia, T.tipoOcorrencia, O.descricaoOcorrencia, O.localOcorrencia, S.statusOcorrencia, O.createdOn, O.morador_idMorador
    FROM ocorrencia O INNER JOIN statusocorrencia S on O.StatusOcorrencia_idStatusOcorrencia = S.idStatusOcorrencia 
    INNER JOIN tipoocorrencia T on  T.idTipoOcorrencia = O.TipoOcorrencia_idTipoOcorrencia`, (err, res) => {
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
    sql.query(`SELECT  O.idOcorrencia, O.dataOcorrencia, T.tipoOcorrencia, O.descricaoOcorrencia, O.localOcorrencia, S.statusOcorrencia, O.createdOn
    FROM ocorrencia O INNER JOIN statusocorrencia S on O.StatusOcorrencia_idStatusOcorrencia = S.idStatusOcorrencia 
    INNER JOIN tipoocorrencia T on  T.idTipoOcorrencia = O.TipoOcorrencia_idTipoOcorrencia WHERE morador_idMorador = ${idMorador}`, (err, res) => {
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

Ticket.updateTicketStatus = (idTicket, status, result) => {
    sql.query(
        "UPDATE ocorrencia SET StatusOcorrencia_idStatusOcorrencia = ?  WHERE idOcorrencia = ?",
        [status, idTicket],        
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

            console.log("updated user: ", { idTicket: idTicket, ...status });
            result(null, { idTicket: idTicket, ...status });
        }
    );
};

Ticket.deleteById = (idTicket, result) => {
    sql.query("DELETE FROM ocorrencia WHERE idOcorrencia = ?", idTicket, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted ticket with id: ", idTicket);
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
