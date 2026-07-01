window.onload = cargarReservas;
async function cargarReservas() {
    const ID_cliente =
        localStorage.getItem("ID_cliente");
    if (!ID_cliente) {
        alert("Debes iniciar sesión");
        return;
    }
    try {
        const res =await fetch(`http://localhost:3000/pedidos/cliente/${ID_cliente}`);
        const pedidos =await res.json();

        console.log(pedidos);

        const contenedor =document.getElementById("contenedorReservas");
        contenedor.innerHTML = "";

        if (!pedidos ||pedidos.length === 0) {

            contenedor.innerHTML = "<h2>No tienes pedidos todavía</h2>";
            return;
        }
        pedidos.forEach(p => {
            const estadoClase =p.estado === "entregado"
                    ? "completado"
                    : "proceso";
            const icono =
                p.estado === "entregado"
                    ? "fa-circle-check"
                    : "fa-clock";

            contenedor.innerHTML += `
            <article class="cardreserva">
            <img src="${p.imagen}" alt="${p.nombre}">
            <div class="info">
            <h2>${p.nombre}</h2>
            <p>Salida:${formatearFecha(p.fecha_salida)}</p>
            <p>Regreso:${formatearFecha(p.fecha_regreso)}</p>
            <p>Cantidad:${p.cantidad}</p>
            <small>Precio por persona $${Number(p.precio).toLocaleString()}</small>
            <div class="precio">Precio Total:
            $${Number( p.precio_total).toLocaleString()}</div>
            ${p.estado !== "cancelado"
                    ? `<div class="footer-card"><button onclick="cancelarPedido(${p.ID_pedido})">
                    CANCELAR PEDIDO</button></div>`
                    :
                    ""
                }
                </div>
                <div class="estado ${estadoClase}">
                ${p.estado}<i class="fa-regular ${icono}"></i>
                </div></article>`;
        });
    }
    catch (error) {
        console.log(error);
        alert("Error al cargar reservas");
    }
}
function formatearFecha(fecha) {
    if (!fecha)
        return "-";
    return new Date(fecha).toLocaleDateString("es-AR");
}

async function cancelarPedido(id) {
    try {
        const res =await fetch(`http://localhost:3000/pedidos/${id}/estado`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({estado:"cancelado"})
                }
            );
        const data = await res.json();
        alert(data.mensaje);
        cargarReservas();
    }
    catch {
        alert("No se pudo cancelar");
    }
}