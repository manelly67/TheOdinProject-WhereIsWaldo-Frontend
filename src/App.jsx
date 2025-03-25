import { useState } from "react";

import "./App.css";

function App() {
  const titleDiv = document.querySelector("title");
  if (titleDiv) {
    titleDiv.textContent = "WHERE IS WALDO";
  }

  const [theme, setTheme] = useState('light');
  const body = document.querySelector('body')
  if (body) {
    document.body.className = theme;
  }
 
  const name_game_1 = "Waldo In The Galactic City";
  const name_game_2 = "Another image";

  function toggleTheme() {
    const newTheme = body.className === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }
 
  return (
    <>
      <button className="themeButton"
      onClick={() => {
       toggleTheme();
      }}>
        <img
          src="/src/assets/theme-light-dark.png"
          alt="theme-light-dark"
          className="iconImg"
          width="30px"
          height="30px"
        ></img>
      </button>
      <h1>Where is Waldo - The Game</h1>

      <div className="setOfButtons">
        <button>
          <h3>{name_game_1}</h3>
        </button>
        <button>
          <h3>{name_game_2}</h3>
        </button>
      </div>
    </>
  );
}

export default App;
