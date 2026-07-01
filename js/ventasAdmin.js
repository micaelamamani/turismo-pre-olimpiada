async function cargarVentas() {

    const fecha =
        document
            .getElementById(
                "mesBusqueda"
            )
            .value;

    if (!fecha) {
        return;
    }

    const mes =
        fecha
            .split("-")[1];

    const res =
        await fetch(
            `http://localhost:3000/pedidos/ventas/${mes}`
        );

    const datos =
        await res.json();

    const tabla =
        document.getElementById(
            "tablaVentas"
        );

    tabla.innerHTML = "";

    const categorias = [
        "paquete",
        "hotel",
        "vuelo",
        "auto",
        "excursion"
    ];

    categorias.forEach(cat => {

        const venta =
            datos.find(
                v =>
                    v.categoria ===
                    cat
            );

        const vendidos =
            venta
                ?
                venta.vendidos
                :
                0;

        const ganancias =
            venta
                ?
                Number(
                    venta.ganancias
                )
                :
                0;

        tabla.innerHTML += `

<tr>

<td>
${cat}
</td>

<td>
${vendidos}
</td>

<td>
$${ganancias
                .toLocaleString(
                    "es-AR"
                )}
</td>

</tr>

`;

    });

}