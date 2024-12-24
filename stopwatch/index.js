const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let timerUpdate = null;
let startTime = null;
let elapseTime = 0;
let run = false;


startBtn.addEventListener("click", () => {
    if (!run) {
        run = true;
        startTime = Date.now() - elapseTime;
        timerUpdate = setInterval(update);
    }
});

stopBtn.addEventListener("click", () => {
    if (run) {
        run = false;
        clearInterval(timerUpdate);
        elapseTime = Date.now() - startTime;
        timerUpdate = null;
    }
});

resetBtn.addEventListener("click", () => {
    startTime = null;
    elapseTime = 0;
    run = false;
    clearInterval(timerUpdate);
    timerUpdate = null;
    timer.textContent = "00:00:00:00";
})

function update() {
    elapseTime = Date.now() - startTime;

    const milliseconds = Math.floor((elapseTime % 1000) / 10);
    const seconds = Math.floor(elapseTime / 1000) % 60; 
    const minutes = Math.floor(elapseTime / 60000) % 60;
    const hours = Math.floor(elapseTime / 3600000);

    timer.textContent = `${hours.toString().padStart(2, '0')}` +
                        `:${minutes.toString().padStart(2,'0')}` +
                        `:${seconds.toString().padStart(2,'0')}` +
                        `:${milliseconds.toString().padStart(2, '0')}`;
}