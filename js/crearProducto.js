function cargarImagen() {
    const url = document.getElementById("imagen").value.trim();
    const preview = document.getElementById("previewImagen");
    if (url == "") {
        alert("Ingresa una URL primero");
        return;
    }
    preview.src = url; //Se actualiza la imagen
    preview.onerror = function () {
        alert("No se pudo cargar la imagen");
        preview.src = "";
    };
}
async function crearProducto() {

    const producto = {
        nombre: document.getElementById("nombre").value,
        imagen: document.getElementById("imagen").value,
        precio_unitario: document.getElementById("precio").value,
        categoria: document.getElementById("categoria").value,
        destacado: document.getElementById("destacado").value
    };

    const res = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    });
    const data = await res.json();
    if (!res.ok) {
        console.error(data);
        alert("Error creando producto");
        return;
    }else{
        alert("Producto creado exitosamente")
    }
    const idProducto = data.ID_producto;
    await guardarDisponibilidades(idProducto);
}
async function guardarDisponibilidades(idProducto) {
    const items = document.querySelectorAll(".fecha-item");
    const cupoGlobal = document.getElementById("cupo").value;
    for (let item of items) {
        const fecha_salida = item.querySelector(".salida").value;
        const fecha_regreso = item.querySelector(".regreso").value || null;
        if (!fecha_salida) continue; // continua si fecha esta vacío
        const disponibilidad = {
            ID_producto: idProducto,
            fecha_salida,
            fecha_regreso,
            estado: "disponible",
            cupo: cupoGlobal
        };
        const res = await fetch("http://localhost:3000/disponibilidad_productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(disponibilidad)
        });

        if (!res.ok) {
            console.error(await res.json());
        }
    }
}
function agregarFecha() {
    const contenedor =document.getElementById("contenedor-fechas");
    const div =document.createElement("div");

    div.className ="fecha-item grupo-fechas";

    div.innerHTML = `<input class="salida" type="date" required>
    <input class="regreso" type="date">
    <button type="button" class="btn-eliminar" onclick="this.parentElement.remove()">
    <i class="fa-solid fa-xmark"></i> 
    </button>`;
    contenedor.appendChild(div);
}
window.agregarFecha = agregarFecha;
window.crearProducto = crearProducto;
window.cargarImagen = cargarImagen;