class Producto {
  constructor(num, nombre, precio, cantidad) {
    this.id = num;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

class ProductoController {
  constructor() {
    this.listadeproductos = [];
  }

  colocar(producto) {
    this.listadeproductos.push(producto);
  }

  cargarProductosJSON() {
    fetch("../js/api.json")
      .then((Response) => Response.json())
      .then((data) => {
        data.forEach((producto) => {
          this.colocar(
            new Producto(
              producto.num,
              producto.nombre,
              producto.precio,
              producto.cantidad
            )
          );
        });
        agregarEventos();
      })
      .catch((error) => {
        console.log("Los productos no pudieron ser cargados con éxito");
      });
  }
}

class NuevaCompra {
  constructor() {
    this.productos = [];
  }

  agregarProducto(productos, productoNum) {
    const productoExistente = this.productos.find(
      (producto) => producto.num === productoNum
    );
    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      const producto = productos.listadeproductos.find(
        (producto) => producto.num === productoNum
      );
      producto.cantidad = 1;
      this.productos.push(producto);
    }
    localStorage.setItem("productos", JSON.stringify(this.productos));
  }
 
  descripcion() {
    let html = `<div>`;
    let total = 0;
    this.productos.forEach((producto, index) => {
      html += `<div class='card'>
				<h3>${producto.nombre} ${producto.capacidad}</h3>
				<p>Precio: ${producto.precio}$</p>
				<button class="suma-resta" onclick="carritoInstance.sumar(${index})">+</button>
				<input type="number" class="input-cantidad" min="0" value="${producto.cantidad}" readonly>
				<button class="suma-resta" onclick="carritoInstance.restar(${index})">-</button>
			</div>`;
      total += producto.precio * producto.cantidad;
    });
    html += `<p>Total: ${total}$</p></div>`;
    return html;
  }
}

const productos = new ProductoController();
const miNuevaCompra = new NuevaCompra();

//Guardado en el local storage al reiniciar la pagina
const carritoData = localStorage.getItem("productos");
if (carritoData) {
  miNuevaCompra.productos = JSON.parse(carritoData);
  modalText.innerHTML = miNuevaCompra.descripcion();
}

productos.cargarProductosJSON();

class Carrito {
  sumar(index) {
    const producto = miNuevaCompra.productos[index];
    producto.cantidad += 1;
    modalText.innerHTML = miNuevaCompra.descripcion();
  }

  restar(index) {
    const producto = miNuevaCompra.productos[index];
    if (producto.cantidad > 0) {
      producto.cantidad -= 1;
      modalText.innerHTML = miNuevaCompra.descripcion();
    }
  }

  finalizarCompra() {
    let finalizar = document.getElementById("btn_fin");
    finalizar.addEventListener("click", function () {
      if (miNuevaCompra.productos.length > 0) {
        modalText.innerHTML = "";
        miNuevaCompra.productos = [];
        localStorage.setItem("productos", JSON.stringify(miNuevaCompra.productos));

        Toastify({
          text: "Compra realizada con éxito, ¡gracias por comprar con nosotros!",
          duration: 3000,
        }).showToast();
      } else {
        Toastify({
          text: "No hay productos en el carrito",
          duration: 3000,
        }).showToast();
      }
    });
  }
}

//Obtener botones
let botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

/*// Evento click para cada botón
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
});*/

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