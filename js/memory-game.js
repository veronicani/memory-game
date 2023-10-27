"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

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
    //create a div element (card) for the color
    const newCard = document.createElement('div');
    //add a class with the value of the color -- style the class in the CSS
    newCard.classList.add("card");
    newCard.classList.add(color);
    //add a click event listener to the card to handleCardClick
    newCard.addEventListener('click', handleCardClick2);
    //append the card element to the gameBoard
    gameBoard.append(newCard);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  //toggle the class "flipped" on the card so it is TRUE
  card.classList.add("flipped");
  //if it has the class "flipped", it will show the front of the card
}

/** Flip a card face-down. */

function unFlipCard(card) {
  //toggle the class "flipped" on the card so it is FALSE
  card.classList.remove("flipped");
  //if it does not have the "flipped" class, it will show the back of the card

}

/** Handle clicking on a card: this could be first-card or second-card. */

// //declare card1
// let card1;
// //declare card2
// let card2;

// function handleCardClick(evt) {
//   //if card1 or card2 is undefined
//   if (card1 === undefined || card2 === undefined) {
//     //if the card is not already flipped
//     if (!evt.target.classList.contains('flipped')) {
//       //flip the card
//       flipCard(evt.target);
//       //if card1 is undefined
//       if (card1 === undefined) {
//         //assign the event target to be card1
//         card1 = evt.target;
//         console.log(card1);
//       }
//       //else
//       else {
//         //assign the event target to be card2
//         card2 = evt.target;
//         console.log(card2);
//       }
//       console.log("card1: ", card1, "card2: ", card2);
//     }
//   }
//   //if card1 and card2 are defined
//   if (card1 !== undefined && card2 !== undefined) {
//     //compare cards - if equal
//     if (cardsMatch(card1, card2)) {
//       //leave them flipped
//       //reassign card1 and card2 to be undefined after 1 sec
//       setTimeout(() => {
//         card1 = undefined;
//         card2 = undefined;
//         console.log("cards reset")
//       }, 1000);
//     } else {
//       //wait 1 second
//       setTimeout(() => {
//         //unflip both cards 
//         unFlipCard(card1);
//         unFlipCard(card2);  
//         //reassign card1 and card2 to be undefined
//         card1 = undefined;
//         card2 = undefined;
//         console.log("cards reset")
//       }, 1000); 
//     }
//   }
// }

// function cardsMatch(card1, card2) {
//     console.log(card1.classList, card2.classList);
//     //if the cards are the same object
//     if (card1 === card2) {
//       //log 'same card!'
//       console.log('error: same card!');
//       //return false;
//       return false;
//     //else
//     } else {
//       //iterate over card1's classList
//       for (let i = 0; i < card1.classList.length; i++) {
//         //if the current class of card1.classList is not equal to the class at the same index of card2.classList
//         console.log(card1.classList[i], card2.classList[i]);
//         if (card1.classList[i] !== card2.classList[i]) {
//           //log 'no match!'
//           console.log('no match!');
//           //return false;
//           return false;
//         }
//       }
//       console.log('match found!')
//       //return true;
//       return true;
//     }
//   }

  //store count
  let count = 0;
  let card1 = undefined;
  let card2 = undefined;
  let timeoutID;
 
  function handleCardClick2(evt) {
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
    //if the count is less than 2
    if (count < 2) {
      //if the card is not flipped
      if (!evt.target.classList.contains('flipped')) {
        //flip the card
        flipCard(evt.target);
        //store the card as card1 or card2
        storeCard(evt.target);
        //increment the count;
        count++;
      }
    }
    console.log(count);
    console.log(card1, card2); 

    //if card1 and card2 have been selected
    if (card1 !== undefined && card2 !== undefined) {
      //check if cards match
      if (cardsMatch(card1, card2)) {
        //if so, wait 1 second
        timeoutID = setTimeout(() => {
          //reset count to 0;
          count = 0;
          //reset card1 and card2 to be undefined;
          card1 = undefined;
          card2 = undefined;
        }, 1000);
      } else {
        //wait 1 second
        timeoutID = setTimeout(() => {
          //unflip card1 and card2
          unFlipCard(card1);
          unFlipCard(card2);
          //reset count to 0;
          count = 0;
          //reset card1 and card2 to be undefined;
          card1 = undefined;
          card2 = undefined;
        }, 1000);          
      }
    }
  }

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

  function cardsMatch(card1, card2) {
    //if the cards are the same object
    if (card1 === card2) {
      //log 'same card!'
      console.log('error: same card!');
      //return false;
      return false;
    //else
    } else {
      console.log(card1.className, card2.className);
      //check if classNames of card1 and card2 mach
      if (card1.className === card2.className) {
        console.log('match found!');
        return true;
      } 
    }
  }