/*let cantidad = 0;
let detalle = 0;
let precio = 0;

parseFloat(cantidad);
parseFloat(precio);

function productos (cantidad, detalle, precio) {
    this.cantidad = cantidad;
    this.detalle = detalle;
    this.precio = precio;
}

const prod1 = new productos (cantidad, detalle, precio);

const ventas = [prod1];

for (let i = 0; i < ventas.length; i ++){

    let cantidad = prompt ("Ingresá la cantidad vendida");
    let detalle = prompt ("Ingresá el nombre del producto");
    let precio = prompt ("Ingresá el precio del producto que figura en el catálogo");

    parseFloat (cantidad);
    parseFloat (precio);

    function calcularComision (precio) {
    return (precio * cantidad) * 0.3 
    }
    
    let comisionVenta = calcularComision (precio)
    alert ("Tu ganancia es: " + comisionVenta)
    
    function comisionNatura (precio) {
    return (precio * cantidad) - (comisionVenta)
    }
    
    let pagoNatura = comisionNatura (precio)
    alert ("Debes pagarle a Natura Cosmeticos: " + pagoNatura);
}

console.log (ventas);*/

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
function productos(cantidad, codigo, producto, precio) {
  this.cantidad = cantidad;
  this.codigo = codigo;
  this.producto = producto;
  this.precio = precio;
}

//Funciones comisiones
function comision (precio) {
    return (precio * cantidad) * 0.3 
}

function pago (precio) {
    return (precio * cantidad) - (comision)
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
    <td><button class="btn btn-danger" id="${item.codigo}">Borrar</button></td>
    </tr>`;
    tbody.innerHTML += html;
  }
}


/* Agregar eventos a los botones */
 const arrayBotones = document.querySelectorAll("td .btn");
  arrayBotones.forEach((btn)=>{
    btn.addEventListener('click',()=>{
      ventas = ventas.filter((el) => el.codigo != btn.id);
      console.log(ventas);

      guardarLS(ventas);
      crearHtml(ventas);
    })
  })

crearHtml(ventas);

//Listeners
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoProd = new productos(
    cantidad.value,
    codigo.value,
    producto.value,
    precio.value,
    comision.value,
    pago.value
  );

  console.log(nuevoProd);
  cargarVentas(ventas, nuevoProd);
  guardarLS(ventas);
  crearHtml(ventas);
  formulario.reset();
});
