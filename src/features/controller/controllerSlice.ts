import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControllerState {
  gameStarted: boolean;
  gameTimer: number;
  movesTaken: number;
}

const initialState: ControllerState = {
  gameStarted: false,
  gameTimer: 0,
  movesTaken: 0,
};

export const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setGameStarted: (state, action: PayloadAction<boolean>) => {
      state.gameStarted = action.payload;
    },
    setGameTimer: (state, action: PayloadAction<number>) => {
      state.gameTimer = action.payload;
    },
    incrementGameTimer: (state) => {
      state.gameTimer += 1;
    },
    incrementMoves: (state) => {
      state.movesTaken += 1;
    },
    resetMoves: (state) => {
      state.movesTaken = 0;
    },
    resetController: (state) => {
      state.gameStarted = false;
      state.gameTimer = 0;
    },
  },
});

export const {
  setGameStarted,
  setGameTimer,
  incrementGameTimer,
  incrementMoves,
  resetMoves,
  resetController,
} = controllerSlice.actions;

export default controllerSlice.reducer;
