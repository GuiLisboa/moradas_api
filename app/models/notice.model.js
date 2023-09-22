const sql = require("./db.js");

const Notice = function (notice) {
    this.idAvisos = notice.idAvisos;
    this.titulo = notice.title;
    this.descricao = notice.description;
    this.dataInicio = notice.dateStart;
    this.dataFim = notice.dateEnd;
};

Notice.findAllNotice = result => {
    sql.query("SELECT * FROM avisos WHERE dataFim >= curdate()", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        };
        console.log("notice: ", res);
        result(null, res);
    });
};

Notice.createNotice = (newNotice, result) => {
    sql.query("INSERT INTO avisos SET ?", newNotice, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        };
        console.log("created notice: ", { id: res.insertId, ...newNotice });
        result(null, { id: res.insertId, ...newNotice });
    });
};

module.exports = Notice;