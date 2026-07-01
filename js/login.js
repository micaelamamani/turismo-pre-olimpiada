document.getElementById("iniciarSesion").addEventListener("click", () => {

    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    //const email=document.getElementById("email").value;
    const mensajeError = document.getElementById("mensajeError");
    // Validar campos
    if (usuario == "" || contraseña == "" /*|| email== ""*/) {
        mensajeError.textContent = 'Complete todos los campos';
        return;
    }
    // Datos
    const datos = {
        usuario: usuario,
        contraseña: contraseña

    };
    // URL
    const url = "http://localhost:3000/clientes/login";
    // Petición
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            // Guardar sesión
            if (resultado.ID_cliente) {

                localStorage.setItem(
                    "ID_cliente",
                    resultado.ID_cliente
                );

                localStorage.setItem(
                    "esAdmin",
                    resultado.esAdmin
                );
                localStorage.setItem(
                    "usuario",
                    resultado.usuario
                );
                if (resultado.esAdmin) {
                    window.location.href =
                        "../paginaAdmin/gestionDeProductos.html";
                }
                else {
                    window.location.href =
                        "index.html";
                }
            }
            else {
                mensajeError.textContent =
                    "Usuario o contraseña incorrectos";
            }
            // Mostrar mensaje
            // redigir a productos o pagina inicial
        }
        )

        .catch(error => {
            console.log(error);
            alert("Error al conectar");
        });
});