const sql = require("./db.js");


const Reserve = function (reserveLocation) {
    this.idEspacosComuns = reserveLocation.idEspacosComuns;
    this.nome = reserveLocation.title;
    this.icone = reserveLocation.leftIcon;
    this.taxaUso = reserveLocation.usageFee;
    this.capacidade = reserveLocation.capacity;
    this.ativo = reserveLocation.active;
};


Reserve.getAllLocation = result => {
    sql.query("SELECT * FROM espacoscomuns WHERE ativo = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("espaços: ",res);
        result(null, res);
    });
};

Reserve.getReserveByUserId = (idMorador, result) => {
    sql.query(`SELECT R.idreserva, R.morador_idMorador, E.icone, E.nome, E.taxaUso,
    E.capacidade, R.dataLocacao 
    FROM reserva R INNER JOIN espacoscomuns E on idEspacosComuns = espacoscomuns_idEspacosComuns 
    WHERE R.dataLocacao >= curdate() and morador_idMorador = ${idMorador}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("espaço: ", res);
        result(null, res);
    });
};

Reserve.createNewReserveLocation = (newReserveLocation, result) => {
    sql.query("INSERT INTO espacoscomuns SET ?", newReserveLocation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        };
        console.log("created reserve: ", { id: res.insertId, ...newReserveLocation });
        result(null, { id: res.insertId, ...newReserveLocation });
    });
};

Reserve.disableReserveLocationById = (idEspaco, result) => {
    sql.query("UPDATE espacoscomuns SET ativo = 0 WHERE idEspacosComuns = ?" , idEspaco, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated Location: ",  idEspaco );
            result(null, res);
    });
};

Reserve.deleteReserveById = (idReserva, result) => {
    sql.query("DELETE FROM reserva WHERE idReserva = ?", idReserva, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        };

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        };

        console.log("deleted reserve with id: ", idReserva);
        result(null, res);
    });
};

module.exports = Reserve;
