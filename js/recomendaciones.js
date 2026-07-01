window.onload = async () => {
    try{
    const res=await fetch("http://localhost:3000/productos");
    const productos =await res.json();
    const recomendado = productos.filter(p => p.destacado === "recomendado");
    mostrarTarjetas(recomendado,"contenedorRecomendado");
    } catch (err) {
        console.error("Error cargando productos:", err);
    }
};

function mostrarTarjetas(productos, idContenedor) {

    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = "";
    productos.forEach(p => {
        const imagen = p.imagen || "img/default.png";
        const fechas = p.fecha_regreso ? `
                <p>Fecha salida:${formatearFecha(p.fecha_salida)}</p>
                <p>Fecha regreso:${formatearFecha(p.fecha_regreso)}</p>`
            :
            `<p>Fecha salida:${formatearFecha(p.fecha_salida)}</p>`;

        const incluye = p.categoria === "paquete"
            ?
            `<div class="incluye">
                <p>✔ Vuelo</p>
                <p>✔ Hospedaje</p>
                <p>✔ Transporte</p>
                <p>✔ Excursiones y actividades</p>
            </div>
            `: "";
        const estado = p.estado === "agotado"
            ?
            `<span class="agotado">Agotado
            </span>`
            :
            `<span class="disponible">
                Disponible
            </span>`;

        contenedor.innerHTML += `
        <div class="card grande">
            <img src="${imagen}">
            <h3>${p.nombre}</h3>
            ${fechas}
            ${incluye}
            <div class="estado">
                ${estado}
            </div>
            <div class="precio">
                por persona
                $${p.precio_unitario}
            </div>

            <div class="acciones">
                <a class="ver-paquete" href="verDetalleProducto.html?id=${p.ID_producto}">
                Ver paquete</a>
            </div>

        </div>
        `;

    });
}

function formatearFecha(fecha) {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-AR");
}
function comprarDirecto(idProducto) {
    window.location.href = `verDetalleProducto.html?id=${idProducto}`;
}
function agregarAlCarritoProductoFromIndex(id) {
    fetch(`http://localhost:3000/productos/${id}`)
        .then(res => res.json())
        .then(producto => {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            carrito.push({
                ID_producto: producto.ID_producto,
                nombre: producto.nombre,
                imagen: producto.imagen,
                cantidad: 1,
                precio: producto.precio_unitario,
                ID_disponibilidad: null
            });
            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Agregado al carrito");
        });
}
function formatearFecha(fecha) {
    if (!fecha)
        return "";
    return new Date(fecha).toLocaleDateString("es-AR");

}
function comprarDirecto(id) {
    window.location.href =
        `verDetalleProducto.html?id=${id}`;
}