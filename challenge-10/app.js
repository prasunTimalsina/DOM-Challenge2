///elements
const gameContainer = document.querySelector(".game-container");
const movesEl = document.getElementById("moves");
const timeEl = document.getElementById("time");
let timerId;
//variables
const state = {
  moves: 0,
  emojies: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  shuffledArray: [],
  totalSeconds: 0,
  currentSelectedEmojies: [],
};

//shuffling algo

// function
const shuffleArray = () => {
  state.shuffledArray.length = 0;
  for (let i = 0; i < 8; i++) {
    let emoji = state.emojies[i];
    for (let i = 0; i < 2; i++) {
      let emojiPlaced = false;
      while (!emojiPlaced) {
        const randomCell = Math.floor(Math.random() * 16);
        if (!state.shuffledArray[randomCell]) {
          state.shuffledArray[randomCell] = emoji;
          emojiPlaced = true;
        }
      }
    }
  }
};

//timer function
const initTimer = () => {
  timerId = setInterval(() => {
    state.totalSeconds++;

    let formatedMin = String(Math.floor(state.totalSeconds / 60)).padStart(
      2,
      "0"
    );
    let formatedSecond = String(state.totalSeconds % 60).padStart(2, "0");

    timeEl.textContent = `${formatedMin}:${formatedSecond}`;
  }, 1000);
};

const clearTimer = () => {
  clearInterval(timerId);
  timeEl.textContent = "0:00";
};

//dom events
const shuffleGrid = () => {
  gameContainer.textContent = "";

  state.shuffledArray.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const insideCard = document.createElement("div");
    insideCard.classList.add("card-front");
    insideCard.textContent = "?";
    card.appendChild(insideCard);
    gameContainer.appendChild(card);

    card.addEventListener("click", () => {
      flipCard(card, index);
      if (state.currentSelectedEmojies.length < 2) {
        // condition for user to prevent from double click
        if (state.currentSelectedEmojies.length > 0) {
          if (state.currentSelectedEmojies[0].index !== index) {
            state.currentSelectedEmojies.push({ index, card });
          }
        } else {
          state.currentSelectedEmojies.push({ index, card });
        }
      }
      if (state.currentSelectedEmojies.length === 2) {
        playMove(state.currentSelectedEmojies);
      }
    });
  });
};

//UI related stuffs
const flipCard = (target, indexOfEmoji) => {
  target.classList.add("flipped");
  const insideCard = target.querySelector(".card-front");
  if (!insideCard) return;
  insideCard.classList.remove("card-front");
  insideCard.classList.add("card-back");
  insideCard.textContent = state.shuffledArray[indexOfEmoji];
};

const removeFlip = (target) => {
  target.classList.remove("flipped");
  const insideCard = target.querySelector(".card-back");
  insideCard.classList.remove("card-back");
  insideCard.classList.add("card-front");
  insideCard.textContent = "?";
};

const updateMove = () => {
  state.moves++;
  movesEl.textContent = state.moves;
};

//playMove
const playMove = () => {
  const cell1 = state.currentSelectedEmojies[0].card;
  const cell2 = state.currentSelectedEmojies[1].card;

  const index1 = state.currentSelectedEmojies[0].index;
  const index2 = state.currentSelectedEmojies[1].index;

  const emoji1 = state.shuffledArray[index1];
  const emoji2 = state.shuffledArray[index2];
  if (emoji1 === emoji2) {
    console.log("matched");
    const index = state.emojies.indexOf(emoji1);
    state.emojies.splice(index, 1);

    updateMove();
    state.currentSelectedEmojies.length = 0;
    if (state.emojies.length <= 0) {
      setTimeout(() => {
        alert("You won:🎉🎉: Click ok for New Game");
        restartGame();
      }, 500);
    }
  } else {
    updateMove();
    setTimeout(() => {
      removeFlip(cell1);
      removeFlip(cell2);
    }, 500);
    state.currentSelectedEmojies.length = 0;
    console.log("didn't matched");
  }
};

const restartGame = () => {
  state.emojies = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
  state.totalSeconds = 0;
  state.moves = 0;
  state.currentSelectedEmojies = [];
  state.shuffledArray = [];
  movesEl.textContent = 0;
  init();
  clearTimer();
};

const init = () => {
  shuffleArray();
  shuffleGrid();
  initTimer();
};

init();
