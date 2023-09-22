const sql = require("./db.js");

const Rent = function (rent) {
    this.morador_idMorador = rent.idMorador;
    this.espacoscomuns_idEspacoscomuns = rent.idEspacosComuns;
    this.dataLocacao = rent.dataLocacao;
};

Rent.createNewRent = (newRentLocation, result) => {
    sql.query("INSERT INTO reserva SET ?", newRentLocation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return
        };

        console.log("created reserve: ", { id: res.insertId, ...newRentLocation });
        result(null, { id: res.insertId, ...newRentLocation });
    });
};

module.exports = Rent;