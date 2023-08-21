import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  incrementTimer,
  resetTimer,
  resetController,
  setGameFinished,
  resetMoves,
  incrementMoves,
  selectScore,
  setTimeLimitReached,
} from "../../features/controller/controllerSlice";
import {
  selectIsGameFinished,
  newGame,
  matchAllCards,
  difficultyLevels,
  DifficultyLevel,
  setDifficulty,
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
  const score = useAppSelector(selectScore);
  const difficulty = useAppSelector(
    (state) => state.game.difficulty
  ) as DifficultyLevel;
  const timeLimitReached = useAppSelector((state) => state.controller.timeLimitReached);

  const difficultyIcons: Record<DifficultyLevel, string> = {
    easy: "Star.png",
    medium: "1UP.png",
    hard: "Bullet.png",
  };

  const difficultyTimeLimits: Record<DifficultyLevel, number | null> = {
    easy: null, // No time limit
    medium: 55, // 55 seconds
    hard: 65, // 65 seconds
  };

  const timeLimit = difficultyTimeLimits[difficulty];

  // start and stop game timer
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
  
    if (gameStarted && !gameFinished && !timeLimitReached) {
      timerId = setInterval(() => {
        // Check if the time limit has been reached
        if (timeLimit !== null && gameTimer >= timeLimit) {
          clearInterval(timerId);
          dispatch(setTimeLimitReached(true)); // Set timeLimitReached to true
          dispatch(setGameFinished(true)); // End the game
          return;
        }
  
        dispatch(incrementTimer());
      }, 1000);
    }
  
    // Cleanup function to clear the timer
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted, gameTimer, gameFinished, timeLimitReached, timeLimit, dispatch]);

  // reset game
  const handleReset = () => {
    dispatch(resetController());
    dispatch(setTimeLimitReached(false));
    dispatch(newGame());
  };

  // simulate end game for testing purposes, will delete later
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

  // toggle difficulty setting
  const handleDifficultyToggle = () => {
    // Get the index of the next difficulty level
    const nextIndex =
      (difficultyLevels.indexOf(difficulty) + 1) % difficultyLevels.length;
    dispatch(setDifficulty(difficultyLevels[nextIndex])); // Set the new difficulty
    handleReset(); // Reset the game
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

  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button" onClick={handleReset}>
          Reset
        </button>
        {/* <button className="controller-button" onClick={mockEndGame}>
          end game
        </button> */}
        <div className="difficulty-container">
          <button
            className="controller-button difficulty-button"
            onClick={handleDifficultyToggle}
          >
            {difficulty}
          </button>
          <div className="difficulty-icon-container">
            <img
              className="difficulty-icon"
              src={`${process.env.PUBLIC_URL}/assets/images/${difficultyIcons[difficulty]}`}
              alt="Block Card"
            />{" "}
          </div>
        </div>
      </div>
      {gameFinished && <div className="message">🥳 Congratulations! 🍾</div>}
      <div className="stats-container">
        <div className="timer">
          time
          {timeLimit
            ? ` remaining: ${timeLimit - gameTimer}`
            : `: ${gameTimer} seconds`}
        </div>
        <div className="move-counter">{movesTaken} moves</div>
        <div className="timer">score: {score}</div>
      </div>
    </div>
  );
}

export default Controller;
