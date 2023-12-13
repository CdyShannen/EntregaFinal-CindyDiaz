//Formulario
let form = document.getElementById('contact-form');
// Envío del formulario y  evita el envío del formulario por defecto
form.addEventListener('submit'), function(event) {
event.preventDefault();}

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
function mostrarSweetAlert() {
    Swal.fire({
    title: '¡Su consulta ha sido enviada con exito!',
    icon: 'success',
    confirmButtonText: 'Aceptar'
    });
}