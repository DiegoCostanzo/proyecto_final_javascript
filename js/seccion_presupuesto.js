/*Codigo icono carrito - (Codigo igual que seccion_e_commerce pero se extrae el icono para suprimir producto)*/
const carrito = document.querySelector("#carrito-compras"); //div que contiene el carrito
const contenidoCarrito = document.querySelector("#productos-carrito tbody"); //cuerpo del carrito
const listaCarrito = document.querySelector("#lista-productos"); //div que tiene las cards de todos los productos
const contenidoIconoCarrito = document.querySelector("#productos-icono-carrito");
let itemsCarrito = [];
let precioFinal = 0;             //Variable que tiene el precio total de los productos agregados al carrito 
let cantidadCarrito = 0;         //variable que tiene el numero de productos en total agregados al carrito

listaCarrito.addEventListener("click",agregaralcarrito); //Para escuchar click en los botones agregar
document.addEventListener("DOMContentLoaded",()=>{       //Este listener es para agregar al carrito lo contenido en el storage. Se usa el listener DOMContentLoaded(Cuando se carga la pagina, se activa el listener)
    itemsCarrito = JSON.parse(localStorage.getItem("carrito"))||[] ; //Se guarda en el carrito el contenido del local storage
    cantidadCarrito= JSON.parse(localStorage.getItem("cantidad")) ; //Se guarda en la variable cantidad contenido del local storage
    agregarProductoHTML(); //Insertamos en el carrito ñp almacenado en el localStorage
});            
function agregaralcarrito(evento){
    if(evento.target.classList.contains("agregar-al-carrito")) //Ingresa en el caso de que se haga click en el boton agregar
    {  
        const productoElegido = evento.target.parentElement.parentElement.parentElement.parentElement //Me posiciono en el padre de las card de los productos para extraer las caracteristicas de los mismos.
        extrerDatosProducto(productoElegido);                                                         //Con esta funcion se obtienen todos los datos del producto
    };
}
function extrerDatosProducto(producto){
    const informacionProducto = {                                       //Armo un objeto con la información del producto agregado
        imagen: producto.querySelector("img").src,                      //Aplico querySelector sobre productoElegido y extraigo la información (en esta caso la imagen)
        nombre: producto.querySelector("h5").textContent,
        precio: producto.querySelector("h4").textContent,
        id: producto.querySelector("button").getAttribute("data-id"),
        cantidad: 1,       
    }
    /////////////////////////////////////////////////////////
    /* Con este tramo de código compruebo si hay algun producto
    en el carrito que sea igual al que voy a agregar. En caso de que si
    aumenta el atrinuyo cantidad. En caso de que no, agrega el nuevo 
    producto al carrito*/
    const productoExistente = itemsCarrito.some((producto)=>{  //comprueba si algun elemento de itemsCarrito cumple la condicion dentro
        return producto.id === informacionProducto.id   //comprueba si hay un producto anterior que cumple con las mismas caracteristicas del producto actual
    })
    if(productoExistente){          //Ingresa en caso de que existe un producto igual al seleccionado actualmente 
        const productos = itemsCarrito.map((producto) =>{    //recorre el arreglo itemsCarrito, y agrega todos los productos que cumplan la condicion en su interior a un arreglo nuevo. Se genera un arreglo nuevo llamado productos
            if(producto.id === informacionProducto.id){      //Si se cumple que hay un producto en el carrito igual al que voy a agregar en el carrito, ingresa al if.
                producto.cantidad++;                         //Aumento la cantidad en 1 de ese producto
                return producto;
            }
            else{                                            //En caso de que no existe, se devuelve el producto actual
                return producto;
            }
        });
        itemsCarrito = [...productos];                       //agrega el producto al carrito 
        cantidadCarrito++;                  
    }
    else{                                                       //Ingresa en caso de que el producto a agregar no esta previamente en el carrito
        itemsCarrito = [...itemsCarrito,informacionProducto];    //agregar productos al carrito
        cantidadCarrito++;
    }
    //////////////////////////////////////////////////////////
    agregarProductoHTML();                                       //Funcion para agregar producto al HTML        
}
function agregarProductoHTML(){
    limpiarCarritoHtml();                      //Con esta función limpio el carrito, asi cada vez que agrego un producto no se agrega el carrito completo repitiendo productos   
    ////////////////////////////////////////////////////
    //Con este trozo de código agrego el numero de productos al icono del carrito, utilizando la variable cantidadCarrito
    const iconoCarrito = document.createElement("span");  
    iconoCarrito.innerHTML = `${cantidadCarrito}` ;
    contenidoIconoCarrito.appendChild(iconoCarrito);
    iconoCarrito.setAttribute("class","color-numero circulo-carrito");   
    ////////////////////////////////////////////////////
itemsCarrito.forEach( (producto) => {        //Recorrer cada elemento del arreglo items carrito, y extraigo la información para colocarla en el HTML        
    //Aqui se extrae la información de cada producto de itemsCarrito para colocarlo en el HTML    
    const imagenExtraida = producto.imagen;
    const nombreExtraido = producto.nombre;
    const precioExtraido = producto.precio;
    const cantidadExtraida = producto.cantidad;
    const idExtraido = producto.id;
    //Se manipula el DOM para colocar cada uno de los productos seleccionados en el carrito
    const fila = document.createElement("tr");  //Creo el elemento tr para colocar los productos (El tr crea una fila en el HTML)
    //Coloco toda la información del producto dentro del tr(fila) en el html
    fila.innerHTML = `                          
    <td><img src = "${imagenExtraida}" class = "imagen-carrito" ></td>
    <td class="texto-carrito tamaño-texto">${nombreExtraido}</td>
    <td class="texto-carrito">${precioExtraido}</td>
    <td class="texto-carrito">${cantidadExtraida}</td>
    `
    //Con el metodo appenchild inserto toda la fila con info del producto creada a la tabla en el HTML
    contenidoCarrito.appendChild(fila);
    fila.setAttribute("class","fila-carrito"); //Creo una clase y la agrego a la fila tr
})
    almacenarCarritoStorage();       //Almacenar Carrito en el storege, para recuperar todo lo agregado al carrito en caso de que se cierre la pagina.    
} 
function limpiarCarritoHtml(){
    contenidoIconoCarrito.innerHTML ="";
    contenidoCarrito.innerHTML = "";  //limpio el contenido del carrito, borrando el HTML  
} 
function almacenarCarritoStorage(){    //Almacenamos lo agregado al carrito en el storege
    localStorage.setItem("carrito",JSON.stringify(itemsCarrito)); //Almaceno en el local storage el itemsCarrito, previamente convierto en JSON la variable itemsCarrito.
    localStorage.setItem("cantidad",JSON.stringify(cantidadCarrito));
}

