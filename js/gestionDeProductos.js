const contenedor =document.getElementById("contenedorProductos");
cargarProductos();

// Cargar todos los productos
async function cargarProductos() {
    try {
        const res = await fetch("http://localhost:3000/productos");
        const productos = await res.json();
        contenedor.innerHTML = "";
        productos.forEach(producto => crearCard(producto));
    }
    catch {
        contenedor.innerHTML = "<h2>Error cargando productos</h2>";
    }

}
// BUSCAR POR ID
async function buscarProducto() {
    const id = document.getElementById("txtId").value.trim();
    if (!id) {
        cargarProductos();
        return;
    }
    try {
        const res = await fetch(`http://localhost:3000/productos/${id}`);
        if (!res.ok) {
            contenedor.innerHTML = "<h2>Producto no encontrado</h2>";
            return;
        }
        const producto = await res.json();
        contenedor.innerHTML = "";
        crearCard(producto);
    }
    catch {
        contenedor.innerHTML = "<h2>Error buscando producto</h2>";
    }
}

// CREAR TARJETA
function crearCard(producto) {
    const card = document.createElement("div");
    card.className = "card";
    let fechas = "Sin fechas";
    
    if (producto.fechas &&producto.fechas.length) {
        fechas = producto.fechas.map(f => {
            const salida =formatear(f.fecha_salida);
                        const regreso =f.fecha_regreso
                                ?
                                " → " +
                                formatear(f.fecha_regreso)
                                :
                                "";
                        return `${salida}${regreso}(Cupo:${f.cupo})`;
                    }
                ).join("<br>");
    }
    card.innerHTML = `<img src="${producto.imagen}">
    <h2>${producto.nombre}</h2>
    <p>ID:${producto.ID_producto}</p>
    <p>Categoría:${producto.categoria}</p>
    <p>Tipo:${producto.destacado}</p>
    <p>Precio:$${Number(producto.precio_unitario).toLocaleString("es-AR")}</p>
    <div class="servicios">
    <h3>Fechas</h3>
     ${formatear(producto.fecha_salida)} ${formatear(producto.fecha_regreso)}</div>
    <div class="total">
    Cupo disponible:${producto.cupo
        ?? "-"
        }
        </div>
        <div class="botones">
        <button class="eliminar" onclick="eliminarProducto(${producto.ID_producto})">
        Eliminar</button>
        </div>
        `;
    contenedor.appendChild(card);
}
// ELIMINAR
async function eliminarProducto(id) {
    const confirmar =confirm("¿Eliminar producto?");
    if (!confirmar) return;
    try {
        const res =await fetch(`http://localhost:3000/productos/${id}`,
                {
                    method:"DELETE"
                }
            );

        const data =await res.json();
        alert(data.mensaje);
        cargarProductos();
    }
    catch {
        alert("Error eliminando");
    }
}
// REDIRECCIONAR
function agregarProducto() {
    window.location.href ="crearProducto.html";
}

// FORMATEAR FECHA
function formatear(fecha) {
    if (!fecha)
        return "";
    return new Date(fecha).toLocaleDateString("es-AR");
}