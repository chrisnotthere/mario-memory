# Mario Memory Game

This is a memory card flip game designed to provide a hands-on learning experience using Redux, React, Typescript, MongoDB, and Express. The game's logic and state are managed using Redux, and the entire application is written in TypeScript. It features three difficulty levels, a highscore leaderboard, end-to-end testing with Cypress, and a mobile-friendly design.

[View it live](https://chrisnotthere.github.io/mario-memory/)

## Learning Objectives

The main learning objectives of this project are:

1. **Redux**: Gain an understanding of managing and manipulating state using Redux Toolkit.

2. **TypeScript**: Develop proficiency in writing React applications in TypeScript and appreciate the benefits of a statically typed language.

3. **MongoDB**: Manage game data using a MongoDB database.

4. **Express**: Implement a simple server using Express hosted on Heroku to read the database and create new high scores.

5. **Cypress**: Develop skills in writing and implementing end-to-end tests using Cypress.


## Features

- **Difficulty Settings**: Players can choose between easy, medium, and hard difficulty levels. Medium and hard difficulties come with time limits, and the number of cards increases for each level.

- **Leaderboard**: Track and display high scores with player names. Scores can be viewed as 'weekly' or 'all-time.'

- **Mobile-Friendly**: Designed to be responsive and compatible with mobile devices.


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

## Backend Server

The game includes a backend server using Express hosted on Heroku. It reads from a MongoDB database to retrieve high scores and allows for the creation of new high scores.

## End-to-End Testing

End-to-end testing has been conducted using Cypress to validate various aspects of the game. The tests are divided into the following categories:

 - Game Initialization: Ensure that the game loads with necessary controls (like timer and move counter).

 - Card Interactions: Examine functionalities like card flipping, matching, non-matching behaviors, and game resetting.

 - Difficulty Levels: Verify the selection of different difficulty levels, which affects the number of cards and time limits.

 - Winning Scenario: Confirm the winning conditions, display congratulatory message, and present the correct number of moves.

 - Score Calculation: Validate the correct calculation of scores based on the moves, remaining time, and selected difficulty.