/* +++++++++++++++++ (Jquery - Presupuesto)(Codigo agregado para armar presupuesto) +++++++++++++++++++++++++*/
/* Aca se usa el sweet alert para consultar si se quiere realizar el presupuesto */
Swal.fire({
    html:'<p class="texto-alert">¿Desea realizar el presupuesto?</p>',
    icon:'question',
    showDenyButton: true,
    showCancelButton: false,
    width:'35%',
    confirmButtonColor:'rgb(180, 180, 180)',
    denyButtonColor:'rgb(180, 180, 180)',
    allowOutsideClick:false,
    allowEscapeKey:false,
    allowEnterKey:false,
    confirmButtonText: `<p class="estilo-boton-alert">Si</p>`,
    denyButtonText: `<p class="estilo-boton-alert">No`,
    background:'#F2F2F2',
  }).then((result) => {
    if (result.isConfirmed) {       /* En caso de aceptar el presupuesto, se realiza el mismo*/
        /* Se inserta en el ID presupuesto, el html del presupuesto */
        $("#presupuesto").append(`
        <div class=" container-fluid">
            <div class="container pt-4 pb-4">
                    <h4 class="titulo-tabla">Carrito de productos</h4>
                            <table id="productos-presupuesto" class="table  table-striped">
                                <thead>
                                    <tr class="titulo-tabla">
                                        <th scope="col">Producto</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio</th>
                                    </tr>
                                </thead>
                            <tbody class="lista-carrito-presupuesto">
                    
                    
                    
                            </tbody>
                            </table>
                <div class="total-presupuesto">
                </div>
                <div>
                    <button id ="volver-e-commerce" class="boton btn btn-sm btn-outline-secondary">Volver al e-commerce</button>
                    <button id ="Aceptar-presupuesto" class="boton btn btn-sm btn-outline-secondary">Aceptar presupuesto</button>
                </div>           
            </div>        
        </div>
                  `);       
        /* Se calcula el precio final */
        for(let i=0;i<itemsCarrito.length;i++){
            let precioNumero = itemsCarrito[i].precio.slice(1);
            let precioNumeroParceado = Number(precioNumero);
            let precioParcial = itemsCarrito[i].cantidad*precioNumeroParceado;
            precioFinal = precioParcial + precioFinal;   
        /* Se arman las filas de la tabla */  
        $( ".lista-carrito-presupuesto" ).append( `<tr><td><center><img src = "${itemsCarrito[i].imagen}" class = "img-fluid imagen-carrito clase-imagen-presupuesto" ></center></td><td class="clase-productos-presupuesto align-middle">${itemsCarrito[i].nombre}</td><td class="clase-productos-presupuesto align-middle">${itemsCarrito[i].cantidad}</td><td class="clase-productos-presupuesto align-middle">$${precioParcial}</td></tr>`);
        }
        /* Se inserta el total a pagar */
        $(".total-presupuesto").append(`<p class = "estilo-total-pagar">Total a pagar: <strong class="estilo-precio">$${precioFinal}</strong></p>`);
        /* En caso de presionar el botón volver al e-commerce, se vuelve al e-commerce */
        $("#volver-e-commerce").click( function() {  
            window.location="../index.html";
        })
        /* En caso de presionar el botón aceptar presupuesto, se envia a la seccion de pago */
        $("#Aceptar-presupuesto").click( function() {  
            window.location="presupuesto_login.html";
        })
    } else if (result.isDenied) {     /* En caso que no se acepta el presupuesto, se envia a la pagina de E-commerce */ 
            window.location="../index.html";
    }
  })