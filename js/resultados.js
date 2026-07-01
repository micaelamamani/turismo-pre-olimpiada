async function cargarProductos() {
    const params = new URLSearchParams(window.location.search);
    const destino = params.get("destino")?.toLowerCase() || "";
    const fecha = params.get("fecha");

    const res = await fetch("http://localhost:3000/productos?categoria=paquete");
    let productos = await res.json();

    if (destino) {
        productos = productos.filter(p =>
            p.nombre.toLowerCase().includes(destino)
        );
    }

    mostrarProductos(productos);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("contenedorProductos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<h2>No encontramos viajes 😔</h2>";
        return;
    }

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

                <button
                class="btn-comprar"
                onclick="comprarDirecto(${p.ID_producto})">
                Comprar
                </button>

                <button onclick="agregarAlCarritoProducto(${p.ID_producto})">
                Añadir al carrito</button>
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

function agregarAlCarritoProducto(id) {
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

cargarProductos();