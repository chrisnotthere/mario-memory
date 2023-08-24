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
  difficulty: DifficultyLevel[0]; // initial difficulty level 'easy'
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export const difficultyLevels: DifficultyLevel[] = ['easy', 'medium', 'hard'];
export const difficultyPairs: Record<DifficultyLevel, number> = {
  easy: 6,
  medium: 8,
  hard: 10,
};

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
  image: `${process.env.REACT_APP_PUBLIC_URL}/assets/images/${imageName}`,
  name: imageName.split('.')[0],
  facedUp: false,
  matched: false,
}));

const initialState: GameState = {
  fullDeck,
  // gameDeck contains x pairs of cards, for example easy difficulty has 6 pairs
  gameDeck: shuffleCards([...fullDeck], difficultyPairs['easy']),
  flippedCards: [],
  pendingFlip: null,
  lastFlippedCard: null,
  difficulty: 'easy',
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
       // Get number of pairs based on difficulty level
      const numberOfPairs = difficultyPairs[state.difficulty as DifficultyLevel];
      state.gameDeck = shuffleCards([...fullDeck], numberOfPairs);
      state.flippedCards = [];
    },
    setDifficulty: (state, action: PayloadAction<DifficultyLevel>) => {
      state.difficulty = action.payload;
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
    // manually set the game deck, for testing purposes
    setGameDeck: (state, action: PayloadAction<Card[]>) => {
      state.gameDeck = action.payload;
    },
  },
});

export const { setPendingFlip, newGame, matchAllCards, setDifficulty, setGameDeck } = gameSlice.actions;

export default gameSlice.reducer;
