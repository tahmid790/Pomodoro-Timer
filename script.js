
let isPomodoro = true;
let isPlaying = false;
let workTime = 25; // Default Pomodoro time in minutes
let breakTime = 5; // Default short break in minutes
let longBreakTime = 15; // Long break after 4 cycles
let currentTime = workTime * 60; // Time in seconds
let cycleCount = 0;
let timerInterval;

const timerElement = document.getElementById("timer");
const startPauseButton = document.getElementById("start-pause");
const resetButton = document.getElementById("reset");
const toggleModeButton = document.getElementById("toggle-mode");
const adjustPomodoroButton = document.getElementById("adjust-pomodoro");
const adjustBreakButton = document.getElementById("adjust-break");

const alarmSound = new Audio("alarm.mp3"); // Make sure this file exists

// 🕒 Update Timer Display
function updateTimerDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
}

// ▶⏸ Start/Pause Timer
function startPauseTimer() {
    if (isPlaying) {
        clearInterval(timerInterval);
        startPauseButton.textContent = "Start";
    } else {
        timerInterval = setInterval(function () {
            currentTime--;
            updateTimerDisplay(currentTime);

            if (currentTime <= 0) {
                clearInterval(timerInterval);
                isPlaying = false;
                console.log("Time is up, playing alarm"); // Debug log
                playAlarm(); // Play alarm when time finishes
                handlePomodoroBreakSwitch(); // Switch modes after the alarm
            }
        }, 1000);
        startPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

// 🔔 Play Alarm
function playAlarm() {
    alarmSound.play();
    alarmSound.onplay = function() {
        console.log("Alarm is playing..."); // Debug log
    };
    alarmSound.onended = function () {
        console.log("Alarm has ended"); // Debug log
        stopAlarm(); // Stop alarm after it ends
    };
}

// 🚫 Stop Alarm & Switch Mode
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset alarm sound
    console.log("Alarm stopped"); // Debug log
}

// Function to handle Pomodoro/Break switch after alarm
function handlePomodoroBreakSwitch() {
    setTimeout(() => {
        if (isPomodoro) {
            cycleCount++;
            if (cycleCount === 4) {
                // After 4 Pomodoros, take a long break
                currentTime = longBreakTime * 60;
                cycleCount = 0;
                toggleModeButton.textContent = "Switch to Pomodoro";
            } else {
                currentTime = breakTime * 60;
                toggleModeButton.textContent = "Switch to Pomodoro";
            }
            isPomodoro = false; // Switch to break mode
        } else {
            currentTime = workTime * 60;
            isPomodoro = true; // Switch back to Pomodoro mode
            toggleModeButton.textContent = "Switch to Break";
        }

        updateTimerDisplay(currentTime); // Update the display after switching mode
        startPauseTimer(); // Restart timer after stopping alarm
    }, 1000); // Delay to allow the user to hear the alarm for 1 second before switching
}

// 🔄 Reset Timer
resetButton.addEventListener("click", () => {
    clearInterval(timerInterval);
    alarmSound.pause(); // Stop the alarm if it's playing
    alarmSound.currentTime = 0; // Reset alarm sound
    currentTime = workTime * 60; // Reset to work time
    cycleCount = 0; // Reset cycle count
    isPomodoro = true; // Reset to Pomodoro mode
    toggleModeButton.textContent = "Switch to Break";
    startPauseButton.textContent = "Start";
    updateTimerDisplay(currentTime);
    isPlaying = false; // Stop the timer
});

// 🔀 Switch Pomodoro/Break Mode Manually
toggleModeButton.addEventListener("click", () => {
    isPomodoro = !isPomodoro;
    currentTime = isPomodoro ? workTime * 60 : breakTime * 60;
    toggleModeButton.textContent = isPomodoro ? "Switch to Break" : "Switch to Pomodoro";
    updateTimerDisplay(currentTime);
});

// ⏳ Adjust Pomodoro & Break Time
adjustPomodoroButton.addEventListener("click", () => {
    let newTime = prompt("Enter Pomodoro time (minutes):", workTime);
    if (newTime && !isNaN(newTime) && newTime > 0) {
        workTime = parseInt(newTime);
        if (isPomodoro) {
            currentTime = workTime * 60;
            updateTimerDisplay(currentTime);
        }
    }
});

adjustBreakButton.addEventListener("click", () => {
    let newTime = prompt("Enter Break time (minutes):", breakTime);
    if (newTime && !isNaN(newTime) && newTime > 0) {
        breakTime = parseInt(newTime);
        if (!isPomodoro) {
            currentTime = breakTime * 60;
            updateTimerDisplay(currentTime);
        }
    }
});

// ✅ Initialize Timer on Page Load
updateTimerDisplay(currentTime);
document.addEventListener("DOMContentLoaded", () => {
    updateTimerDisplay(currentTime); // Initialize display
    startPauseButton.addEventListener("click", startPauseTimer); // Fix start button
});
function playAlarm() {
    setTimeout(function() {
        alarmSound.play();
    }, 100);  // Delay of 100ms
}
// ... (other code)


// ... (rest of your code)