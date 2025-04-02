import { useState } from "react";

const ToggleTheme = (props) => {
  const [theme, setTheme] = useState(props.theme);

  const body = document.querySelector("body");
  if (body) {
    document.body.className = theme;
  }

  function toggleTheme() {
    const newTheme = body.className === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <button
      className="themeButton"
      onClick={(event) => {
        event.stopPropagation();
        toggleTheme();
      }}
    >
      <img
        src="/src/assets/theme-light-dark.png"
        alt="theme-light-dark"
        className="iconImg"
        width="30px"
        height="30px"
      ></img>
    </button>
  );
};

export default ToggleTheme;
