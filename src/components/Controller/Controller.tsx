import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementTimer, resetTimer, resetController, setGameFinished } from "../../features/controller/controllerSlice";
import { selectIsGameFinished, newGame } from "../../features/memoryGame/gameSlice";
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
  }

  // set gameFinished to true when all cards are matched
  useEffect(() => {
    if (gameFinished) {
      dispatch(setGameFinished(true));
    }
  }, [gameFinished, dispatch]);
  
  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="stats-container">
        <div className="move-counter">{movesTaken} moves</div>
        <div className="timer">time: {gameTimer} seconds</div>
        {gameFinished && <div className="game-finished">Game Finished!</div>}
      </div>
    </div>
  );
}

export default Controller;
