const nombreUsuario = document.querySelector(".texto");     //etiqueta donde esta el nombre de usuario
const apellidoUsuario = document.querySelector(".apellido");//etiqueta donde esta el apellido usuario
const calleUsuario = document.querySelector(".calle"); //etiqueta donde esta la calle del usuario
const numeroUsuario = document.querySelector(".numero"); //etiqueta donde esta el numero de calle del usuario

/* Se escucha el evento keyup, y se almacena en una variable el nombre del usuario */
 nombreUsuario.addEventListener("keyup", function(e){
 nombre = e.target.value;
 localStorage.setItem('Nombre', nombre);    
})
/* Se escucha el evento keyup, y se almacena en una variable el apellido del usuario*/
apellidoUsuario.addEventListener("keyup", function(e){
  apellido = e.target.value;
  localStorage.setItem('Apellido', apellido);    
 })
/* Se escucha el evento keyup, y se almacena en una variable el domicilio del usuario*/
 calleUsuario.addEventListener("keyup", function(e){
  calle = e.target.value;
  localStorage.setItem('Calle', calle);    
 })
 /* Se escucha el evento keyup, y se almacena en una variable el numero de calle del usuario*/
 numeroUsuario.addEventListener("keyup", function(e){
   numero = e.target.value;
   localStorage.setItem('Numero', numero);    
  })
/* Cuando se presiona el primer botón siguiente del formulario, se escribe 
mensaje en ultima seccion del formulario con infromacion de nombre y apellido */
$( ".boton-siguiente-uno" ).one( "click", function(e) {
      if(e.target.classList.contains("boton-siguiente-uno")){
        let VariableNombre = localStorage.getItem('Nombre');
        let VariableApellido =  localStorage.getItem('Apellido');
        console.log(VariableApellido);
        const textoFinal = document.querySelector("#texto-final");
        const texto = document.createElement("div");
        texto.innerHTML = `<p class="ml-3">Hola <strong class="estilo-datos-form"> ${VariableNombre} ${VariableApellido}</strong> una vez que confirmes la compra, el pedido va a ser preparado 
        y será entregado a la brevedad.</p> `
        textoFinal.appendChild(texto);
      } 
});
/* Cuando se presiona el segundo botón siguiente del formulario, se escribe 
mensaje en ultima seccion del formulario con infromacion de calle y numero */
$( ".boton-siguiente-dos" ).one( "click", function(e) {
  if(e.target.classList.contains("boton-siguiente-dos")){
    let VariableCalle = localStorage.getItem('Calle');
    let VariableNumero =  localStorage.getItem('Numero');
    console.log(VariableCalle);
    console.log(VariableNumero);
    const textoFinal = document.querySelector("#texto-final");
    const texto = document.createElement("div");
    texto.innerHTML = `<p class="ml-3">El pedido será enviado a <strong class="estilo-datos-form">${VariableCalle} ${VariableNumero}</strong>.</p>`
    textoFinal.appendChild(texto);
  } 
});
/* Cuando se presiona el botón realizar compra, aparece un cartel de sweet alert */
$( ".comprar" ).click(function() {
  Swal.fire({
    html:'<p class="texto-alert">Su compra ha sido procesada con éxito</p>',
    icon:'success',
    showDenyButton: false,
    showCancelButton: false,
    width:'35%',
    confirmButtonColor:'rgb(180, 180, 180)',
    denyButtonColor:'rgb(180, 180, 180)',
    allowOutsideClick:false,
    allowEscapeKey:false,
    allowEnterKey:false,
    confirmButtonText: `<p class="estilo-boton-alert">Aceptar</p>`,
    denyButtonText: `<p class="estilo-boton-alert">No`,
    background:'#F2F2F2',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location="../index.html"    /*Cuando presiona la tecla aceptar, te envia a la seccion de e-commerce */
        
    } else if (result.isDenied) {                    
    }
  })
});

      