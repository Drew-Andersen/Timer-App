$('#alarm-sound')[0].load()

let totalSeconds = 0;
let interval = null;

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds =  totalSeconds % 60;
    $('#display').val(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
}

function parseManualInput() {
    const value = $('#display').val();
    const parts = value.split(':').map(Number);

    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const [min, sec] = parts;
        totalSeconds = Math.max(0, min * 60 + sec);
        updateDisplay(); 
    } else {
        alert("Please enter a valid time in MM:SS format.");
        updateDisplay();
    }
}

function startTimer() {
    if (interval === null && totalSeconds > 0) {
        interval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(interval);
                interval = null;
                $('#alarm-sound')[0].play();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
    const alarm = $('#alarm-sound')[0];
    if (alarm) {
        alarm.pause();
        alarm.currentTime = 0;
    }
}

function resetTimer() {
    stopTimer();
    totalSeconds = 0;
    updateDisplay();
}

function addTime(timeStr) {
    const isAdd = timeStr.includes('+');
    const [min, sec] = timeStr.replace(/[^\d:]/g, '').split(':').map(Number);
    const seconds = min * 60 + sec;
    totalSeconds += isAdd ? seconds : - seconds;
    if (totalSeconds < 0) totalSeconds = 0;
    updateDisplay();
}

$(document).ready(function () {
    updateDisplay();
  
    $('.button-left').click(startTimer);
    $('.button-right').click(stopTimer);
    $('.button-reset').click(resetTimer);
  
    $('.time').click(function () {
      addTime($(this).text());
    });

    $('#display').on('blur', parseManualInput);

    $('#display').on('keypress', function (e) {
        if (e.which === 13) { 
            parseManualInput();
            $(this).blur(); 
        }
    });
});