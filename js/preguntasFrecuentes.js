/*archivo preguntasFrecuentes.js*/
// preguntas-frecuentes.js

// Datos de preguntas frecuentes
const preguntasFaq = [
    // ===== RESERVAS =====
    {
        id: 1,
        categoria: "reservas",
        pregunta: "¿Cómo puedo hacer una reserva en TripBuy?",
        respuesta: "Puedes hacer una reserva de dos formas: <br><br> 1. <strong>Desde la página del producto</strong>: Selecciona el paquete que te interesa, elige las fechas, cantidad de pasajeros y haz clic en 'Comprar' o 'Añadir al carrito'. <br><br> 2. <strong>Desde el carrito</strong>: Añade los productos que desees y luego procede al pago."
    },
    {
        id: 2,
        categoria: "reservas",
        pregunta: "¿Necesito crear una cuenta para reservar en TripBuy?",
        respuesta: "Sí, es necesario crear una cuenta para poder realizar reservas. Esto nos permite gestionar tus pedidos, enviarte confirmaciones y mantener un historial de tus viajes. Puedes registrarte de forma gratuita en nuestra página de inicio de sesión."
    },
    {
        id: 3,
        categoria: "reservas",
        pregunta: "¿Puedo modificar mi reserva después de confirmarla?",
        respuesta: "No. Debido a nuestras políticas de seguridad, una vez realizada la reserva no puede ser modificada. Si lo deseas, puedes cancelarla y solicitar tu reenvolso via e-mail"
    },
    {
        id: 4,
        categoria: "reservas",
        pregunta: "¿Cómo veo mis reservas actuales en TripBuy?",
        respuesta: "Puedes ver todas tus reservas en la sección 'Mis reservas' del menú principal. Allí encontrarás un listado completo con todos tus viajes programados, su estado y los detalles de cada uno."
    },

    // ===== PAGOS =====
    {
        id: 5,
        categoria: "pagos",
        pregunta: "¿Qué métodos de pago aceptan en TripBuy?",
        respuesta: "Aceptamos los siguientes métodos de pago: <br><br> • <strong>Tarjetas de crédito</strong>: Visa, Mastercard, American Express<br> • <strong>Tarjetas de débito</strong>: Visa Débito, Maestro<br> • <strong>Transferencia bancaria</strong>: Depósito o transferencia a nuestra cuenta<br> • <strong>Efectivo</strong>: En nuestras sucursales"
    },
    {
        id: 6,
        categoria: "pagos",
        pregunta: "¿Es seguro pagar con tarjeta en TripBuy?",
        respuesta: "Sí, completamente. Nuestro sitio utiliza tecnología de encriptación SSL para proteger todos tus datos. No almacenamos información de tarjetas en nuestros servidores y cumplimos con los más altos estándares de seguridad en transacciones online."
    },
    {
        id: 7,
        categoria: "pagos",
        pregunta: "¿Puedo pagar en cuotas sin interés en TripBuy?",
        respuesta: "Sí, ofrecemos financiación en cuotas sin interés con tarjetas de crédito seleccionadas. Las promociones varían según el banco emisor y el monto de la compra. Puedes ver las opciones disponibles durante el proceso de pago."
    },
    {
        id: 8,
        categoria: "pagos",
        pregunta: "¿Qué incluye el precio total de un paquete de TripBuy?",
        respuesta: "El precio total incluye: <br><br> • Transporte (vuelos/traslados)<br> • Hospedaje en hoteles seleccionados<br> • Excursiones y actividades programadas<br> • Impuestos y tasas <br><br> Los servicios adicionales como comidas especiales o seguros de viaje pueden contratarse por separado."
    },

    // ===== VIAJES =====
    {
        id: 9,
        categoria: "viajes",
        pregunta: "¿Necesito visa para viajar a los destinos ofrecidos por TripBuy?",
        respuesta: "Depende del destino y tu nacionalidad. Te recomendamos verificar con la embajada del país destino antes de viajar. Nosotros podemos asesorarte en el proceso."
    },
    {
        id: 10,
        categoria: "viajes",
        pregunta: "¿Cuál es la política de equipaje en TripBuy?",
        respuesta: "Cada paquete incluye una franquicia de equipaje específica que varía según el destino y la aerolínea. Generalmente incluye: <br><br> • 1 equipaje de mano (hasta 8kg)<br> • 1 equipaje en bodega (hasta 23kg) <br><br> Los detalles exactos están especificados en la descripción de cada producto."
    },
    {
        id: 11,
        categoria: "viajes",
        pregunta: "¿Puedo elegir mi asiento en el avión con TripBuy?",
        respuesta: "Sí, al momento de la reserva puedes seleccionar tu asiento preferido sujeto a disponibilidad. También puedes hacerlo durante el check-in online. Si tienes preferencias especiales (ventanilla, pasillo, salida de emergencia), indícalo al momento de reservar."
    },
    {
        id: 12,
        categoria: "viajes",
        pregunta: "¿Qué pasa si mi vuelo se retrasa o cancela con TripBuy?",
        respuesta: "En caso de retrasos o cancelaciones, nuestro equipo te contactará inmediatamente para ofrecerte alternativas. Según la normativa vigente, podrás optar entre: <br><br> • Reembolso completo <br> • Reprogramación sin costo <br> • Paquete alternativo <br><br> Te mantendremos informado en todo momento."
    },

    // ===== SERVICIOS =====
    {
        id: 13,
        categoria: "servicios",
        pregunta: "¿Puedo personalizar mi paquete de viaje en TripBuy?",
        respuesta: "Lamentablemente, TripBuy aun no cuenta con la posibilidad de armar paquetes propios. Unicamente ofrecemos la opción de armar tu pedido propio con el carrito de compras"
    },
    {
        id: 14,
        categoria: "servicios",
        pregunta: "¿TripBuy ofrece seguro de viaje?",
        respuesta: "Sí, ofrecemos seguros de viaje con cobertura médica, cancelación y equipaje. Puedes contratarlo al momento de reservar. Recomendamos especialmente para viajes internacionales. Contactanos para consultar los diferentes planes disponibles."
    },
    {
        id: 15,
        categoria: "servicios",
        pregunta: "¿TripBuy tiene servicio de traslado desde el aeropuerto?",
        respuesta: "Sí, incluimos servicio de traslado desde/hacia el aeropuerto en la mayoría de nuestros paquetes. El servicio es privado con chofer de habla hispana. Si tu paquete no lo incluye, puedes contratarlo por separado."
    },
    {
        id: 16,
        categoria: "servicios",
        pregunta: "¿Qué tipo de hoteles ofrece TripBuy?",
        respuesta: "Trabajamos con hoteles de diferentes categorías: <br><br> • <strong>Económicos</strong>: 3 estrellas, básicos pero confortables <br> • <strong>Estándar</strong>: 4 estrellas, con servicios completos <br> • <strong>Premium</strong>: 5 estrellas, lujo y exclusividad <br><br> Puedes elegir según tu presupuesto y preferencias."
    },

    // ===== CANCELACIONES =====
    {
        id: 17,
        categoria: "cancelaciones",
        pregunta: "¿Cuál es la política de cancelación de TripBuy?",
        respuesta: "Nuestra política de cancelación es flexible: <br><br> • <strong>Hasta 15 días antes</strong>: Reembolso del 100% <br> • <strong>Entre 7 y 15 días</strong>: Reembolso del 50% <br> • <strong>Menos de 7 días</strong>: Sin reembolso <br><br> Las cancelaciones deben solicitarse por escrito a nuestro equipo de atención al cliente."
    },
    {
        id: 18,
        categoria: "cancelaciones",
        pregunta: "¿Puedo cancelar si hay una emergencia con TripBuy?",
        respuesta: "Sí, entendemos que pueden surgir emergencias. En casos debidamente justificados (problemas de salud, fallecimiento de un familiar, etc.), evaluamos cada situación de manera individual. Contactanos en caso de que se presente alguna situacion particular."
    },
    {
        id: 19,
        categoria: "cancelaciones",
        pregunta: "¿Cómo solicito el reembolso de mi reserva en TripBuy?",
        respuesta: "Para solicitar un reembolso: <br><br> 1. Ingresa a 'Mis reservas' <br> 2. Selecciona la reserva que deseas cancelar <br> 3. Haz clic en 'Cancelar reserva' <br> 4. Completa el formulario con el motivo <br><br> Nuestro equipo procesará tu solicitud en un plazo de 5 a 7 días hábiles."
    },
    {
        id: 20,
        categoria: "cancelaciones",
        pregunta: "¿TripBuy devuelve el dinero si el destino tiene problemas?",
        respuesta: "Si el destino presenta problemas graves (conflictos, desastres naturales, etc.) y las autoridades recomiendan no viajar, ofrecemos: <br><br> • Reembolso completo <br> • Reprogramación sin cargo <br> • Cambio de destino <br><br> La seguridad de nuestros clientes es nuestra prioridad."
    }
];

