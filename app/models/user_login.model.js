const sql = require("./db.js");


const Login = function (login) {
    this.emailLogin = login.emailLogin;
    this.passwordLogin = login.passwordLogin;
};


Login.findByLogin = (login, result) => {
    sql.query(`SELECT * FROM morador WHERE email = '${login.emailLogin}' AND password = '${login.passwordLogin}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else if (res.length) {
            console.log("morador: ", res);
            result(null, res);
            return;
        } else {
            result({ kind: "not_found" }, null);
            return;
        }
    });
};

module.exports = Login;
