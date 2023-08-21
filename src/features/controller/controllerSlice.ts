import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ControllerState {
  gameStarted: boolean;
  gameFinished: boolean;
  gameTimer: number;
  movesTaken: number;
  timeLimitReached: boolean;
}

const initialState: ControllerState = {
  gameStarted: false,
  gameFinished: false,
  gameTimer: 0,
  movesTaken: 0,
  timeLimitReached: false,
};

export const selectScore = (state: RootState) => {
  const movesTaken = state.controller.movesTaken;
  const gameTimer = state.controller.gameTimer;

  // scoring algorithm
  const score = 1500000 - (movesTaken * 16502 + gameTimer * 7257);

  // score doesn't go negative
  return Math.max(score, 0); 
};

export const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setGameStarted: (state, action: PayloadAction<boolean>) => {
      state.gameStarted = action.payload;
    },
    setGameFinished: (state, action: PayloadAction<boolean>) => {
      state.gameFinished = action.payload;
    },
    incrementMoves: (state) => {
      state.movesTaken += 1;
    },
    resetMoves: (state) => {
      state.movesTaken = 0;
    },
    incrementTimer: (state) => {
      state.gameTimer += 1;
    },
    resetTimer: (state) => {
      state.gameTimer = 0;
    },
    resetController: (state) => {
      state.gameStarted = false;
      state.gameFinished = false;
      state.gameTimer = 0;
      state.movesTaken = 0;
    },
    setTimeLimitReached: (state, action: PayloadAction<boolean>) => {
      state.timeLimitReached = action.payload;
    },
  },
});

export const {
  setGameStarted,
  setGameFinished,
  incrementMoves,
  resetMoves,
  incrementTimer,
  resetTimer,
  resetController,
  setTimeLimitReached,
} = controllerSlice.actions;

export default controllerSlice.reducer;
