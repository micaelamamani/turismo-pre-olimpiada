async function buscarPedidos() {

    const id = document
        .getElementById("buscarCliente")
        .value
        .trim();

    if (!id) {
        alert("Ingresa un ID");
        return;
    }

    const pendientes =
        document.getElementById("pendientes");

    const entregados =
        document.getElementById("entregados");

    pendientes.innerHTML = "";
    entregados.innerHTML = "";

    // usa la ruta nueva
    const res =
        await fetch(
            `http://localhost:3000/pedidos/cliente/${id}`
        );

    const productos = await res.json();
    mostrarEstadoCuenta(productos);
    if (!productos.length) {

        pendientes.innerHTML =
            "<p>No hay pedidos</p>";

        return;
    }

    productos.forEach(p => {

        let fechas = "";

        if (p.fecha_salida) {

            fechas =
                p.fecha_regreso
                    ? `${formatear(p.fecha_salida)}
                    → 
                    ${formatear(p.fecha_regreso)}`
                    : formatear(p.fecha_salida);

        }

        // precio individual × pasajeros
        const subtotal =
            Number(p.precio) *
            Number(p.cantidad);

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "tarjeta";

        tarjeta.innerHTML = `

<h3>
${p.nombre}
</h3>

<div class="info">
Salida:
${fechas || "Sin fecha"}
</div>

<div class="info">
Pasajeros:
${p.cantidad}
</div>

<div class="info">
Categoría:
${p.categoria}
</div>

<div class="subtotal">
Precio por persona:
$${Number(p.precio)
                .toLocaleString("es-AR")}
</div>

<div class="precio">
Precio Total:
$${subtotal
                .toLocaleString("es-AR")}
</div>

${p.estado === "pendiente"
                ?

                `
<div class="botones">

<button
class="entregar"

onclick="
cambiarEstado(
${p.ID_pedido},
'entregado'
)
">

Entregar pedido

</button>

<button
class="cancelar"

onclick="
cambiarEstado(
${p.ID_pedido},
'cancelado'
)
">

Cancelar

</button>

</div>
`

                :

                ""

            }

`;

        if (
            p.estado ===
            "pendiente"
        ) {

            pendientes
                .appendChild(
                    tarjeta
                );

        }

        else if (
            p.estado ===
            "entregado"
        ) {

            entregados
                .appendChild(
                    tarjeta
                );

        }

    });

}

async function cambiarEstado(
    id,
    estado
) {

    await fetch(

        `http://localhost:3000/pedidos/${id}/estado`,

        {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify({
                    estado
                })

        }

    );

    buscarPedidos();

}

function formatear(
    fecha
) {

    if (!fecha)
        return "";

    return new Date(
        fecha
    ).toLocaleDateString(
        "es-AR"
    );

}
function mostrarEstadoCuenta(productos) {

    const info =
        document.getElementById(
            "infoCliente"
        );

    const tabla =
        document.getElementById(
            "historialPedidos"
        );

    tabla.innerHTML = "";

    if (!productos.length) {

        info.innerHTML = "";
        return;

    }

    const cliente =
        productos[0];

    info.innerHTML = `

<h3>

Cliente ID:
${cliente.ID_cliente}

</h3>

<p>

Usuario:
${cliente.usuario}

</p>

<p>

${cliente.nombre_cliente}
${cliente.apellido}

</p>

<p>

${cliente.email}

</p>

`;

    productos.forEach(p => {

        const fila =
            document.createElement(
                "tr"
            );

        const total =
            Number(
                p.precio
            )
            *
            Number(
                p.cantidad
            );

        fila.innerHTML = `

<td>

${formatear(
            p.fecha
        )}

</td>

<td>

${p.nombre}

</td>

<td>

$

${total.toLocaleString(
            "es-AR"
        )}

</td>

<td>

<span class="
estado
${p.estado}
">

${p.estado}

</span>

</td>

`;

        tabla.appendChild(
            fila
        );

    });

}