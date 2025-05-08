let timer;
let seconds = 0;
let minutes = 0;
let isRunning = false;

function updateDisplay() {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  $('#display').text(`${formattedMinutes}:${formattedSeconds}`);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    updateDisplay();
}

$(document).ready(() => {
  $('.button-left').on('click', startTimer);
  $('.button-right').on('click', stopTimer);
  $('.button-reset').on('click', resetTimer);
});