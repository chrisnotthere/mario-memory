import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/index.css';
import { Card, setGameDeck } from './features/memoryGame/gameSlice';

const container = document.getElementById('root')!;
const root = createRoot(container);

// expose a function to set the game deck, for cypress testing
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_CYPRESS_ENV) {
  (window as any).setMockGameDeck = (mockGameDeck: Card[]) => {
    store.dispatch(setGameDeck(mockGameDeck));
  };
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
