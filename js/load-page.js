"use strict";

console.log('page loaded!')
createLoadPage();

function createLoadPage() {
  const body = document.querySelector('body');
  const loadPage = document.createElement('header');
  const title = document.createElement('h1');
  title.innerText = 'Memory Game';
  const highScore = document.createElement('h2');
  highScore.innerText = 'High Score: ';
  const startBtn = document.createElement('button');
  startBtn.innerText = "Start"; 
  startBtn.addEventListener('click', loadGame);
  loadPage.append(title, highScore, startBtn);
  body.append(loadPage);
}

function loadGame(evt) {
  evt.target.parentElement.remove();
}