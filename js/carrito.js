document.getElementById("comprar").addEventListener("click", ()=>{
    const id_cliente=localStorage.getItem("ID_cliente");
    // Verificar login
    if (!id_cliente) {
        alert("Debes iniciar sesión");
        return;
    }
    const carrito= JSON.parse(localStorage.getItem("carrito")) || [];
    // Verificar carrito
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    fetch("http://localhost:3000/pedidos/pedido",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id_cliente: parseInt(id_cliente),
            productos: carrito
        })
    })
    .then(r=>r.json())
    .then(resultado=>{
        alert(
            resultado.mensaje
        );
        // Vaciar carrito
        localStorage.removeItem("carrito");
    })
    .catch(error=>{
        console.error(error);
        alert("Error al comprar");
    });

});