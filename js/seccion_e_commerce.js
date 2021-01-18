const carrito = document.querySelector("#carrito-compras"); //div que contiene el carrito
const contenidoCarrito = document.querySelector("#productos-carrito tbody"); //cuerpo del carrito
const listaCarrito = document.querySelector("#lista-productos"); //div que tiene las cards de todos los productos
const vaciarCarrito = document.querySelector("#vaciar-carrito") //id del botón de vaciar carrito
const contenidoIconoCarrito = document.querySelector("#productos-icono-carrito");
const precioTotal = document.querySelector("#precio-total");//Selecciono el div donde voy a colocar el precio total en el carrito
let itemsCarrito = [];
let precioProductos=0;       //Variable para calculo de precio
let precioConvertido=0;      //Variable para calculo de precio
let precioParse=0;           //Variable para calculo de precio
let precioEliNumero=0;       //Variable para calculo de precio
let precioEliminado=0;       //Variable para calculo de precio
let precioEliParse =0;       //Variable para calculo de precio
let precioEliTotal = 0;      //Variable para calculo de precio
let precioSuma=0;            //Variable para calculo de precio 
let cantidadCarrito = 0;     //variable que tiene el numero de productos en total agregados al carrito

listaCarrito.addEventListener("click",agregaralcarrito); //Para escuchar click en los botones agregar
carrito.addEventListener("click",suprimirProducto)        //Para escuchar click en el boton eliminar producto,suprimir producto.
vaciarCarrito.addEventListener("click",vaciarcarrito);    //Funcion para vaciar el carrito de compras, presionando el botón vaciar carrito.
document.addEventListener("DOMContentLoaded",()=>{       //Este listener es para agregar al carrito lo contenido en el storage. Se usa el listener DOMContentLoaded(Cuando se carga la pagina, se activa el listener)
    itemsCarrito = JSON.parse(localStorage.getItem("carrito"))||[] ; //Se guarda en el carrito el contenido del local storage
    cantidadCarrito= JSON.parse(localStorage.getItem("cantidad")) ; //Se guarda en la variable cantidad contenido del local storage
    precioSuma = JSON.parse(localStorage.getItem("precio")) ;      //Se guarda en la variable precioSuma el contenido de precio del local storage 
    agregarProductoHTML(); //Insertamos en el carrito lo almacenado en el localStorage
    agregarPrecioHtml()   //Insertamos en el carrito los precios almacenado en el localStorage
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
    /*En este bloque se calcula la suma total de los precios 
    de productos agregados al carrito*/
    precioProductos = informacionProducto.precio;
    precioConvertido = precioProductos.slice(1);
    precioParse = Number(precioConvertido);
    precioSuma = precioSuma + precioParse
    //////////////////////////////////////////////////////////
    agregarProductoHTML();               //Funcion para agregar producto al HTML
    agregarPrecioHtml()                  //Funcion para agregar precioSuma al HTML  
    
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    //En este bloque de codigo uso el plugin notify.js de jQuery para mostrar las notificaciones
    $.notify.addStyle('happyblue', {
        html: `
        <div>   
            <p class="texto-notificaciones-titulo">Producto <strong><span class="notificacion-agregado">agregado</span></strong> al carrito:</p>
            <div class="flex-notificacion">
                <div class="mr-2">
                    <img class = "imagen-notificacion" src="${informacionProducto.imagen}">
                </div>
                <div class="flex-textos-producto">
                    <div>
                        <p class="texto-notificaciones">${informacionProducto.nombre}</p>
                    </div>
                    <div>
                        <p class="texto-notificaciones">$${precioParse}</p>
                    </div>
                </div>
            </div>
        </div>
                `,
        classes: {
          base: {
            "white-space": "nowrap",
            "background-color": "black",
            "padding-left": "10px",
            "padding-right": "20px",
            "padding-bottom": "10px",
            "border":"hidden 6px #000000",
            "-moz-border-radius-topleft":"5px",
            "-moz-border-radius-topright":"5px",
            "-moz-border-radius-bottomleft":"5px",
            "-moz-border-radius-bottomright":"6px",
            "-webkit-border-top-left-radius":"5px",
            "-webkit-border-top-right-radius":"5px",
            "-webkit-border-bottom-left-radius":"5px",
            "-webkit-border-bottom-right-radius":"6px",
            "border-top-left-radius":"5px",
            "border-top-right-radius":"5px",
            "border-bottom-left-radius":"5px",
            "border-bottom-right-radius":"6px",
          }
        }
      });
    $.notify('hello', {
        style: 'happyblue',
        position:"right bottom"
      });  
    //////////////////////////////////////////////////////////////
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
    <td class="texto-carrito"><button class="eliminar-producto boton btn btn-sm btn-outline-secondary" data-id="${idExtraido}">X</button></td>
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
    precioTotal.innerHTML="";
} 

function suprimirProducto(evento){     //Funcion para eleminar producto
    if(evento.target.classList.contains("eliminar-producto")){ //Con este if ingreso, en caso de que se haga click en la X para eliminar un producto
        const productoId = evento.target.getAttribute("data-id");   //Conservo el Id del producto en que se hizo click en la X para eliminar
        let productoEliminado = itemsCarrito.filter(producto => producto.id === productoId); //Me quedo con el producto con el id a eliminar
        itemsCarrito = itemsCarrito.filter(producto => producto.id !== productoId); //Copio todos los articulos a items carrito, menos el que quiero eliminar. Por lo que elimino el producto selecionado.                  
        //Con el metodo filter, armo un arreglo con todos los elementos que cumplen la condicion interna. 
        cantidadCarrito = cantidadCarrito - productoEliminado[0].cantidad;  //Con esta operación resto los productos eliminados de cantidad carrito
        //////////////////////////////////////////////////////////////////
        /* En este bloque resto el precio de productos eliminados al precio 
        total de productos agregados al carrito */
        precioEliminado = productoEliminado[0].precio;
        precioEliNumero = precioEliminado.slice(1);
        precioEliParse = Number(precioEliNumero);
        precioEliTotal = precioEliParse * productoEliminado[0].cantidad;
        precioSuma = precioSuma - precioEliTotal;
        //////////////////////////////////////////////////////////////////
        
        agregarProductoHTML(); //Agrego el arreglo nuevo sin el producto eliminado al HTML.
        agregarPrecioHtml()    //Agrego al html la resta del precio de productos suprimidos
        almacenarCarritoStorage();     //almacenar cuando elimino un producto en el Storage
        //////////////////////////////////////////////////////////////////
        //En este bloque de codigo uso el plugin notify.js de jQuery para mostrar las notificaciones
        $.notify.addStyle('happyblue', {
            html: `
            <div>   
                <p class="texto-notificaciones-titulo">Producto <strong><span class="notificacion-eliminado">eliminado</span></strong> del carrito:</p>
                <div class="flex-notificacion">
                    <div class="mr-2">
                        <img class = "imagen-notificacion" src="${productoEliminado[0].imagen}">
                    </div>
                    <div class="flex-textos-producto">
                        <div>
                            <p class="texto-notificaciones">${productoEliminado[0].nombre}</p>
                        </div>
                        <div>
                            <p class="texto-notificaciones">$${precioEliParse}</p>
                        </div>
                    </div>
                </div>
            </div>
                    `,
            classes: {
              base: {
                "white-space": "nowrap",
                "background-color": "black",
                "padding-left": "10px",
                "padding-right": "20px",
                "padding-bottom": "10px",
                "border":"hidden 6px #000000",
                "-moz-border-radius-topleft":"5px",
                "-moz-border-radius-topright":"5px",
                "-moz-border-radius-bottomleft":"5px",
                "-moz-border-radius-bottomright":"6px",
                "-webkit-border-top-left-radius":"5px",
                "-webkit-border-top-right-radius":"5px",
                "-webkit-border-bottom-left-radius":"5px",
                "-webkit-border-bottom-right-radius":"6px",
                "border-top-left-radius":"5px",
                "border-top-right-radius":"5px",
                "border-bottom-left-radius":"5px",
                "border-bottom-right-radius":"6px",
              }
            }
          });
        $.notify('hello', {
            style: 'happyblue',
            position:"right bottom"
          });  
          
        //////////////////////////////////////////////////////////////////
    }
    
    
}

function vaciarcarrito(){ //Con esta funcion borro todos los productos agregados al carrito. 
    limpiarCarritoHtml();   //Borro el HTML
    itemsCarrito = [];      //Borro todos los productos agregados al carrito
    cantidadCarrito =0;     //Borro la cantidad carrito
    precioSuma=0;           //Borro el total de precios de productos agregados al carrito
    almacenarCarritoStorage()     //almacenar cuando vacio en el storage cuando vacio el carrito  
}

function almacenarCarritoStorage(){    //Almacenamos lo agregado al carrito en el storege
    localStorage.setItem("carrito",JSON.stringify(itemsCarrito)); //Almaceno en el local storage el itemsCarrito, previamente convierto en JSON la variable itemsCarrito.
    localStorage.setItem("cantidad",JSON.stringify(cantidadCarrito));//Almaceno en el local storage la variable cantidadCarrito
    localStorage.setItem("precio",JSON.stringify(precioSuma));//Almaceno en el local storage la variable precioSuma
}

function agregarPrecioHtml(){ //Con esta funcion agrega al carrito el precio total de los productos agregados
///////////////////////////////////////////
const precioHtml = document.createElement("p");
precioHtml.innerHTML = `Total: <strong>$${precioSuma}</strong>`;
precioTotal.appendChild(precioHtml);
///////////////////////////////////////////
}