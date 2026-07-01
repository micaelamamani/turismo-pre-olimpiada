document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const textoUsuario = document.getElementById("textoUsuario");
    const linkSesion = document.getElementById("iniciarSesion");
     const cerrarSesion = document.getElementById("cerrarSesion");
     
     if (usuario) {
        textoUsuario.textContent = usuario;
        cerrarSesion.style.display = "inline";
        cerrarSesion.addEventListener("click", () => {
            localStorage.removeItem("ID_cliente");
            localStorage.removeItem("usuario");
            localStorage.removeItem("esAdmin");
            window.location.href = "index.html";
        });
    }
});