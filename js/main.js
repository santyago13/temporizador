let tiempoTotal = 0; // En segundos
let tiempoRestante = 0;
let intervalo = null;

const display = document.getElementById('tiempo');
const btnIniciar = document.querySelector('.btn-primary');
const btnPausar = document.querySelector('.btn-warning');
const btnReset = document.querySelector('.btn-danger');
const btnAgregar = document.querySelector('.btn-success');

// Formatear a HH : MM : SS
function formatearTiempo(segundos) {
  const horas = String(Math.floor(segundos / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');
  return `${horas} : ${minutos} : ${seg}`;
}

function actualizarDisplay() {
  display.textContent = formatearTiempo(tiempoRestante);
}

function iniciar() {
  if (tiempoRestante > 0 && !intervalo) {
    intervalo = setInterval(() => {
      tiempoRestante--;
      actualizarDisplay();
      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        intervalo = null;
        alert('¡Tiempo finalizado!');
      }
    }, 1000);
  }
}

function pausar() {
  clearInterval(intervalo);
  intervalo = null;
}

function resetear() {
  clearInterval(intervalo);
  intervalo = null;
  tiempoRestante = tiempoTotal;
  actualizarDisplay();
}

function agregarTiempo() {
  let valor = prompt('¿Cuántos segundos querés agregar?');
  let segundos = parseInt(valor);
  if (!isNaN(segundos) && segundos > 0) {
    tiempoTotal = segundos;
    tiempoRestante = segundos;
    actualizarDisplay();
  } else {
    alert('Ingresá un número válido.');
  }
}

// Event listeners
btnIniciar.addEventListener('click', iniciar);
btnPausar.addEventListener('click', pausar);
btnReset.addEventListener('click', resetear);
btnAgregar.addEventListener('click', agregarTiempo);

// Inicializa el display al cargar
actualizarDisplay();