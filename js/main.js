const cantidad = document.querySelector("#cantidad"),
  codigo = document.querySelector("#codigo"),
  producto = document.querySelector("#producto"),
  precio = document.querySelector("#precio"),
  tbody = document.querySelector("#table-body"),
  formulario = document.querySelector("#formulario");

const ventas = [];

parseFloat(cantidad);
parseFloat(precio);

//Constructor del objeto
class productos {
  constructor(cantidad, codigo, producto, precio) {
    this.cantidad = cantidad;
    this.codigo = codigo;
    this.producto = producto;
    this.precio = precio;
  }
  calcularComision() {
    this.comision = this.precio * this.cantidad * 0.3;
  }
  calcularPago() {
    this.pago = this.precio * this.cantidad - this.comision;
  }
}

//Funcion cargar a ventas
function cargarVentas(arr, productos) {
  arr.push(productos);
}

//Funciones de LS
function guardarLS(arr) {
  localStorage.setItem("ventas", JSON.stringify(arr));
}

//DOM
function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    html = `<tr>
    <td>${item.cantidad}</td>
    <td>${item.codigo}</td>
    <td>${item.producto}</td>
    <td>${item.precio}</td>
    <td>${item.comision}</td>
    <td>${item.pago}</td>
    <td><button class="btn btn-danger" id="button-${item.codigo}"> Borrar </button></td>
    </tr>`;
    tbody.innerHTML += html;
    const btn = document.getElementById(`button-${item.codigo}`);
    btn.addEventListener("click", () => {
      eliminar(item.codigo);
    })
  }
}

function eliminar(codigo) {
  const producto = ventas.find((producto) => producto.codigo === codigo);
  ventas.splice(ventas.indexOf(producto), 1);
  console.log(ventas);

  guardarLS(ventas);
  crearHtml(ventas);
}

crearHtml(ventas);

//Listeners
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoProd = new productos(
    cantidad.value,
    codigo.value,
    producto.value,
    precio.value
  );

  nuevoProd.calcularComision();
  nuevoProd.calcularPago();

  console.log(nuevoProd);
  cargarVentas(ventas, nuevoProd);
  guardarLS(ventas);
  crearHtml(ventas);

  document.getElementById("formulario").reset();
});

// Libreria
btnVenta.addEventListener('click', ()=>{
  Toastify({
    text: "Producto agregado a la lista",
    duration: 1500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #ED1A3B, #9E1462)"
    },
    offset: {
      y: 20
    },
    onClick: function(){}
  }).showToast();
})

fetch("./data/data.json")
.then ((response) => response.json())
.then((data) =>{
  crearHtml(data);
})