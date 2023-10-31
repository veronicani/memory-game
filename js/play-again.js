"use strict";
/* Game restart prompt upon game completion */

const main = document.querySelector('main');
const gameBoard = document.querySelector('#game');
const cards = main.querySelectorAll('.card');
//create eventListener in the gameBoard, respond to clicks
gameBoard.addEventListener('click', checkAllMatch);
gameBoard.addEventListener('click', promptRestart);

/* Check that all cards have been matched */
function checkAllMatch() {
  //iterate over all the cards
  for (let card of cards) {
    //if a card does not have 'match' class
    console.log(card.classList);
    if (!card.classList.contains('match')) {
      //return false
      return false;
    }
  }
  //return true
  return true;
}
/* Create popup window with play again button */
function promptRestart(evt) {
  //if all cards have 'matched' class
  if (checkAllMatch()) {
    //store the current # clicks in local storage
    saveScore(clickCount);
    //create popup with win message, click count, and restart button (with event Listener)
    setTimeout(() => {
      //create div (message window)
      const msgWindow = document.createElement('div');
      //add class to div
      msgWindow.classList.add("popup");
      //create h2
      const msg = document.createElement('h2');
      //add innerText to h2 (Nice Job!)
      msg.innerText = 'Nice job!';
      //create h3
      const clicks = document.createElement('h3');
      //add innerText to p (# of clicks to complete)
      clicks.innerText = '# Clicks to complete:'
      //create h2 - for # score;
      const score = document.createElement('h2');
      score.innerText = clickCount;
      //create button
      const restartBtn = document.createElement('button');
      //add innerText to button (Play Again?)
      restartBtn.innerText = 'Play Again?';
      //add addEventListener to button;
      restartBtn.addEventListener('click', restartGame);
      //append h2, p, button to message window
      msgWindow.append(msg, clicks, score, restartBtn);
      //append message window to body
      main.append(msgWindow);
    }, 1000);
  }
}

function restartGame() {
  //refresh the game page -- currently reloads entire page
  window.location.reload();
}

/** Store the clicks as a score in local storage */
function saveScore(clicks) {
  //if browser supports local storage
  if (localStorage) {
    //save current score to local storage
    localStorage.setItem("currentScore", clicks);
  }
  console.log(clicks);
}