let modalText = document.getElementById("content-modal");

class Producto {
  constructor(num, nombre, precio, cantidad) {
    this.num = num;
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
				<h3>${producto.nombre}</h3>
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

let productosCargados = false; 

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
const agregarEventos = () => {
  if (!productosCargados) {
  // Botones de plantas
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  const btn4 = document.getElementById("btn4");
  btn1.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "1");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  btn2.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "2");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  btn3.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "3");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  btn4.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "4");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  // Botones de maceta
  const btn5 = document.getElementById("btn5");
  const btn6 = document.getElementById("btn6");
  const btn7 = document.getElementById("btn7");
  btn5.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "5");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  btn6.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "6");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  });
  btn7.addEventListener("click", () => {
    miNuevaCompra.agregarProducto(productos, "7");
    modalText.innerHTML = miNuevaCompra.descripcion();
    Toastify({
      text: "Producto añadido exitosamente",
      duration: 3000,
    }).showToast();
  }); 
  productosCargados = true;}
};


agregarEventos();
const carritoInstance = new Carrito();
carritoInstance.finalizarCompra();