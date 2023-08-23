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
  const [nameError, setNameError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // sort high scores by score
  const sortedHighScores = Array.isArray(highScores)
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
    // console.log("Sending game data:", gameData);

    fetch(`${process.env.REACT_APP_API_URL}/high-scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post high scores");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Game data sent successfully:", data);
        fetchHighScores("all-time");
        setError(null);
      })
      .catch((error) => {
        console.error("Error sending game data:", error);
        setError("Something went wrong");
      });
  };

  const fetchHighScores = (mode: "all-time" | "weekly") => {
    const endpoint =
      mode === "all-time" ? "/high-scores" : "/weekly-high-scores";
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}${endpoint}?difficulty=${difficulty}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch high scores");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(`${difficulty} high scores fetched successfully:`, data);
        // console.log(mode);
        setHighScores(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching high scores:", error);
        setError("Something went wrong");
      });
  };

  const handleSubmit = () => {
    // console.log("Submitting game data...");
    if (!name.trim()) {
      setNameError("Name cannot be empty");
      return;
    }
    setNameError(null);
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
            <div className="scores-foot">
              <div className="pagination-controls">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 arrow-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
                <span>
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 arrow-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
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
          {nameError && <p className="error-message">{nameError}</p>}
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
}

export default Scoreboard;
