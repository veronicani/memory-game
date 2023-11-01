"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;

/** Generate random number between 3 and 10*/
const NUMBER = generateRandomNum(3, 10);

function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const COLORS = generateRandomColors(NUMBER);

/** Generate an array of random hexCodes for colors*/
function generateRandomColors(num) {
  //create empty array
  const colorsHalf = [];
  //for the number of times param says
  for (let i = 0; i < num; i++) {
    //create a random color hex code
    //push the string of the hex code to the array
    colorsHalf.push(generateHex().toString());
  }
  //return the array, w/ the values doubled
  return colorsHalf.concat(colorsHalf);
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

const colors = shuffle(COLORS);

createCards(colors);


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

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    //create a div element, add class 'container'
    const newContainer = document.createElement('div');
    newContainer.classList.add("container");
    //create a div element, add class 'card'
    const newCard = document.createElement('div');
    newCard.classList.add("card");
    //create a div element, add class 'card__front'
    const newCardFront = document.createElement('div');
    newCardFront.classList.add("card__front");
    //add inline style of background color to card__front;
    newCardFront.style.backgroundColor = color;
    //add class with value of color to card__front;
    newCardFront.classList.add(color); 
    //create a div element, add class 'card__back'
    const newCardBack = document.createElement('div');
    newCardBack.innerText = "🍊";
    newCardBack.classList.add("card__back");
    //append card_front card__back to card
    newCard.append(newCardFront, newCardBack);
    //add a click event listener to the card to handleCardClick
    newCard.addEventListener('click', handleCardClick);
    //append card to container
    newContainer.append(newCard);
    //append the container to the gameBoard
    gameBoard.append(newContainer);
  }
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

let card1 = undefined;
let card2 = undefined;
let timeoutID;
 
function handleCardClick(evt) {
    //clears a previous setTimeout upon click event -- prevents setTimeout from stacking
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
    clearTimeout(timeoutID);
    clickCounter();
    //the event target is the card__back, which is a child of the card
    const card = evt.target.parentElement;
    const cardBack = evt.target;
    const cardFront = evt.target.previousElementSibling;
    //if card1 or card2 are undefined
    if (card1 === undefined || card2 === undefined) {
      //if the card is not flipped
      if (!card.classList.contains('flipped')) {
        //flip the card
        flipCard(cardBack);
        //store the card's front as card1 or card2
        storeCard(cardFront);
      }
    }
    //if card1 and card2 have been selected
    if (card1 !== undefined && card2 !== undefined) {
      //check if cards match
      if (cardsMatch(card1, card2)) {
        //if so, leave face up
        //reset card1 and card2 to be undefined;
        card1 = undefined;
        card2 = undefined;
      } else {
        //wait 1 second
        timeoutID = setTimeout(() => {
          //unflip card1 and card2
          console.log(card1.parentElement, card2.parentElement);
          unFlipCard(card1);
          unFlipCard(card2);
          //reset card1 and card2 to be undefined;
          card1 = undefined;
          card2 = undefined;
        }, 1000);          
      }
    }
}

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
  //if classNames of card1 and card2 match
  if (card1.className === card2.className) {
    console.log('match found!');
    //mark the cards as matched
    card1.parentElement.classList.add("match");
    card2.parentElement.classList.add("match");
    return true;
  } 
}

/** Increment the count of clicks with each click. */

let clickCount = 0;

function clickCounter() {
  const clickCounter = document.querySelector('main > h2');
  clickCount++;  
  clickCounter.innerText = 'Clicks: ' + clickCount;
  return clickCount;
}