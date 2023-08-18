import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shuffleCards } from './helpers/shuffleCards';
import { RootState } from '../../app/store';
import { imageNames } from './helpers/imageNames';

interface GameState {
  fullDeck: Card[]; // all cards
  gameDeck: Card[]; // cards in play
  flippedCards: Card[]; // currently flipped cards
  pendingFlip: number | null; // id of card clicked but not processed yet
  lastFlippedCard: number | null; // id of last card flipped
}

export interface Card {
  id: number;
  image: string;
  name: string;
  facedUp: boolean;
  matched: boolean;
}

// array of all cards
const fullDeck: Card[] = imageNames.map((imageName, i) => ({
  id: i,
  image: `${process.env.PUBLIC_URL}/assets/images/${imageName}`,
  name: imageName.split('.')[0],
  facedUp: false,
  matched: false,
}));

const initialState: GameState = {
  fullDeck,
  // gameDeck contains 6 pairs of cards, 12 cards total
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
    // set all cards in game deck to matched, for testing purposes
    matchAllCards: (state) => {
      state.gameDeck = state.gameDeck.map((card) => ({
        ...card,
        matched: true,
      }));
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

export const { setPendingFlip, newGame, matchAllCards } = gameSlice.actions;

export default gameSlice.reducer;
