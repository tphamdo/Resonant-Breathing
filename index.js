const countdown = document.querySelector(".countdown");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
let tenth = parseInt(document.querySelector(".input-tenths").value);
let sec = parseInt(document.querySelector(".input-seconds").value);
let min = parseInt(document.querySelector(".input-minutes").value);
let hr = parseInt(document.querySelector(".input-hours").value);
let tenthsText = document.querySelector(".input-tenths");
let secText = document.querySelector(".input-seconds");
let minText = document.querySelector(".input-minutes");
let hrText = document.querySelector(".input-hours");
let breathText = document.querySelector(".breath-text");

window.addEventListener("DOMContentLoaded", function() {
  // Reset button disabling:
  resetButton.style.cursor = "not-allowed";
  resetButton.style.opacity = "0.5";
  // So the numbers are always two-digit:
  if (hrText.value < 10) {
    hrText.value = "0" + hrText.value;
  }
  if (minText.value < 10) {
    minText.value = "0" + minText.value;
  }
  if (secText.value < 10) {
    secText.value = "0" + secText.value;
  }
});

hrText.addEventListener("input", twoDigit);
minText.addEventListener("input", twoDigit);
secText.addEventListener("input", twoDigit);

function twoDigit (e) {
  hrText.value = ("00" + hrText.value).substr(-2);
  minText.value = ("00" + minText.value).substr(-2);
  secText.value = ("00" + secText.value).substr(-2);
}

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", logTimerClick);

function logTimerClick() {
  console.log("start button clicked");
}

function startTimer(e) {
  console.log("startTimer");
  let startTime = 0;
  let interval = 55;
  let breath_in = false;
  
  // Disabling start button and enabling reset button:
  startButton.style.cursor = "not-allowed";
  startButton.style.opacity = "0.5";
  startButton.disabled = true;
  resetButton.style.cursor = "pointer";
  resetButton.style.opacity = "1";

  function startCount() {
    console.log(startTime)
    tenth = parseInt(document.querySelector(".input-tenths").value);
    sec = parseInt(document.querySelector(".input-seconds").value) * 10;
    min = parseInt(document.querySelector(".input-minutes").value) * 60 * 10;
    hr = parseInt(document.querySelector(".input-hours").value) * 3600 * 10;

    // Computing for each time measurement and displaying it on screen:
    let tenths = 1
    let second = tenths * 10;
    let minute = second * 60;
    let hour = minute * 60;
    hrText.value = Math.floor(startTime / hour);
    minText.value = Math.floor(startTime / minute) % 60 
    secText.value = Math.floor(startTime / second) % 60;
    tenthsText.value = startTime % second;
    
    // Making sure that time is always displayed as two-digit numbers:
    if (hrText.value < 10) {
      hrText.value = "0" + hrText.value;
    }
    if (minText.value < 10) {
      minText.value = "0" + minText.value;
    }
    if (secText.value < 10) {
      secText.value = "0" + secText.value;
    }

    if (startTime % interval == 0) {
      breath_in = !breath_in

      breathText.innerText = (breath_in? "Breath In" : "Breath Out");
      console.log(breath_in? "Breath In" : "Breath Out");
    }
    startTime+=1;
  }
  
  var intervalID = setInterval(startCount, 100);
  
  resetButton.addEventListener("click", resetTimer);
  function resetTimer(e) {
    console.log("reset timer");
    startTime = 0;
    clearInterval(intervalID);
    hrText.value = "0" + 0;
    minText.value = "0" + 0;
    secText.value = "0" + 0;
    tenthsText.value = "0" + 0;
    
    // Disable reset button and enable start button:
    startButton.style.cursor = "pointer";
    startButton.style.opacity = "1";
    startButton.disabled = false;
    resetButton.style.cursor = "not-allowed";
    resetButton.style.opacity = "0.5";
  }
}

