const btnComentar = document.getElementById("btnComentar");

btnComentar.addEventListener("click", () => {

    const nombre =
        document.getElementById("nombreUsuario").value;

    const comentario =
        document.getElementById("textoComentario").value;

    const estrellas =
        document.getElementById("valoracion").value;

    if(nombre === "" || comentario === ""){
        alert("Completá todos los campos");
        return;
    }

    const nuevoComentario = document.createElement("div");

    nuevoComentario.classList.add("comentario");

    nuevoComentario.innerHTML = `
        <strong>@${nombre}</strong>
        <p>${comentario}</p>
        <div class="estrellas">${estrellas}</div>
    `;

    document
        .querySelector(".contenedor-comentarios")
        .prepend(nuevoComentario);

    document.getElementById("nombreUsuario").value = "";
    document.getElementById("textoComentario").value = "";
    document.getElementById("valoracion").value = "★★★★★";

});