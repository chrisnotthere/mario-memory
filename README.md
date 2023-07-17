# Mario Memory Game

This is a memory card flip game designed to provide a hands-on learning experience using Redux and TypeScript with React. The game's logic and state is managed using Redux, and the entire application is written in TypeScript.

[View it live](https://chrisnotthere.github.io/mario-memory/)

## Learning Objectives

The main learning objectives of this project are:

1. **Redux**: Gain an understanding of managing and manipulating state using Redux and its toolkit.

2. **TypeScript**: Develop proficiency in writing React applications in TypeScript and appreciate the benefits of a statically typed language.

## State Controlled by Redux

The Redux state in this memory card game is divided into two slices: "game" and "controller".

### Game State (gameSlice.ts)

The "game" slice controls the following state properties:

- `fullDeck`: An array of all the cards in the game.
- `gameDeck`: An array of cards currently in play.
- `flippedCards`: An array of the currently flipped cards.
- `pendingFlip`: ID of the card clicked but not yet processed.
- `lastFlippedCard`: ID of the last flipped card.

### Controller State (controllerSlice.ts)

The "controller" slice controls the following state properties:

- `gameStarted`: Indicates whether the game has started.
- `gameFinished`: Indicates whether the game has finished.
- `gameTimer`: The game timer in seconds.
- `movesTaken`: The total number of moves taken in the game.

## Flip Card and Check Function

The `flipCardAndCheck` function is a Redux thunk that handles the logic of flipping a card and checking if it matches another card. This function is responsible for managing the game flow and dispatching actions based on the card flipping and matching logic.

The `flipCardAndCheck` thunk is used asynchronously to handle the game's logic and update the Redux state accordingly. It checks if a card is flipped, compares it with the previously flipped card, and dispatches appropriate actions based on the match or mismatch outcome.

This function also takes care of tracking game progress, such as starting the game, incrementing moves, and updating the game timer. It utilizes actions from both the `gameSlice` and `controllerSlice` to update the relevant state properties.

## Future Plans

In the future, the following enhancements are planned for this project:

- Incorporate a database to store high scores, stats, and other game data.
- Add an 'extreme' difficulty setting for an added challenge.
- Implement a testing framework for unit and/or end-to-end testing.
