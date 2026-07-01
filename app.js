const express= require("express");
const cors= require("cors"); //cors 
const app= express();
const puerto= 3000; 
app.use(cors());
app.use(express.json());

/*test para verificar que el servidor funciona
app.get("/test", (req, res) => {
    res.send("Servidor funcionando");
});*/
// ver clientes(bd), req es la solicitud del cliente, res es la respuesta que se enviará al cliente
const clientesRouter= require("./rutas/clientes");
app.use("/clientes", clientesRouter);
const pedidosRouter= require("./rutas/pedidos");
app.use("/pedidos",pedidosRouter);
const productosRouter= require("./rutas/productos");
app.use("/productos", productosRouter);
const disponibilidadRouter= require("./rutas/disponibilidad_productos");
app.use("/disponibilidad_productos", disponibilidadRouter );

/*
app.get("/pedidos", (req, res) => {
    db.query("SELECT * FROM Pedidos", (error, result)=>{
        if(error) return res.send(error);
        res.json(result);
    });
});
    */
// se inicia el servidor
app.listen(puerto,() =>{ //3000 es el puerto donde se ejecuta el servidor, listen es el método que inicia el servidor y recibe una función de callback que se ejecuta cuando el servidor esta listo para recibir solicitudes
    console.log(`Servidor en ejecución en el puerto ${puerto}`);
});