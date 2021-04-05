var vp = document.getElementById('canvas');
var areaDibujo = vp.getContext('2d');
var hoy = new Date(Date.now());
var imagen = new Image();
var fullMoon = new Date("2018", "00", "02", "03", "00");
var cicloLunar = 2551442900;   // Ajustado a 29D 12h 44min Periodo orbital sidónico [ms]
//var cicloLunar = 2551382900; // Ajustado a 29D 12h 43min porque me equivoque [ms]
var convertaDias = 86400000;
var convertaImagen = 26857294;
var dia = hoy.getDate();
var mes = hoy.getMonth()+1;
var agno = hoy.getFullYear();
var toqueMem = [];
var imagenInicial;
var imagenFinal;
var numImage=0;

fijarhoy();
document.getElementById('selector').addEventListener('change',excecutar);
document.addEventListener('touchmove',toque);

function toque(evento){
  var desplazamiento;
  var indice;

  toqueMem.push(evento.touches[0].screenX);
  indice = toqueMem.length;

  if (toqueMem.length > 1) {
    desplazamiento = toqueMem[indice-1]-toqueMem[indice-2]
    //console.log(desplazamiento);
  }

  if (desplazamiento > 0) {
    restarDia();
  }else if (desplazamiento < 0 ) {
    sumarDia();
  }

}

function excecutar(){
hoy = new Date(document.getElementById('selector').value)
hoy = new Date(hoy.getTime() + convertaDias);
console.log(hoy);
extraer();
fijarDia();
}

 function fijarhoy() {
    hoy = new Date(Date.now());
    //Set date on Selector
    extraer();
    // Draw the image of today
    fijarDia();
    // imagen.addEventListener('load',dibuja);
 }

function extraer() {
  var chain
  dia = hoy.getDate();
  mes = hoy.getMonth()+1;
  agno = hoy.getFullYear();
 chain = agno + "-";
  if (mes < 10) {
    chain = chain + '0' + mes;
  } else {
    chain = chain + mes;
  }
  if (dia < 10) {
    chain = chain + '-0' + dia;
  } else {
    chain = chain + '-' + dia;
  }
  //console.log("Día: ",chain)
  document.getElementById('selector').value = chain;
}

 function sumarDia(){
          hoy = new Date(hoy.getTime() + convertaDias)
          extraer();
          //
          fijarDia();
          imagen.addEventListener('load',dibuja);
     }

 function  restarDia(){
        hoy = new Date(hoy.getTime() - convertaDias)
        extraer();
        fijarDia();
      }

 function fijarDia() {
   let i = 0;
  //console.log("Fijando día...")
  imagenInicial != 0 ? imagenInicial = imagenFinal: imagenInicial = 1;
  // var fechaActual = new Date(agno+"-0"+mes+"-"+(dia+1));
    dias = (hoy - fullMoon) % cicloLunar

    imagenFinal = Math.round(dias / convertaImagen)
    
    if (numImage < 1 ) {
      numImage = 95;
    } else if (numImage > 95 ) {
      numImage = 1;
    }
    //console.log("inicial: ",imagenInicial)
    //console.log("imagen: ",numImage)
    //console.log("final: ",imagenFinal)
    


    do{

      if ( numImage < 10 ) {
        // imagen.src = 'moonHD480/00'+dia+'.png'
        imagen.src = 'moonHD480/000'+numImage+'.png';
      }
      else if( numImage > 9 ){
        // imagen.src = 'moonHD480/0'+dia+'.jpg'
        imagen.src = 'moonHD480/00'+numImage+'.png';
      }
      //console.log(numImage);
      
      setTimeout(imagen.addEventListener('load',dibuja),1000);
      // console.log(imagen.src);
    
      //console.log("Dia fijado")

      numImage<imagenFinal? numImage++:numImage--

    }while(numImage != imagenFinal);
  
 }
    //for (numImage = imagenInicial; numImage <= imagenFinal; numImage++){
    
function dibuja(){
  //console.log("Animando ...");
    //requestAnimationFrame(dibuja)
    areaDibujo.clearRect(0,0,vp.width,vp.height);
    areaDibujo.drawImage(imagen, 0, 0);
}