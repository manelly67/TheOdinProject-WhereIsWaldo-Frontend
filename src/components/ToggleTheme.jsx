import { useState } from "react";
import Icon from '@mdi/react';
import { mdiThemeLightDark } from '@mdi/js';

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

  /* <img
        src="/src/assets/theme-light-dark.png"
        alt="theme-light-dark"
        className="iconImg"
        width="30px"
        height="30px"
      ></img> */
  return (
    <button
      className="themeButton"
      onClick={(event) => {
        event.stopPropagation();
        toggleTheme();
      }}
    >
      <Icon path={mdiThemeLightDark} size={1} />
    </button>
  );
};

export default ToggleTheme;
