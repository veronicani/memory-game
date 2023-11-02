"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const NUMBER = generateRandomNum(10, 20);
const COLORSHAPES = generateRandomColorShape(NUMBER);
const colorShapes = shuffle(COLORSHAPES);
createCards(colorShapes);
initGameBoard();

/** Generate random number between 3 and 10*/
function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Generate an array of random hexCodes for colors, with shapes*/
function generateRandomColorShape(num) {
  //create empty array
  const colorShapeHalf = [];
  //for the number of times param says
  for (let i = 0; i < num; i++) {
    const colorShape = [];
    //push the string of the hex code to the array
    colorShape.push(generateHex().toString());
    //push a random shape SVG to the array;
    colorShape.push(pickRandomShape());
    colorShapeHalf.push(colorShape);
  }
  //return the array, w/ the values doubled
  return colorShapeHalf.concat(colorShapeHalf);
}

/** Generate random hexCode */
/* https://stackoverflow.com/questions/1484506/random-color-generator */

function generateHex() {
  const hexChars = '0123456789ABCDEF';
  let hexCode = '#';
  for (let i = 0; i < 6; i++) {
    hexCode += hexChars[Math.floor(Math.random() * 16)];
  }
  return hexCode;
}

function pickRandomShape() {
  const SHAPES = {
    square: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"/></svg>',
    heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>',
    circle: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg>',
    star: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',
    clover: '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2C205.1 38.5 189.5 32 173.3 32z"/></svg>'
  }
  //generate an array of the shapes keys
  let shapesArr = Object.keys(SHAPES);
  //return a random key from shapes array
  let randomKey = shapesArr[Math.floor(Math.random() * shapesArr.length)];
  //return the value of the SHAPES obj at the shapeKey
  return SHAPES[randomKey];
}

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colorShapes) {
  const gameBoard = document.getElementById("game");
  for (let colorShape of colorShapes) {
    const [color, shape] = colorShape;
    const newContainer = document.createElement('div');
    newContainer.classList.add("container");
    const newCard = document.createElement('div');
    newCard.classList.add("card");
    const newCardFront = document.createElement('div');
    newCardFront.classList.add("card__front");
    newCardFront.innerHTML = shape;
    const newCardImg = newCardFront.querySelector('svg');
    newCardImg.removeAttribute('height');
    newCardImg.setAttribute('fill', color);
    newCardImg.classList.add('card__img');
    const newCardBack = document.createElement('div');
    newCardBack.innerText = "🍊";
    newCardBack.classList.add("card__back");
    newCard.append(newCardFront, newCardBack);
    newContainer.append(newCard);
    gameBoard.append(newContainer);
  }
}

function initGameBoard() {
  const gameBoard = document.getElementById("game");
  //add a click event listener to the gameBoard to handleCardClick
  gameBoard.addEventListener('click', handleCardClick);
}
/** Flip a card face-up. */

function flipCard(cardBack) {
  //add the class "flipped" on the card's parent
  cardBack.parentElement.classList.add("flipped");
}

/** Flip a card face-down. */

function unFlipCard(cardFront) {
  //remove class "flipped" from the card's parent
  cardFront.parentElement.classList.remove("flipped");
}

/** Handle clicking on a card: this could be first-card or second-card. */

let card1;
let card2;
let timeoutID;
 
function handleCardClick(evt) {
  //if the event target is the card back
  if (evt.target.className === 'card__back') {
    //check Notes for clearTimeout:
    clearTimeout(timeoutID);
    incrementClickCounter();
    
    const card = evt.target.parentElement;
    const cardBack = evt.target;
    const cardFront = evt.target.previousElementSibling;
    
    if (card1 === undefined || card2 === undefined) {
      if (!card.classList.contains('flipped')) {
        flipCard(cardBack);
        storeCard(cardFront);
      }
    }
    if (card1 !== undefined && card2 !== undefined) {
      if (cardsMatch(card1, card2)) {
        //if so, leave face up
        card1 = undefined;
        card2 = undefined;
      } else {
        //wait 1 second
        timeoutID = setTimeout(() => {
          unFlipCard(card1);
          unFlipCard(card2);
          card1 = undefined;
          card2 = undefined;
        }, 1000);          
      }
    }
  }
}

/*Notes for clearTimeout:
Clears a previous setTimeout upon click event -- prevents setTimeout from stacking
      /*Case 1 -  two matching cards w/ setTimeout active to reset card1 and card2. 
      If the "first card" is selected, it will be stored in card1 and count increments to 1. 
      If previous setTimeout has reached its timer before user clicks again and calls the 
      function, it will execute cb and reset the card1 and count. Now, the "first card" is
      no longer stored in card1, and the next card flipped will be the new card1.  It will
      remain flipped.*/
    
      /*Case 2 - two non-matching cards w/ setTimeout active to unflip cards. 
      If the "first card" is selected, it will be stored in card1 and count increments to 1.
      If previous setTimeout has reached its timer before user clicks again and calls the 
      function, it will execute and unflip card1. The "first card" will be unflipped before
      you click on a second card.*/

    //everytime user clicks, the previous timeout set by a previous click will be cleared,
    // and the cards will never reset. A new timeout is set, forcing user to wait full 
    //duration again.

/** Remember if a card is the first one flipped or the second one flipped. */
function storeCard(flippedCard) {
  //if card1 is undefined
  if (card1 === undefined) {
    //card1 is the flipped card
    card1 = flippedCard;
  } else {
    //card2 is flipped card
    card2 = flippedCard;
  }
  //return card1, card2  
  return card1, card2;
}
  
/** Check if the first and second card match. */
function cardsMatch(card1, card2) {
  //if the innerHTMLs of card1 and card2 match
  if (card1.innerHTML === card2.innerHTML) {
    console.log('match found!');
    //mark the cards as matched
    card1.parentElement.classList.add("match");
    card2.parentElement.classList.add("match");
    return true;
  } 
}

/** Increment the count of clicks with each click. */

let clickCount = 0;

function incrementClickCounter() {
  const clickCounter = document.querySelector('main > h2');
  clickCount++;  
  clickCounter.innerText = 'Clicks: ' + clickCount;
  return clickCount;
}