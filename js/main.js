//Variables de los productos
let potus = {
    nombre: "Potus",
    precio: 2500,
};

let sansevieria = {
    nombre: "Sansevieria",
    precio: 3500,
};

let strelitzia = {
    nombre: "Strelitzia Nicola",
    precio: 5500,
};

let palodeagua = {
    nombre: "Palo de Agua",
    precio: 2500,
};


//Obtener botones
let botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

//Array carrito de compras
let carrito = [];

// Evento click para cada botón
botonesAgregarCarrito.forEach(function(boton) {
    boton.addEventListener('click', function() {
        let nombre = boton.dataset.nombre;
        let precio = Number(boton.dataset.precio);

        // Objeto para representar el producto
        let producto = {
            nombre: nombre,
            precio: precio,
        };

        // Agregar al carrito de compras
        carrito.push(producto);

        // Mostrar el carrito de compras actualizado
        console.log(carrito);
    });
});

//Formulario
let form = document.getElementById('contact-form');

// Envío del formulario y  evita el envío del formulario por defecto
form.addEventListener('submit', function(event) {
  event.preventDefault();

// Obtencion de los valores de los campos del formulario
  let nombre = document.getElementById('nombre-apellido').value;
  let telefono = document.getElementById('telefono').value;
  let email = document.getElementById('email').value;
  let comentarios = document.getElementById('comentarios').value;

// Guarda los valores en el LocalStorage
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('telefono', telefono);
  localStorage.setItem('email', email);
  localStorage.setItem('comentarios', comentarios);

// Cambiar esto por librerias, mensaje final del formulario
  alert('¡Formulario enviado con éxito!');
});