let countdown = 0; // variable to set/clear intervals
let secondes = 1500; // secondes left on the clock
let tempsTravail = 25;
let tempsPause = 5;
let enBreak = true;
let enPause = true;

let resultat = 0;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");
const resultatAffichage = document.querySelector("#resultatAffichage");

const alarm = document.createElement('audio'); // Un son de cloche qui sonne à la fin du travail.
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  enPause = !enPause;
  if (!enPause) {
    countdown = setInterval(timer, 1000);
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  secondes = tempsTravail * 60;
  countdown = 0;
  enPause = true;
  enBreak = true;
})

/* TIMER - HANDLES COUNTDOWN */
function timer() {
  secondes--;
  if (secondes < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    if(enBreak){      
    resultat++;
      }
    secondes = (enBreak ? tempsPause : tempsTravail) * 60;
    enBreak = !enBreak;
  }
}

/* UPDATE WORK AND BREAK TIMES */
let increment = 1;

let incrementFunctions =
  {
    "#work-plus": function () { tempsTravail = Math.min(tempsTravail + increment, 60) },
    "#work-minus": function () { tempsTravail = Math.max(tempsTravail - increment, 1) },
    "#break-plus": function () { tempsPause = Math.min(tempsPause + increment, 60) },
    "#break-minus": function () { tempsPause = Math.max(tempsPause - increment, 1) }
  };

for (var key in incrementFunctions) {
  if (incrementFunctions.hasOwnProperty(key)) {
    document.querySelector(key).onclick = incrementFunctions[key];
  }
}

/* UPDATE HTML CONTENT */
function countdownDisplay() {
  let minutes = Math.floor(secondes / 60);
  let remaindersecondes = secondes % 60;
  timerDisplay.textContent = `${minutes}:${remaindersecondes < 10 ? '0' : ''}${remaindersecondes}`;
}

function buttonDisplay() {
  if (enPause && countdown === 0) {
    startBtn.textContent = "Commencer!";
  } else if (enPause && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  enBreak ? status.textContent = "Il faut travailler" : status.textContent = "Prend une pause!";
  enPause ? statusAutre.textContent = "En attente..." : statusAutre.textContent = "TRAVAIL! ÉCRIT! GO!!!";
  workMin.textContent = tempsTravail;
  breakMin.textContent = tempsPause;
  resultatAffichage.textContent = resultat;
  
}

window.setInterval(updateHTML, 100);

document.onclick = updateHTML;