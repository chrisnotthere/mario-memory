import { useAppSelector } from "./app/hooks";
import Controller from "./components/Controller/Controller";
import { MemoryGame } from "./components/MemoryGame/MemoryGame";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import "./styles/app.css";

function App() {
  const gameFinished = useAppSelector((state) => state.controller.gameFinished);

  return (
    <div className="app">
      <Controller />
      <MemoryGame />
      {gameFinished && <Scoreboard />}
    </div>
  );
}

export default App;
