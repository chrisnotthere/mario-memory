import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectScore } from "../../features/controller/controllerSlice";
import "./scoreboard.css";

type HighScore = {
  name: string;
  score: number;
  difficulty: string;
  date: string;
};

function Scoreboard() {
  const score = useAppSelector(selectScore);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"all-time" | "weekly">("all-time");
  const difficulty = useAppSelector((state) => state.game.difficulty);

  // sort high scores by score
  const sortedHighScores = highScores
    ? highScores.slice().sort((a, b) => b.score - a.score)
    : [];

  // pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(
    (highScores ? highScores.length : 0) / itemsPerPage
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHighScores = sortedHighScores.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // send game data to server
  const postHighscore = (name: string, score: number, difficulty: string) => {
    const gameData = {
      name: name,
      score: score,
      difficulty: difficulty,
      date: new Date().toISOString(),
    };
    console.log("Sending game data:", gameData);

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
        fetchHighScores("all-time");
      })
      .catch((error) => {
        console.error("Error sending game data:", error);
      });
  };

  const fetchHighScores = (mode: "all-time" | "weekly") => {
    const endpoint =
      mode === "all-time" ? "/high-scores" : "/weekly-high-scores";
    fetch(
      `http://localhost:3001${endpoint}?difficulty=${difficulty}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`${difficulty} high scores fetched successfully:`, data);
        console.log(mode)
        setHighScores(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching high scores:", error);
      });
  };

  const handleSubmit = () => {
    console.log("Submitting game data...");
    postHighscore(name, score, difficulty);
  };

  const handleScoreToggle = () => {
    setViewMode(viewMode === "all-time" ? "weekly" : "all-time");
    fetchHighScores(viewMode === "all-time" ? "weekly" : "all-time");
  };

  return (
    <div className="scoreboard-modal">
      <h1>Congratulations!</h1>
      <p>Your Score: {score}</p>
      {loading ? (
        <div className="loader"></div>
      ) : highScores ? (
        <div>
          <h2>High Scores</h2>
          <h5>({difficulty})</h5>
          <h4>{viewMode === "all-time" ? "All Time:" : "Weekly:"}</h4>
          <div className="scores">
            <div className="score-row-container">
              {currentHighScores.map((item, index) => (
                <div key={index} className="score-row">
                  <div className="rank-name">
                    {index + 1 + (currentPage - 1) * itemsPerPage} {item.name}
                  </div>
                  <div className="score">{item.score}</div>
                </div>
              ))}
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <button
              className="high-score-toggle"
              onClick={() => handleScoreToggle()}
            >
              View {viewMode === "all-time" ? "Weekly" : "All-Time"} Scores
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>Enter your name</p>
          <input
            type="text"
            value={name}
            maxLength={6}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default Scoreboard;
