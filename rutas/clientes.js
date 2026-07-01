const express= require("express"); //facilita la creacion de servidores web y APIs, simplifica el manejo de rutas, solicitudes y respuestas HTTP
const router= express.Router();
const db= require("../bd");

// ver clientes(bd), req es la solicitud del cliente, res es la respuesta que se enviará al cliente
router.get("/", (req, res) => {
    db.query("SELECT * FROM Clientes", (error, result) => { //consula a a tabla Clientes
        if (error) return res.send(error); //send envia la respuesta al cliente, si hay un error se muestra el error y sino null
        res.json(result);
         //aqui el resultado se convierte a formato JSON
    });
});
router.post("/registro", (req,res)=>{
    const {nombre, apellido, usuario, contraseña, email}= req.body;
    const sql= `INSERT INTO Clientes(nombre, apellido, usuario, contraseña, email) VALUES (?,?,?,?,?)`;
    db.query(
        sql, [nombre, apellido, usuario, contraseña, email],
        (error, result)=>{
            if(error) return res.send(error);
            
            //console.log("Entro a registro");
            res.json({mensaje: "Cliente registrado", ID_cliente: result.insertId});
            //console.log("cliente registrado");
        }
    )
});
router.post("/login",(req,res)=>{
    const {usuario, contraseña}= req.body;

    const sql=
`SELECT * FROM Clientes
WHERE usuario= ?
AND contraseña= ?`;

    db.query(sql,[usuario, contraseña],
        (error, result)=>{
        if(error)
            return res.send(error);
        if(result.length > 0){
            res.json({
                mensaje:"Inicio de sesión exitoso",
                ID_cliente:
                result[0].ID_cliente,
                usuario: result[0].usuario,
                esAdmin: result[0].ID_cliente == 9,
            });

        }else{
            res.json({mensaje:"Usuario o contraseña incorrectos"});
        }
});
});
module.exports= router;
/* get: quiero obtener informacion,
   post: quiero enviar informacion,
   put: quiero actualizar informacion,
   delete: quiero eliminar informacion,
   patch: quiero actualizar parcialmente la informacion,
   option: quiero obtener informacion sobre las opciones disponibles para una ruta,
   head: quiero obtener solo los encabezados de la respuesta,
   connect: quiero establecer una conexion con el servidor,
   trace: quiero rastrear la ruta de la solicitud a traves del servidor,
   all: quiero manejar todas las solicitudes para una ruta especifica.
 */