import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";
import ToggleTheme from "./components/ToggleTheme";

let didInit = false;

function App() {
  const titleDiv = document.querySelector("title");
  if (titleDiv) {
    titleDiv.textContent = "WHERE IS WALDO";
  }

  const navigate = useNavigate();
  const name_game_1 = "Waldo In The Galactic City";
  const name_game_2 = "Oh! Waldo is not here";
  const [playerId, setPlayerId] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const player = playerId === null ? null : { id: playerId, name: playerName };

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ Only runs once per app load
      const id = crypto.randomUUID();
      setPlayerId(id);
      setPlayerName("anonymous");
    }
  }, []);

  console.log(player);

  return (
    <>
      <ToggleTheme theme="light" />
      <h1>Where is Waldo - The Game</h1>

      <div className="setOfButtons">
        <button
          onClick={() => {
            navigate("/board", {
              replace: true,
              state: { player: player, gameName: name_game_1 },
            });
          }}
        >
          <h3>{name_game_1}</h3>
        </button>
        <button
          onClick={() => {
            navigate("/board", {
              replace: true,
              state: { player: player, gameName: name_game_2 },
            });
          }}
        >
          <h3>{name_game_2}</h3>
        </button>
      </div>
    </>
  );
}

export default App;
