//Timer Elements
const timerContainer = document.getElementById("timer");
const minutesDom = document.getElementById("timer-min");
const secondsDom = document.getElementById("timer-secs");
let timer = null;
// Buttons
const configModeBtn = document.getElementById("btn-configMode");
const pomodoroModeBtn = document.getElementById("btn-pomodoroMode");
const playBtn = document.getElementById("btn-play");
const pauseBtn = document.getElementById("btn-pause");
const resetBtn = document.getElementById("btn-reset");
const colorButtons = document.querySelectorAll(".color-button");
const playMusicButton = document.getElementById("play-button");
const music = document.getElementById("audio");
// Selects Values
const selectPlayFinishSom = document.getElementById("playFinishSom");
const selectPlaySomButtons = document.getElementById("playSomButtons");
const selectPlayMusics = document.getElementById("playMusic");
let valuePlayFinishSom = selectPlayFinishSom.value;
let valuePlaySomButtons = selectPlaySomButtons.value;
let valuePlayMusic = selectPlayMusics.value;
// Decrements
const inicialTimer = 60 * 25;
let timerInSeconds = inicialTimer;
// Sections Elements
const topContainer = document.getElementById("top-container");
const settingsContainer = document.getElementById("settings");
// Audios
const audioPlay = new Audio("./assets/audio/play.wav");
const audioPause = new Audio("./assets/audio/pause.mp3");
const audioFinishTime = new Audio("./assets/audio/beep.mp3");

pomodoroModeBtn.addEventListener("click", setPomodoroMode);
configModeBtn.addEventListener("click", setConfig);
playBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    colorButtons.forEach((button) => {
      button.classList.remove("btn-active");
    });
    button.classList.add("btn-active");
    var newColor = this.getAttribute("data-color");
    document.documentElement.style.setProperty("--primary-color", newColor);
  });
});
playMusicButton.addEventListener("click", playOrPauseMusic);
selectPlayFinishSom.addEventListener("change", updateValueSelect);
selectPlaySomButtons.addEventListener("change", updateValueSelect);
selectPlayMusics.addEventListener("change", updateValueSelect);

updateTimerDom();

function updateValueSelect() {
  valuePlayFinishSom = selectPlayFinishSom.value;
  valuePlaySomButtons = selectPlaySomButtons.value;
  valuePlayMusic = selectPlayMusics.value;
  if (!music.paused && valuePlayMusic === "no") {
    music.pause();
    playMusicButton.classList.remove("playing");
  }
}

function playOrPauseMusic() {
  console.log(music);
  if (valuePlayMusic === "no") return;

  if (music.paused) {
    music.play();
    playMusicButton.classList.add("playing");
  } else {
    music.pause();
    playMusicButton.classList.remove("playing");
  }
}

function setConfig() {
  topContainer.classList.add("hide");
  settingsContainer.classList.remove("hide");
}

function setPomodoroMode() {
  topContainer.classList.remove("hide");
  settingsContainer.classList.add("hide");
}

function startTimer() {
  playBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  if (valuePlaySomButtons === "yes") audioPlay.play();
  playBtn.textContent = "Retomar";
  timerContainer.classList.remove("blink");
  timer = setInterval(() => {
    timerInSeconds--;
    updateTimerDom();
  }, 1000);
}

function pauseTimer() {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  if (valuePlaySomButtons === "yes") audioPause.play();
  clearInterval(timer);
  timerContainer.classList.add("blink");
}

function resetTimer() {
  playBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  if (valuePlaySomButtons === "yes") audioPause.play();
  playBtn.textContent = "Iniciar";
  timerContainer.classList.remove("blink");
  clearInterval(timer);
  timerInSeconds = inicialTimer;
  updateTimerDom();
}

function updateTimerDom() {
  console.log(valuePlaySomButtons);
  const minutes = Math.floor(timerInSeconds / 60);
  minutesDom.innerHTML = String(minutes).padStart(2, 0);
  const seconds = Math.floor(timerInSeconds % 60);
  secondsDom.innerHTML = String(seconds).padStart(2, 0);
  if (minutes === 0 && seconds === 0) {
    resetTimer();
    if (valuePlayFinishSom === "yes") audioFinishTime.play();
  }
}