// Variables de estado
let preguntasFiltradas = [...preguntasFaq];
let categoriaActual = "todas";

// ===== INICIALIZAR =====
window.onload = () => {
    renderizarPreguntas(preguntasFiltradas);
    inicializarEventos();
};

// ===== RENDERIZAR PREGUNTAS =====
function renderizarPreguntas(preguntas) {
    const contenedor = document.getElementById("faqLista");
    
    if (preguntas.length === 0) {
        contenedor.innerHTML = `
            <div class="faq-sin-resultados">
                <i class="fa-regular fa-face-frown"></i>
                <h3>No encontramos resultados</h3>
                <p>Prueba con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = preguntas.map(p => `
        <div class="faq-item" data-categoria="${p.categoria}" data-id="${p.id}">
            <div class="faq-pregunta" onclick="togglePregunta(this)">
                <h3>${p.pregunta}</h3>
                <i class="fa-solid fa-chevron-down"></i>
            </div>
            <div class="faq-respuesta">
                <p>${p.respuesta}</p>
            </div>
        </div>
    `).join('');
}

// ===== TOGGLE PREGUNTA =====
function togglePregunta(elemento) {
    const item = elemento.closest('.faq-item');
    const estaAbierto = item.classList.contains('abierto');
    
    if (estaAbierto) {
        item.classList.remove('abierto');
    } else {
        item.classList.add('abierto');
    }
}

// ===== INICIALIZAR EVENTOS =====
function inicializarEventos() {
    // Categorías
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            categoriaActual = this.dataset.categoria;
            aplicarFiltros();
        });
    });

    // Buscador
    document.getElementById('buscadorFAQ').addEventListener('input', function() {
        aplicarFiltros();
    });
}

// ===== APLICAR FILTROS =====
function aplicarFiltros() {
    const busqueda = document.getElementById('buscadorFAQ').value.toLowerCase().trim();
    preguntasFiltradas = preguntasFaq.filter(p => {
        // Filtrar por categoría
        if (categoriaActual !== 'todas' && p.categoria !== categoriaActual) {
            return false;
        }
        
        // Filtrar por búsqueda
        if (busqueda) {
            const preguntaMatch = p.pregunta.toLowerCase().includes(busqueda);
            const respuestaMatch = p.respuesta.toLowerCase().includes(busqueda);
            if (!preguntaMatch && !respuestaMatch) {
                return false;
            }
        }
        
        return true;
    });
    
    renderizarPreguntas(preguntasFiltradas);
}

// ===== FUNCIÓN PARA EXPANDIR POR URL (opcional) =====
function expandirPregunta(id) {
    const item = document.querySelector(`.faq-item[data-id="${id}"]`);
    if (item) {
        item.classList.add('abierto');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Exportar funciones para usar en HTML
window.togglePregunta = togglePregunta;
window.expandirPregunta = expandirPregunta;