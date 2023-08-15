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
    sql.query("SELECT * FROM espacoscomuns", (err, res) => {
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
    WHERE morador_idMorador = ${idMorador}`, (err, res) => {
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

    

module.exports = Reserve;