///elements
const gameContainer = document.querySelector(".game-container");

//variables
const state = {
  moves: 0,
  emojies: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  shuffledArray: [],
  timer: null,
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

const shuffleGrid = () => {
  state.shuffledArray.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const insideCard = document.createElement("div");
    insideCard.classList.add("card-front");
    insideCard.textContent = "?";
    card.appendChild(insideCard);
    gameContainer.appendChild(card);

    card.addEventListener("click", () => {
      card.classList.add("flipped");
      insideCard.classList.remove("card-front");
      insideCard.classList.add("card-back");
      insideCard.textContent = state.shuffledArray[index];
    });
  });
};

//playMove
const playMove = (index1, index2) => {
  /* const index1 = prompt("Choose a index");
  const index2 = prompt("Choose another index"); */
  const emoji1 = state.shuffledArray[index1];
  const emoji2 = state.shuffledArray[index2];
  if (emoji1 === emoji2) {
    console.log("matched");
    const index = state.emojies.indexOf(emoji1);
    state.emojies.splice(index, 1);
    console.log(state);
    state.moves++;
    if (state.emojies.length <= 0) {
      console.log("you won");
    } else {
      playMove();
    }
  } else {
    console.log("didn't matched");
    playMove();
    state.moves++;
  }
};

const init = () => {
  shuffleArray();
  console.log(state.shuffledArray);
  shuffleGrid();
  /* playMove(); */
};

init();
