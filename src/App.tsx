import Controller from "./components/Controller/Controller";
import { MemoryGame } from "./components/MemoryGame/MemoryGame";
import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <Controller />
      <MemoryGame />
    </div>
  );
}

export default App;
