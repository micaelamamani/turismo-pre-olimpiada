const mysql= require("mysql2"); 
// conexion a mysql
 const db= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "286KaidoshuN286",
    database: "olimpiadas"
});
db.connect((error) => {
    if (error) {
        console.log("Error conexión MySQL:", error);
    } else {
        console.log("Conectado a MySQL");
    }
});
module.exports= db;