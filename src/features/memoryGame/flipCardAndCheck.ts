import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { gameSlice, Card } from './gameSlice';
import { controllerSlice, setGameStarted } from '../controller/controllerSlice';

// Thunks are used to handle async logic in Redux.
// flipCardAndCheck handles the logic of flipping a card and checking if it matches another card.
export const flipCardAndCheck = createAsyncThunk<Card[], void, { state: RootState }>(  // the generic parameters are: returned result type, argument type, thunkAPI argument fields type
  'game/flipCardAndCheck', 
  async (_, thunkAPI) => {
    const { game } = thunkAPI.getState();  // get the current state of the game from the Redux store

    // if game has not started, set gameStarted to true
    if (!thunkAPI.getState().controller.gameStarted) {
      thunkAPI.dispatch(setGameStarted(true));
    }

    // Check if there is a card that is about to be flipped
    if (game.pendingFlip !== null) {
      // Find the card in the deck that matches the pending flip
      const cardToFlip = game.gameDeck.find(card => card.id === game.pendingFlip);

      // Check if the card to flip exists
      if (cardToFlip) {
        // Create a new array of flipped cards, adding the new card to flip
        const newFlippedCards = [...game.flippedCards, cardToFlip];

        // Check if there are two flipped cards
        if (newFlippedCards.length === 2) {

          // Increment the number of moves taken
          thunkAPI.dispatch(controllerSlice.actions.incrementMoves());

          // Get the two flipped cards
          const [firstCard, secondCard] = newFlippedCards;

          // Check if the two cards match
          if (firstCard.image === secondCard.image) {
            // If the cards match, dispatch an action to set the two cards as matched
            thunkAPI.dispatch(gameSlice.actions.matchCards([firstCard.id, secondCard.id]));
          } else {
            // If the cards do not match, dispatch an action to unflip the cards after a delay
            setTimeout(() => {
              thunkAPI.dispatch(gameSlice.actions.unflipCards([firstCard.id, secondCard.id]));
            }, 500);
          }

          // Dispatch an action to clear the array of flipped cards
          thunkAPI.dispatch(gameSlice.actions.clearFlippedCards());
        } else {
          // If there is only one flipped card, dispatch an action to add the card to the array of flipped cards
          thunkAPI.dispatch(gameSlice.actions.addFlippedCard(cardToFlip));
        }
      }

      // Dispatch an action to clear the card that is about to be flipped
      thunkAPI.dispatch(gameSlice.actions.setPendingFlip(null));
    }

    // Return the current state of flipped cards, which will be included in the fulfilled action as its payload
    return game.flippedCards;
  },
);
