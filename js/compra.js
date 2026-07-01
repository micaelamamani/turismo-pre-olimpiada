// Mostrar carrito al abrir carrito
window.onload = mostrarCarrito;
// MOSTRAR PRODUCTOS DEL CARRITO
function mostrarCarrito() {
    /*const ID_cliente = localStorage.getItem("ID_cliente");
    if (!ID_cliente) {
        alert("Debes iniciar sesión");
        return;
    }*/
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("contenedorCarrito");
    const totalHTML = document.getElementById("precioTotal");
    contenedor.innerHTML = "";
    let total = 0;
    // Si no hay productos
    if (carrito.length === 0) {
        contenedor.innerHTML = "<h2>Tu carrito está vacío</h2>";
        totalHTML.textContent = "$0";
        return;
    }
    // Recorrer carrito
    carrito.forEach(producto => {
        const subtotal = producto.precio_unitario * producto.cantidad;
        total += subtotal;
        // Crear tarjeta
        contenedor.innerHTML += `
        <div class="tarjeta">
        <img src="${producto.imagen}" class="imagen">
        <div class="info">
        <h2>${producto.nombre}</h2>
        <p>Cantidad:<b>${producto.cantidad}</b></p>
        <p>Subtotal:<b>$${subtotal.toLocaleString()}</b></p>
        <button class="eliminar" onclick="eliminarProducto(${producto.ID_producto})">
        Eliminar</button></div></div>`;
    });
    // Mostrar total
    totalHTML.textContent ="Total: " +"$" + total;
}
// ELIMINAR
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(producto => producto.ID_producto !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}
// COMPRAR
document.getElementById("comprar").addEventListener("click", () => {
    const ID_cliente = localStorage.getItem("ID_cliente");
    if (!ID_cliente) {
        alert("Debes iniciar sesión");
        return;
    }
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }
    const body = {
        ID_cliente: parseInt(ID_cliente),
        productos: carrito
    };
    fetch("http://localhost:3000/pedidos/pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    )
        .then(r => r.json())
        .then(resultado => {
            alert(resultado.mensaje);
            localStorage.removeItem("carrito");
            mostrarCarrito();
            const botonReserva = document.getElementById("verReserva");
            if (botonReserva) {
                botonReserva.style.display = "block";
            }
        }
        )
        .catch(error => {
            console.log(error);
            alert("Error");
        });
});

const btnMostrarPago = document.getElementById("btnMostrarPago");
const seccionPago = document.getElementById("seccionPago");
const botonesPago = document.querySelectorAll(".medioPago");
const formTarjeta = document.getElementById("formTarjeta");
const formTransferencia = document.getElementById("formTransferencia");
const tituloTarjeta = document.getElementById("tituloTarjeta");
// Mostrar medios de pago
btnMostrarPago.addEventListener("click", () => {
    seccionPago.classList.remove("oculto");
    seccionPago.scrollIntoView({
        behavior: "smooth"
    });
});

// Elegir método de pago
botonesPago.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipo =
            boton.dataset.tipo;
        formTarjeta.classList.add("oculto");
        formTransferencia.classList.add("oculto");
        if (tipo === "credito") {
            tituloTarjeta.textContent =
                "Tarjeta de crédito";
            formTarjeta.classList.remove("oculto");
        }
        else if (tipo === "debito") {
            tituloTarjeta.textContent =
                "Tarjeta de débito";
            formTarjeta.classList.remove("oculto");
        }
        else {
            formTransferencia.classList.remove("oculto");
        }
    });
});
// Simular compra con tarjeta
/*formTarjeta.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Compra realizada con éxito!");
    formTarjeta.reset();
});*/
/* Simular compra por transferencia
const btnComprar1 = document.getElementById("btnComprar1");
const procesando1 = document.getElementById("procesando1");

btnComprar1.addEventListener("click", () => {
    procesando1.classList.remove("oculto");
    btnComprar1.disabled = true;
    setTimeout(() => {
        window.location.href = "compraRealizada.html";
    }, 3000);
    console.log("click funcionando");
});
const btnComprar2 = document.getElementById("btnComprar2");
const procesando2 = document.getElementById("procesando2");


btnComprar2.addEventListener("click", () => {
    procesando2.classList.remove("oculto");
    btnComprar2.disabled = true;
    setTimeout(() => {
        window.location.href = "compraRealizada.html";
    }, 3000);
}); console.log(btnComprar1);
console.log(procesando1);
*/
