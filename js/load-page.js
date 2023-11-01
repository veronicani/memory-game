"use strict";

createLoadPage();

function createLoadPage() {
  const body = document.querySelector('body');
  const loadPage = document.createElement('header');
  const title = document.createElement('h1');
  title.innerText = 'Memory Game';
  const bestScoreTxt = document.createElement('h2');
  bestScoreTxt.innerText = 'Best Score: ' + retrieveBestScore();
  const startBtn = document.createElement('button');
  startBtn.innerText = "Start"; 
  startBtn.addEventListener('click', removeLoadPage);
  const clearBtn = document.createElement('button');
  clearBtn.innerText = "Clear Best Score";
  clearBtn.addEventListener('click', clearBestScore);
  loadPage.append(title, bestScoreTxt, startBtn, clearBtn);
  body.append(loadPage);
}

function removeLoadPage(evt) {
  evt.target.parentElement.remove();
}

function retrieveBestScore() {
  //if there is a local storage
  if (localStorage) {
    //retrieve the currentScore
    const currentScore = localStorage.getItem('currentScore');
    console.log('current: ', currentScore);
    let bestScore = localStorage.getItem('bestScore');
    //if there is a previous bestScore in local storage
    if (bestScore !== undefined) {
      //if the currentScore is lower than the bestScore
      if (currentScore < bestScore) {
        console.log('current-best: ', bestScore);
        //reassign the bestScore to be the currentScore;
        bestScore = currentScore;
        //store the updated bestScore in the local storage
        localStorage.setItem('bestScore', bestScore);
      }
      //return bestScore;
      return bestScore;
    } else {
      //store a bestScore in local cache with value of infinity;
      localStorage.setItem('bestScore', +Infinity);
      //return '--';
      return '--';
    }
  }
}

function clearBestScore() {
  //reassign best score in the local storage to be Infinity;
  localStorage.setItem('bestScore', +Infinity);
  const bestScoreTxt = document.querySelector('header > h2');
  bestScoreTxt.innerText = 'Best Score: --';
}