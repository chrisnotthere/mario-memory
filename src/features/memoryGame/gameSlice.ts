import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: number;
  image: string;
  name: string;
  facedUp: boolean;
}

interface GameState {
  fullDeck: Card[]; // all cards
  gameDeck: Card[]; // cards in play
}

const imageNames = [
  "Bowser.png", 
  "Daisy.png", 
  "Donkey Kong.png", 
  "Iggy.png", 
  "Koopa Troopa.png", 
  "Lakitu.png", 
  "Lemmy.png", 
  "Link.png", 
  "Luigi.png", 
  "Ludwig.png", 
  "Mario.png", 
  "Morton.png", 
  "Peach.png", 
  "Roy.png", 
  "Shy Guy.png", 
  "Toad.png", 
  "Waluigi.png", 
  "Wario.png", 
  "Wendy.png", 
  "Yoshi.png"
];

// helper function to shuffle cards
function shuffleArray(array: Card[], numItems?: number): Card[] {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // If numItems is provided, return the specified number of items.
  if (numItems) {
    return array.slice(0, numItems);
  }

  // Otherwise, return the whole array.
  return array;
}

// array of all cards
const fullDeck: Card[] = imageNames.map((imageName, i) => ({
  id: i,
  image: `assets/images/${imageName}`,
  name: imageName.split('.')[0],
  facedUp: false
}));

const initialState: GameState = {
  fullDeck,
  gameDeck: shuffleArray([...fullDeck], 9),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    flipCard: (state, action: PayloadAction<number>) => {
      const card = state.gameDeck.find(card => card.id === action.payload);
      if (card) card.facedUp = !card.facedUp;
    },
    newGame: (state) => {
      state.gameDeck = shuffleArray([...fullDeck], 9);
    },
  },
});

export const { flipCard } = gameSlice.actions;

export default gameSlice.reducer;
