import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameReducer from '../features/memoryGame/gameSlice';
import controllerReducer from '../features/controller/controllerSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    controller: controllerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
