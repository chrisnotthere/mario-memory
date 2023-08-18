import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  incrementTimer,
  resetTimer,
  resetController,
  setGameFinished,
  resetMoves,
  incrementMoves,
} from "../../features/controller/controllerSlice";
import {
  selectIsGameFinished,
  newGame,
  matchAllCards,
} from "../../features/memoryGame/gameSlice";
import { useAppSelector } from "../../app/hooks";
import "./controller.css";

function Controller() {
  const dispatch = useDispatch();
  // redux selectors to get current state
  const movesTaken = useAppSelector((state) => state.controller.movesTaken);
  const gameTimer = useAppSelector((state) => state.controller.gameTimer);
  const gameStarted = useAppSelector((state) => state.controller.gameStarted);
  const gameFinished = useAppSelector(selectIsGameFinished);

  // start and stop game timer
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    // Start the timer only if gameStarted is true and gameFinished is false
    if (gameStarted && !gameFinished) {
      timerId = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    } else {
      // Stop the timer if the game isn't started or is finished
      clearInterval(timerId);
      if (!gameStarted) {
        dispatch(resetTimer());
      }
    }
    // Cleanup function that stops the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [gameStarted, gameFinished, dispatch]);

  // reset game
  const handleReset = () => {
    dispatch(resetController());
    dispatch(newGame());
  };

  // simulate end game for testing purposes
  const mockEndGame = () => {
    // Set all cards as matched
    dispatch(matchAllCards());
  
    // Set gameFinished to true
    dispatch(setGameFinished(true));
  
    // Reset moves and then increment randomly between 10 to 25 times to set movesTaken
    const randomMoves = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
    dispatch(resetMoves());
    for (let i = 0; i < randomMoves; i++) {
      dispatch(incrementMoves());
    }
  
    // Reset the timer and then increment randomly between 10 to 60 seconds to set gameTimer
    const randomTime = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
    dispatch(resetTimer());
    for (let i = 0; i < randomTime; i++) {
      dispatch(incrementTimer());
    }
  };

  // set gameFinished to true when all cards are matched
  // log game stats to console
  useEffect(() => {
    if (gameFinished) {
      dispatch(setGameFinished(true));
      console.log("Game Finished!");
      console.log("here are your stats:");
      console.log(`moves taken: ${movesTaken}`);
      console.log(`time taken: ${gameTimer}`);
    }
  }, [gameFinished, dispatch]);

  // send game data to server
  const sendGameData = (movesTaken: number, gameTimer: number) => {
    const gameData = {
      name: "Player 1",
      moves: movesTaken,
      time: gameTimer,
    };

    fetch("http://localhost:3001/high-scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game data sent successfully:", data);
      })
      .catch((error) => {
        console.error("Error sending game data:", error);
      });
  };

  useEffect(() => {
    if (gameFinished) {
      sendGameData(movesTaken, gameTimer);
    }
  }, [gameFinished]);

  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button" onClick={handleReset}>
          Reset
        </button>
        <button className="controller-button" onClick={mockEndGame}>
          end game
        </button>
      </div>
      {gameFinished && <div className="message">🥳 Congratulations! 🍾</div>}
      <div className="stats-container">
        <div className="move-counter">{movesTaken} moves</div>
        <div className="timer">time: {gameTimer} seconds</div>
      </div>
    </div>
  );
}

export default Controller;
