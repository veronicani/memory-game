"use strict";

createLoadPage();

function createLoadPage() {
  const body = document.querySelector('body');
  const loadPage = document.createElement('header');
  const title = document.createElement('h1');
  title.innerText = 'Memory Game';
  const bestScore = document.createElement('h2');
  bestScore.innerText = 'Best Score: -- ';
  const startBtn = document.createElement('button');
  startBtn.innerText = "Start"; 
  startBtn.addEventListener('click', loadGame);
  loadPage.append(title, bestScore, startBtn);
  body.append(loadPage);
}

function loadGame(evt) {
  evt.target.parentElement.remove();
}