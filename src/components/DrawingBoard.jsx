import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import mock_data_1 from "../mock_data";

const DrawingBoard = () => {
  const titleDiv = document.querySelector("title");

  const location = useLocation();
  const [initial, setInitial] = useState(false);
  const [player, setPlayer] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [responseData, setResponseData] = useState("{}");
  const [imgSource, setImgSource] = useState(null);

  if (titleDiv) {
    titleDiv.textContent = gameName;
  }

  const initBoard = useCallback(() => {
    if (location.state !== null) {
      const { player, gameName } = location.state;
      setPlayer(player);
      setGameName(gameName);
      if (gameName !== null) {
        setInitial(true);
        // ESTA FUNCION LUEGO TAERA LA DATa DEL FETCH AL BACKEND POR AHORA tRAER LOCALMENTE
        if (gameName === "Waldo In The Galactic City") {
          getData(mock_data_1); // aqui ubicar la url correcta
        }
      }
    }
  }, [location.state]);

  function getData(mock_data_1) {
    setResponseData(mock_data_1);
    setImgSource(mock_data_1.picture.src_image);
  }

  useEffect(() => {
    if (!initial) {
      initBoard();
    }
  });

  return (
    <>
      <div className="bar">
        <>
          <div>
            <ToggleTheme theme="dark" />
          </div>

          <div className="setOfLinks">
            <Link to="/" style={{ fontSize: "1.3rem" }}>
              HOME
            </Link>
          </div>
        </>
      </div>
      <div>
        {!imgSource ? (
          <>
            <div>
              <p>loading</p>
              <p>
                Dear user, this is a study project, please wait 1 minute for the
                server to wake up.
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={imgSource}
              alt="Waldo In The Galactic City"
              className=""
              width="860px"
              height="556px"
            ></img>
          </>
        )}
      </div>
    </>
  );
};

export default DrawingBoard;
