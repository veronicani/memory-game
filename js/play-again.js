"use strict";
/* Game restart prompt upon game completion */

const main = document.querySelector('main');
const gameBoard = document.querySelector('#game');
const cards = main.querySelectorAll('.card');

gameBoard.addEventListener('click', finishGame);

/* Finish the game when all cards match*/
function finishGame(evt) {
  if (cardsAllMatch(cards)) {
    saveScore(clickCount);
    setTimeout(promptRematch, 1000);
  }
}

/* Check that all cards have been matched */
function cardsAllMatch(cards) {
  for (let card of cards) {
    if (!card.classList.contains('match')) {
      return false;
    }
  }
  return true;
}

/* Create popup with message, click count, and play again button */
function promptRematch() {
  const msgWindow = document.createElement('div');
  msgWindow.classList.add("popup");
  const msg = document.createElement('h2');
  msg.innerText = 'Nice job!';
  const clicks = document.createElement('h3');
  clicks.innerText = '# Clicks to complete:'
  const score = document.createElement('h2');
  score.innerText = clickCount;
  const restartBtn = document.createElement('button');
  restartBtn.innerText = 'Play Again?';
  restartBtn.addEventListener('click', restartGame);
  msgWindow.append(msg, clicks, score, restartBtn);
  main.append(msgWindow);
}

/* refresh the game page -- currently reloads entire page*/
function restartGame() {
  window.location.reload();
}

/** Store the clicks as a score in local storage */
/*https://gamedevjs.com/articles/using-local-storage-for-high-scores-and-game-progress/*/
function saveScore(clicks) {
  //if browser supports local storage
  if (localStorage) {
    //save current score to local storage
    localStorage.setItem("currentScore", clicks);
  }
}