const buttonStart = document.getElementById("startTimer")
const buttonStop = document.getElementById("stopTimer")
const buttonReset = document.getElementById("resetTimer")
const timer = document.getElementById("timer")

let startTime = 0;
let elapsed = 0;
let running = false;
let animationID = null;

function start() {
    if (running) return;
    startTime = performance.now();
    running = true;
    animationID = requestAnimationFrame(update);
    buttonStart.disabled = true;
    buttonStop.disabled = false;
}

function stop() {
    if (!running) return;
    const now = performance.now();
    elapsed += now - startTime;
    running = false;
    if (animationID) cancelAnimationFrame(animationID);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    update();
}

function update() {
    const now = performance.now();
    const total = elapsed + (running ? (now - startTime): 0);
    timer.textContent = formatTime(Math.floor(total));
    if (running){
        animationID = requestAnimationFrame(update);
    }
}

function reset() {
    running = false;
    if (animationID) cancelAnimationFrame(animationID);
    elapsed = 0;
    startTime = 0;
    timer.textContent=formatTime(0);
    buttonStart.disabled = false;
    buttonStop.disabled = true;
}

function formatTime(total) {
    const minutes = Math.floor(total / 60000);
    const seconds = Math.floor((total % 60000) / 1000);
    const mm = String(minutes).padStart(2,'0');
    const ss = String(seconds).padStart(2,'0');
    if (minutes <= 0) return `${ss}s`;
    return `${mm}min ${ss}s`;
}

buttonStart.addEventListener('click', start);
buttonStop.addEventListener('click', stop);
buttonReset.addEventListener('click', reset);

buttonStop.disabled = true;