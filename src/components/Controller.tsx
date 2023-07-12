import "../styles/controller.css";

function Controller() {
  return (
    <div className="controller">
      <div className="button-container">
        <button className="controller-button">Start</button>
        <button className="controller-button">Reset</button>
      </div>
      <div className="stats-container">
        <div className="move-counter">0 moves</div>
        <div className="timer">time: 0 seconds</div>
      </div>
    </div>
  );
}

export default Controller;
