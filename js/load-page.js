"use strict";

createLoadPage();

function createLoadPage() {
  const body = document.querySelector('body');
  const loadPage = document.createElement('header');
  loadPage.append(createTitle(), createBestScoreTxt(), createStartBtn(), createClearBtn());
  body.append(loadPage);
}

function createTitle() {
  const title = document.createElement('h1');
  title.innerText = 'Memory Game';
  return title;
}

function createBestScoreTxt() {
  const bestScoreTxt = document.createElement('h2');
  bestScoreTxt.innerText = `Best Score: ${retrieveBestScore()}`;
  return bestScoreTxt;
}

function createStartBtn() {
  const startBtn = document.createElement('button');
  startBtn.innerText = "Start"; 
  startBtn.addEventListener('click', removeLoadPage);
  return startBtn;
}  

function createClearBtn() {
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('secondary-btn');
  clearBtn.innerText = "Clear Best Score";
  clearBtn.addEventListener('click', clearBestScore);
  return clearBtn;
}  


function removeLoadPage(evt) {
  setTimeout(function() {
    evt.target.parentElement.remove();
  }, 200);
}

/* Retrieve best score from local storage */
/*https://gamedevjs.com/articles/using-local-storage-for-high-scores-and-game-progress/*/


function retrieveBestScore() {
  if (localStorage) {
    const bestScore = localStorage.getItem('bestScore');  
    if (bestScore !== undefined) {
      return updateBestScore();
    } else {
      return setDefaultBestScore();
    }
  }
}

function updateBestScore() {
  const currentScore = localStorage.getItem('currentScore');
  let currentBest = localStorage.getItem('bestScore');
  console.log(localStorage); 
  if (Number(currentScore) < Number(currentBest)) {      
    currentBest = currentScore;      
    localStorage.setItem('bestScore', currentBest);
  }
  return currentBest;   
}

 function setDefaultBestScore() {
  localStorage.setItem('bestScore', +Infinity);
  return '--';
 }
  

/* Reset the best score */
function clearBestScore() {
  //reassign best score in the local storage to be Infinity;
  let bestScore = +Infinity;
  localStorage.setItem('bestScore', +Infinity);
  const bestScoreTxt = document.querySelector('header > h2');
  bestScoreTxt.innerText = 'Best Score: --';
  return bestScore;
}