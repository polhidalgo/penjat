let palabraSecreta = '';
let palabraMostrar = [];
let intentos = 10;
let puntos = 0;
let letrasUsadas = [];

const palabraInput = document.getElementById('palabraInput');
const palabraOculta = document.getElementById('palabraOculta');
const intentosRestantes = document.getElementById('intentosRestantes');
const botonesLetras = document.getElementById('botonesLetras');

function togglePassword() {
    palabraInput.type = palabraInput.type === 'password' ? 'text' : 'password';
}


function iniciarJuego() {
    palabraSecreta = palabraInput.value.trim().toUpperCase();

    if (!/^[A-Z]{4,}$/.test(palabraSecreta)) {
        alert("La palabra debe tener más de 3 caracteres y solo letras.");
        return;
    }

    palabraMostrar = Array(palabraSecreta.length).fill('_');
    mostrarPalabra();
    intentos = 10;
    letrasUsadas = [];
    const intentosImg = `<img src="/img/img_${intentos}.jpg" alt="Intentos restantes">`;
    intentosRestantes.innerHTML = intentosImg;
    palabraInput.disabled = true;
    document.getElementById("comenzarJuego").disabled = true;
    palabraOculta.style.backgroundColor = 'white';

    generarBotonesLetras();
}

function mostrarPalabra() {
    palabraOculta.textContent = palabraMostrar.join(' ');
}


function generarBotonesLetras() {
    botonesLetras.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letra => {
        const boton = document.createElement('button');
        boton.textContent = letra;
        boton.onclick = () => verificarLetra(letra);
        boton.id = `boton-${letra}`;
        botonesLetras.appendChild(boton);
    });
}

function verificarLetra(letra) {
    if (letrasUsadas.includes(letra)) return; 
    letrasUsadas.push(letra);

    let acierto = false;

    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            palabraMostrar[i] = letra;
            acierto = true;
        }
    }

    if (acierto) {
        puntos++;
        mostrarPalabra();
        verificarVictoria();
    } else {
        intentos--;
       
        const imagen = document.querySelector('#intentosRestantes img');
        if (imagen) {
            imagen.src = `/img/img_${intentos}.jpg`;
        }

        document.getElementById(`boton-${letra}`).style.color = 'red';
    }
    

    if (intentos === 0) {
        finalizarJuego(false);
    }

}

function verificarVictoria() {
    if (palabraMostrar.join('') === palabraSecreta) {
        finalizarJuego(true);
    }
}

function finalizarJuego(ganado) {
    if (ganado) {
        palabraOculta.style.backgroundColor = 'green';
        
    } else {
        palabraOculta.style.backgroundColor = 'red';
        palabraOculta.textContent = palabraSecreta;
        
    }

    palabraInput.disabled = false;
    document.getElementById("comenzarJuego").disabled = false;
    intentos = 10;
    letrasUsadas = [];
    puntos = 0;
}
