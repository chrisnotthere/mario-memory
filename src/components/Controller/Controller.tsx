import "./controller.css";
import { useAppSelector } from "../../app/hooks"; // Adjust the import path based on your directory structure

function Controller() {
  const movesTaken = useAppSelector((state) => state.controller.movesTaken); 

  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button">Start</button>
        <button className="controller-button">Reset</button>
      </div>
      <div className="stats-container">
        <div className="move-counter">{movesTaken} moves</div>
        <div className="timer">time: 0 seconds</div>
      </div>
    </div>
  );
}

export default Controller;
