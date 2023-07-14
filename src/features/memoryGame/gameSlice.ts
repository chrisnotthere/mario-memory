import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shuffleCards } from './helpers/shuffleCards';
import { RootState } from '../../app/store';

export interface Card {
  id: number;
  image: string;
  name: string;
  facedUp: boolean;
  matched: boolean;
}

interface GameState {
  fullDeck: Card[]; // all cards
  gameDeck: Card[]; // cards in play
  flippedCards: Card[]; // currently flipped cards
  pendingFlip: number | null; // id of card clicked but not processed yet
  lastFlippedCard: number | null; // id of last card flipped
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

// array of all cards
const fullDeck: Card[] = imageNames.map((imageName, i) => ({
  id: i,
  image: `assets/images/${imageName}`,
  name: imageName.split('.')[0],
  facedUp: false,
  matched: false,
}));

const initialState: GameState = {
  fullDeck,
  gameDeck: shuffleCards([...fullDeck], 6),
  flippedCards: [],
  pendingFlip: null,
  lastFlippedCard: null,
};

// a selector to check if every card in the game deck is matched
export const selectIsGameFinished = (state: RootState) => {
  return state.game.gameDeck.every((card) => card.matched);
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    newGame: (state) => {
      state.gameDeck = shuffleCards([...fullDeck], 6);
      state.flippedCards = [];
    },
    flipCard: (state, action: PayloadAction<number>) => {
      const card = state.gameDeck.find(card => card.id === action.payload);
      if (card) card.facedUp = !card.facedUp;
    },
    addFlippedCard: (state, action: PayloadAction<Card>) => {
      // only add card to flippedCards if it is not already there
      if (!state.flippedCards.some(card => card.id === action.payload.id)) {
        state.flippedCards.push(action.payload);
      }
    },
    setLastFlippedCard: (state, action: PayloadAction<number | null>) => {
      state.lastFlippedCard = action.payload;
    },
    clearFlippedCards: (state) => {
      state.flippedCards = [];
    },
    setPendingFlip: (state, action: PayloadAction<number | null>) => {
      const card = state.gameDeck.find(card => card.id === action.payload);
      if (card) card.facedUp = true;
      state.pendingFlip = action.payload;
    },
    matchCards: (state, action: PayloadAction<number[]>) => {
      state.gameDeck = state.gameDeck.map(card => 
        action.payload.includes(card.id) 
          ? {...card, matched: true} 
          : card
      );
    },
    unflipCards: (state, action: PayloadAction<number[]>) => {
      state.gameDeck = state.gameDeck.map(card => 
        action.payload.includes(card.id) 
          ? {...card, facedUp: false} 
          : card
      );
    },
  },
});

export const { setPendingFlip, newGame } = gameSlice.actions;

export default gameSlice.reducer;
