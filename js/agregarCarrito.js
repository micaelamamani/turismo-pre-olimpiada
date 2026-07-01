function agregarAlCarritoProducto(producto, cantidad = 1, idDisponibilidad = null) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const item = {
        ID_producto: producto.ID_producto,
        nombre: producto.nombre,
        imagen: producto.imagen,
        cantidad: cantidad,
        precio_unitario:producto.precio_unitario,
        ID_disponibilidad: idDisponibilidad
    };
    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Agregado al carrito");
}