import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementTimer, resetTimer, resetController } from "../../features/controller/controllerSlice";
import { newGame } from "../../features/memoryGame/gameSlice";
import { useAppSelector } from "../../app/hooks";
import "./controller.css";

function Controller() {
  const dispatch = useDispatch();
  // redux selectors to get current state
  const movesTaken = useAppSelector((state) => state.controller.movesTaken);
  const gameTimer = useAppSelector((state) => state.controller.gameTimer);
  const gameStarted = useAppSelector((state) => state.controller.gameStarted);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (gameStarted) {
      // If the game is started, we create an interval that dispatches the incrementTimer action every second
      timerId = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    } else {
      // If the game is not started, we clear the interval and reset the timer
      clearInterval(timerId);
      dispatch(resetTimer());
    }
    // Cleanup function that stops the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [gameStarted, dispatch]);

  // reset game
  const handleReset = () => {
    dispatch(resetController());
    dispatch(newGame());
  }
  
  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="stats-container">
        <div className="move-counter">{movesTaken} moves</div>
        <div className="timer">time: {gameTimer} seconds</div>
      </div>
    </div>
  );
}

export default Controller;
