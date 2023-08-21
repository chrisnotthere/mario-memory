import { useAppSelector } from "./app/hooks";
import Controller from "./components/Controller/Controller";
import { MemoryGame } from "./components/MemoryGame/MemoryGame";
import OutOfTimeModal from "./components/OutOfTime/OutOfTime";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import "./styles/app.css";

function App() {
  const gameFinished = useAppSelector((state) => state.controller.gameFinished);
  const timeLimitReached = useAppSelector((state) => state.controller.timeLimitReached); // Ensure this selector is defined

  return (
    <div className="app">
      <Controller />
      <MemoryGame />
      {gameFinished && timeLimitReached && <OutOfTimeModal />}
      {gameFinished && !timeLimitReached && <Scoreboard />}
    </div>
  );
}

export default App;
