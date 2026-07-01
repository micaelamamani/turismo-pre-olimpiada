document.getElementById("registrarse").addEventListener("click",()=>{
    const nombre=document.getElementById("nombre").value.trim();
    const apellido=document.getElementById("apellido").value.trim();
    const usuario=document.getElementById("usuario").value.trim();
    const contraseña=document.getElementById("contraseña").value;
    const email=document.getElementById("email").value.trim();
    const mensajeError=document.getElementById("mensajeError");
    
    if(nombre=="" || apellido=="" || usuario=="" || contraseña=="" || email==""){
        mensajeError.textContent= "Por favor, complete todos los campos";
        return;
    }
    const datos={
        nombre: nombre,
        apellido: apellido,
        usuario: usuario,
        contraseña: contraseña,
        email: email
    };
    const url= "http://localhost:3000/clientes/registro";
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(datos)
    })
    .then(r=>r.json())
    .then(resultado=>{
        console.log(resultado);
        if(resultado.ID_cliente){
            localStorage.setItem("ID_cliente", resultado.ID_cliente);
            window.location.href="index.html"; console.log("se guardo");
        }
    })
    .catch(error=>{
        console.log(error);alert("Error al conectar");
    });

});
