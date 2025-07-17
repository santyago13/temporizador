// Elementos
const display = document.querySelector('.circulo');
const form = document.querySelector('form');
const btnIniciar = document.querySelector('.btn-iniciar');
const btnDetener = document.querySelector('.btn-detener');
const btnReset = document.querySelector('.btn-reset');

const inputHH = document.getElementById('HH');
const inputMM = document.getElementById('MM');
const inputSS = document.getElementById('SS')

const audio = new Audio("resources/alarma.mp3");

let tiempo = 0;
let tiempoInicial = 0;
let intervalo = null;

// Asociamos funciones a los eventos
form.addEventListener('submit', agregarTiempo);
btnIniciar.addEventListener('click', iniciarTemporizador);
btnDetener.addEventListener('click', detenerTemporizador);
btnReset.addEventListener('click', reiniciarTemporizador);

function agregarTiempo(event) {
  event.preventDefault();

  const h = parseInt(inputHH.value) || 0;
  const m = parseInt(inputMM.value) || 0;
  const s = parseInt(inputSS.value) || 0;

  tiempo = h * 3600 + m * 60 + s;
  tiempoInicial = tiempo;

  mostrar(tiempo);
  form.reset();
}

function iniciarTemporizador() {
  if (intervalo || tiempo <= 0) return;
  intervalo = setInterval(actualizarTemporizador, 1000);
  audio.pause();
  audio.currentTime = 0;
}

function actualizarTemporizador() {
  tiempo--;
  mostrar(tiempo);

  if (tiempo <= 0) {
    clearInterval(intervalo);
    intervalo = null;
    audio.play();
    audio.loop = true;
    display.classList.add('animar-borde'); // Agrega la animación al borde
  }
}

function detenerTemporizador() {
  clearInterval(intervalo);
  intervalo = null;
  audio.pause();
  audio.currentTime = 0;
  display.classList.remove('animar-borde'); // Quita la animación del borde
}

function reiniciarTemporizador() {
  clearInterval(intervalo);
  intervalo = null;
  tiempo = tiempoInicial;
  mostrar(tiempo);
  audio.pause();
  audio.currentTime = 0;
  display.classList.remove('animar-borde'); // Quita la animación del borde
}

function mostrar(segundos) {
  const h = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const s = String(segundos % 60).padStart(2, "0");
  display.textContent = `${h} : ${m} : ${s}`;
}

