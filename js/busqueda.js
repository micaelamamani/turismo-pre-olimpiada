document.getElementById("buscador")
    .addEventListener("submit", (e) => {

        e.preventDefault();

        const destino =
            document.getElementById("destino")
                .value.trim();

        const fecha =
            document.getElementById("fecha")
                .value;

        const params =
            new URLSearchParams();

        if (destino) {
            params.append(
                "destino",
                destino
            );
        }

        if (fecha) {
            params.append(
                "fecha",
                fecha
            );
        }
        window.location.href =
            `resultados.html?${params}`;
    });