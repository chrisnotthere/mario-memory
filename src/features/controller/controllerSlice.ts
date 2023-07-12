import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControllerState {
  gameStarted: boolean;
  gameTimer: number;
}

const initialState: ControllerState = {
  gameStarted: false,
  gameTimer: 0,
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
  resetController,
} = controllerSlice.actions;

export default controllerSlice.reducer;
