"use strict";

const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".display-player");
const resetBtn = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");
const xscore = document.querySelector(".xscore");
const oscore = document.querySelector(".oscore");
let xScore = 0;
let oScore = 0;
let activePlayer = "X";
let arrayX = [];
let arrayO = [];
const winningCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
oscore.textContent = `O: ${oScore}`;
xscore.textContent = `X: ${xScore}`;

const reset = function () {
  activePlayer = "X";
  arrayX = [];
  arrayO = [];
  announcer.classList.add("hide");
  playerDisplay.innerText = activePlayer;
  tiles.forEach((tile) => {
    tile.innerText = " ";
    // xScore = 0;
    // oScore = 0;
    // oscore.textContent = `O: ${oScore}`;
    // xscore.textContent = `X: ${xScore}`;
  });
};

const checkWinner = function () {
  for (let i = 0; i <= 7; i++) {
    let winCondition = winningCondition[i];
    let [a, b, c] = winCondition;
    if (arrayX.includes(a) && arrayX.includes(b) && arrayX.includes(c)) {
      announcer.classList.remove("hide");
      announcer.textContent = "PLAYER X HAS WON";
      xScore++;
      setTimeout(reset, 3000);
    } else if (arrayO.includes(a) && arrayO.includes(b) && arrayO.includes(c)) {
      announcer.classList.remove("hide");
      announcer.innerText = "PLAYER O HAS WON";
      oScore++;
      setTimeout(reset, 3000);
    } else if (arrayO.length + arrayX.length === 9) {
      announcer.classList.remove("hide");
      announcer.innerText = "IT'S A TIE!!!";
      setTimeout(reset, 3000);
    }
    oscore.textContent = `O: ${oScore}`;
    xscore.textContent = `X: ${xScore}`;
  }
};

const play = function (e) {
  activePlayer === "X"
    ? (e.target.innerText = `X`)
    : (e.target.innerText = `O`);
  activePlayer === "X"
    ? arrayX.unshift(Number(e.target.attributes[1].value))
    : arrayO.unshift(Number(e.target.attributes[1].value));
  arrayX.sort((a, b) => (a > b ? 1 : -1));
  arrayO.sort((a, b) => (a > b ? 1 : -1));
  activePlayer === "X" ? (activePlayer = "O") : (activePlayer = "X");
  playerDisplay.innerText = activePlayer;
  checkWinner();
};

tiles.forEach((tile) => {
  tile.addEventListener("click", play);
});

resetBtn.addEventListener("click", reset);
