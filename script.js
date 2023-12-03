"use strict";

const DQS = (element) => document.querySelector(element);
let currentScore = [0, 0];
let score = 0;
let playing = true;
let player = 0;

const start = function () {
  player = 0;
  currentScore = [0, 0];
  score = 0;

  DQS("#current--0").innerText = score;
  DQS("#score--0").innerText = score;
  DQS("#current--1").innerText = score;
  DQS("#score--1").innerText = score;
  DQS(".player--0").classList.add("player--active");
  DQS(".player--1").classList.remove("player--active");
  DQS(".player--0").classList.remove("player--winner");
  DQS(".player--1").classList.remove("player--winner");
  DQS("#name--0").innerText = "Player 1";
  DQS("#name--0").classList.remove("center");
  DQS("#name--1").innerText = "Player 2";
  DQS("#name--1").classList.remove("center");
  DQS(".dice").classList.remove("hidden");
  playing = true;
};
start();

const changePLayer = () => {
  score = 0;
  DQS(`.player--${player}`).classList.remove("player--active");
  if (player === 0) {
    player = 1;
  } else {
    player = 0;
  }
  DQS(`.player--${player}`).classList.add("player--active");
};

DQS(".btn--roll").addEventListener("click", () => {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    DQS(".dice").src = `dice-${dice}.png`;
    if (dice !== 1) {
      score += dice;
      DQS(`#score--${player}`).innerText = score;
    } else {
      DQS(`#score--${player}`).innerText = 0;
      changePLayer();
    }
  }
});

DQS(".btn--hold").addEventListener("click", () => {
  currentScore[player] += score;

  DQS(`#current--${player}`).innerText = currentScore[player];
  score = 0;
  DQS(`#score--${player}`).innerText = score;

  if (currentScore[player] >= 10) {
    DQS(".dice").classList.add("hidden");
    DQS(`.player--${player}`).classList.add("player--winner");
    DQS(`.player--${player}`).classList.remove("player--active");
    playing = false;
    DQS(`#name--${player}`).innerText = "You Win\nFlawless Victory";
    DQS(`#name--${player}`).classList.add("center");
  } else {
    changePLayer();
  }
});

DQS(".btn--new").addEventListener("click", start);
