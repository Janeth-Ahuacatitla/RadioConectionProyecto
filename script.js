//Arreglo que contiene las palabras para jugar
let arrayPalabras =["HONESTIDAD", "RESPETO", "ETICA", "EQUIDAD", "IGUALDAD",
    "DIGNIDAD","TRANSPARENCIA","COMPROMISO","JUSTICIA",
   "EMPATIA", "INCLUSION", "SOLIDARIDAD" ];

//Arreglo que contiene las ayudas de cada palabra
let ayudas = [
   "Valor fundamental de la verdad",
   "Consideración hacia los demás",
   "Principios morales",
   "Justicia en el trato a las personas",
   "Derecho a recibir el mismo trato",
   "Valor inherente a toda persona",
   "Claridad en las acciones y decisiones",  
   "Actitud de responsabilidad y lealtad",  
   "Dar a cada quien lo que le corresponde", 
   "Capacidad de ponerse en el lugar del otro",
   "Participación sin discriminación",       
   "Apoyo mutuo y colaboración" 
]
//variable que guarda la cantidad de palabras ya jugadas
let cantPalabrasJugadas = 0;

//Variable que guarda la cantidad de intentos restantes
let intentosRestantes = 5;

//variable que guarda el indice de la Palabra actual
let posActual;

//arreglo que contiene la palabra actual con la que estoy judando
let arrayPalabraActual = [];

//Cantidad de de letras acertadas por cada jugada
let cantidadAcertadas = 0;

//Arreglo que guarda cada letra en divs
let divsPalabraActual = [];

//Cantidad de palabras que debe acertar en cada jugada.
let totalQueDebeAcertar;

function cargarNuevaPalabra() {
    // Verifica si ya no quedan palabras por jugar
    if (arrayPalabras.length === 0) {
        // Muestra el mensaje de felicitaciones
        document.getElementById("mensajeVictoria").style.display = "block";

        // Oculta la sección de "Adivina la Palabra"
        const adivinaLaPalabraSection = document.querySelector("section");
        if (adivinaLaPalabraSection) {
            adivinaLaPalabraSection.style.display = "none";
        }
        return; // Detiene la ejecución de la función
    }

    // Aumento en uno la cantidad de palabras jugadas
    cantPalabrasJugadas++;

    // Selecciono una posición random
    posActual = Math.floor(Math.random() * arrayPalabras.length);

    // Tomamos la palabra nueva
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;

    // Guardamos la palabra en un arreglo
    arrayPalabraActual = palabra.split('');

    // Limpiamos los contenedores
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";

    // Cargamos los divs de la palabra
    for (let i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }

    // Selecciono todos los divs de la palabra
    divsPalabraActual = document.getElementsByClassName("letra");

    // Seteamos los intentos
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;

    // Cargamos la ayuda de la pregunta
    document.getElementById("ayuda").innerHTML = ayudas[posActual];

    // Eliminamos el elemento ya seleccionado del arreglo
    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

//Llamada para cargar la primera palabra del juego
cargarNuevaPalabra();

//Detecto la tecla que el usuario presion
document.addEventListener("keydown", event => {
   //Controlo si la tecla presionada es una letra
   if(isLetter(event.key)){
       //Tomo las letras ya ingresadas hasta el momento
       let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
       //arma un a arreglo con las letras ingresadas
       letrasIngresadas = letrasIngresadas.split('');
       
       //controlo si la letra presionada ya ha sido ingresada
       if(letrasIngresadas.lastIndexOf(event.key.toUpperCase()) === -1){
           //variable bandera para saber si la letra ingresada esta en la palabra a descrubir
           let acerto = false;

           //Recorro el arreglo que ocntiene la palabra para verificar si la palabra ingresada esta
           for(i=0;i<arrayPalabraActual.length;i++){
               if(arrayPalabraActual[i] == event.key.toUpperCase()){//acertó
                   divsPalabraActual[i].innerHTML = event.key.toUpperCase();
                   acerto = true;
                   //Aumento en uno la cantidad de letras acertadas 
                   cantidadAcertadas = cantidadAcertadas + 1;
               }
           }
       
           //Controlo si acerto al menos una letra
           if(acerto==true){
               //controlamos si ya acerto todas
               if(totalQueDebeAcertar == cantidadAcertadas){
                   //asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                   for(i=0;i<arrayPalabraActual.length;i++){
                       divsPalabraActual[i].className="letra pintar";
                   }
               }
           }else{
               //No acerto, decremento los intentos restantes
               intentosRestantes = intentosRestantes - 1;
               document.getElementById("intentos").innerHTML = intentosRestantes;

               //controlamos si ya acabo todas la oportunidades
               if(intentosRestantes<=0){
                   for(i=0;i<arrayPalabraActual.length;i++){
                       divsPalabraActual[i].className="letra pintarError";
                   }
               }
           }

           //agrega la letra ingresada a las letras ya ingresadas que se visualizan
           document.getElementById("letrasIngresadas").innerHTML += event.key.toLocaleUpperCase() + " - ";
       }
   }
});

//Funcion que me determina si un caracter es una letra
function isLetter(str) {
   return str.length === 1 && str.match(/[a-z]/i);
}

