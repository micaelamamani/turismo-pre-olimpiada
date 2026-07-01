let producto = null;

window.onload = async () => {
    const params =new URLSearchParams( window.location.search);

    const id = params.get("id");

    const res =await fetch(`http://localhost:3000/productos/${id}`);

    producto = await res.json();
    console.log(producto);
    if (!producto || producto.error) {
        alert("Producto no encontrado");
        console.log("producto no encontrado");
        return;
    }
    document.getElementById("nombre").textContent = producto.nombre;
    const img =document.getElementById("imagenProducto");
    img.src =producto.imagen?.trim() || "img/default.png";
    img.onerror = () => {
        img.src ="img/default.png";
    };

    // precio
    document.getElementById("porPersona").textContent = "$" + Number(producto.precio_unitario).toLocaleString("es-AR");
    mostrarServicios();
    cargarFechas();
    calcularPrecio();
    document.getElementById("pasajeros").addEventListener("change",calcularPrecio);

};
function mostrarServicios() {
    const contenedor = document.getElementById("serviciosContainer");
    // si NO es paquete
    if (producto.categoria !== "paquete") {
        contenedor.innerHTML = "";
        return;
    }
    // si ES paquete
    contenedor.innerHTML = `<fieldset>
    <legend>Servicios incluidos</legend>
    <label><input type="checkbox" class="servicio" checked data-descuento="100000">Vuelo
    </label>
    <label><input type="checkbox" class="servicio" checked data-descuento="100000"> Hospedaje</label>
    <label><input type="checkbox" class="servicio" checked data-descuento="90000">Transporte</label>
    <label><input type="checkbox" class="servicio" checked data-descuento="40000">Excursiones</label>
    <label><input type="checkbox" class="servicio" checked data-descuento="20000">
    Actividades</label>
    </fieldset>`;
    document.querySelectorAll(".servicio")
        .forEach(s => {
            s.addEventListener("change", calcularPrecio);
        });
}
/*
function calcularPrecio() {
    let precioBase = Number(producto.precio_unitario);
    const pasajeros = Number(document.getElementById("pasajeros").value);
    let total = precioBase * pasajeros;

    document.querySelectorAll(".servicio").forEach(s => {
        if (!s.checked) {
            total -= Number(s.dataset.descuento);
        }
    });
    if (total < 0) total = 0;

    document.getElementById("total").textContent =
        "$" + total.toLocaleString("es-AR");

    return total;
}*/
function calcularPrecio() {
    let precioBase = Number(producto.precio_unitario);

    const pasajeros = Number(document.getElementById("pasajeros").value);

    // 1. calcular descuentos por persona
    let descuentoTotal = 0;

    document.querySelectorAll(".servicio").forEach(s => {
        if (!s.checked) {
            descuentoTotal += Number(s.dataset.descuento);
        }
    });

    // 2. precio final por persona
    let precioPorPersona = precioBase - descuentoTotal;

    if (precioPorPersona < 0) {
        precioPorPersona = 0;
    }

    // 3. multiplicar por pasajeros
    let total = precioPorPersona * pasajeros;

    document.getElementById("total").textContent =
        "$" + total.toLocaleString("es-AR");

    return total;
}
/*function cargarFechas() {

    const select = document.getElementById("fechaSeleccionada");
    select.innerHTML = "";
    producto.fechas.forEach(f => {
        let texto = "";
        if (f.fecha_regreso) {
            texto = `${formatearFecha(f.fecha_salida)} - ${formatearFecha(f.fecha_regreso)
                }`;
        }
        else {
            texto = formatearFecha(f.fecha_salida);
        }
        select.innerHTML += `<option value="${f.ID_disponibilidad}">${texto}</option>`;
    });
}*/
function cargarFechas() {

    const select = document.getElementById("fechaSeleccionada");
    select.innerHTML = "";

    if (!producto.fechas ||producto.fechas.length === 0) {
        select.innerHTML ="<option>No disponible</option>";
        return;
    }

    producto.fechas.forEach(f => {
        let texto =formatearFecha(f.fecha_salida );

        if (f.fecha_regreso) {
            texto += " - " + formatearFecha( f.fecha_regreso);
        }
        select.innerHTML += `<option value="${f.ID_disponibilidad}">${texto}</option>`;
    });

}
function formatearFecha(fecha) {
    if (!fecha)
        return "";
    return new Date(fecha).toLocaleDateString("es-AR");
}
document.getElementById("btnComprar").addEventListener("click", () => {
    const fechaSeleccionada = document.getElementById("fechaSeleccionada");
    const idDisponibilidad = fechaSeleccionada.value;

    const pasajeros = Number(document.getElementById("pasajeros").value);

    const servicios = Array.from(document.querySelectorAll(".servicio"))
        .map(s => ({
            nombre: s.parentElement.textContent.trim(),
            incluido: s.checked
        }));

    const totalNumerico = calcularPrecio();
    /*const item = {
        ID_producto: producto.ID_producto,
        nombre: producto.nombre,
        imagen: producto.imagen,
        cantidad: pasajeros,
        precio: totalNumerico,
        ID_disponibilidad: Number(idDisponibilidad)
    };*/
    const item = {
        ID_producto: producto.ID_producto,
        nombre: producto.nombre,
        imagen: producto.imagen,
        cantidad: pasajeros,
        precio_unitario: totalNumerico / pasajeros, //  clave
        ID_disponibilidad: Number(idDisponibilidad)
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(item);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // redirigir al checkout
    window.location.href = "carrito.html";
});
const btn = document.getElementById("agregarAlCarrito");
if (btn) {
    btn.addEventListener("click", () => {
        const pasajeros =Number(document.getElementById("pasajeros").value);
        const idDisponibilidad = Number(document.getElementById("fechaSeleccionada").value);

        agregarAlCarritoProducto(producto,pasajeros,idDisponibilidad);
       window.location.href ="carrito.html";
    });
}