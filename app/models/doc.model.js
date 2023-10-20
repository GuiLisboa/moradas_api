const sql   = require("./db.js");

const Doc = function (doc) {
    this.idDocumento = doc.idDocumento;
    this.tituloDocumento = doc.title;
    this.descricaoDocumento = doc.description;
    this.nomeDocumento = doc.path;
};

Doc.findAllDoc = result => {
    sql.query("SELECT * FROM documentos", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        };
        console.log("document: ", res);
        result(null, res);
    });
};

Doc.createDoc = (newDoc, result) => {
    sql.query("INSERT INTO documentos SET ?", newDoc, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        };
        console.log("created document: ", { id: res.insertId, ...newDoc });
        result(null, { id: res.insertId, ...newDoc });
    });
};

module.exports = Doc;