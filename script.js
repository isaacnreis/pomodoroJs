//Timer Elements
const minutesDom = document.getElementById("timer-min");
const secondsDom = document.getElementById("timer-secs");
let timer = null;
// Buttons
const playBtn = document.getElementById("btn-play");
const pauseBtn = document.getElementById("btn-pause");
const resetBtn = document.getElementById("btn-reset");
// Decrements
const inicialTimer = 60 * 25;
let timerInSeconds = inicialTimer;

playBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDom();

function startTimer() {
  playBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  playBtn.innerHTML = "Return";
  timer = setInterval(() => {
    timerInSeconds--;
    updateTimerDom();
  }, 1000);
}

function pauseTimer() {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  clearInterval(timer);
}

function resetTimer() {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  playBtn.innerHTML = "Play";
  clearInterval(timer);
  timerInSeconds = inicialTimer;
  updateTimerDom();
}

function updateTimerDom() {
  const minutes = Math.floor(timerInSeconds / 60);
  minutesDom.innerHTML = String(minutes).padStart(2, 0);
  const seconds = Math.floor(timerInSeconds % 60);
  secondsDom.innerHTML = String(seconds).padStart(2, 0);
}
