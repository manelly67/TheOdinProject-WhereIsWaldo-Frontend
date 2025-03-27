import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import mock_data_1 from "../mock_data";
import styles from "../Box.module.css";

const DrawingBoard = () => {
  const { box } = styles;
  const titleDiv = document.querySelector("title");

  const location = useLocation();
  const [initial, setInitial] = useState(false);
  const [player, setPlayer] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [responseData, setResponseData] = useState("{}");
  const [imgSource, setImgSource] = useState(null);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [endcoords, setEndcoords] = useState({ x: 0, y: 0 });
  const [tagginCoords, setTagginCoords] = useState({ x: 0, y: 0 });
  console.log(tagginCoords);

  if (titleDiv) {
    titleDiv.textContent = gameName;
  }

  const initBoard = useCallback(async () => {
    if (location.state !== null) {
      const { player, gameName } = location.state;
      setPlayer(player);
      setGameName(gameName);
      if (gameName !== null) {
        setInitial(true);
        // ESTA FUNCION LUEGO TAERA LA DATa DEL FETCH AL BACKEND POR AHORA tRAER LOCALMENTE
        if (gameName === "Waldo In The Galactic City") {
          await getData(mock_data_1); // aqui ubicar la url correcta
        }
      }
    }
  }, [location.state]);

  const getImgCoord = useCallback(() => {
    const imageRef = document.getElementById(`${gameName}`);
    if (imageRef) {
      const rect = imageRef.getBoundingClientRect();
      setCoords({ x: rect.left, y: rect.top });
      setEndcoords({ x: rect.right, y: rect.bottom });
    }
  }, [gameName]);

  async function getData(mock_data_1) {
    setResponseData(mock_data_1);
    setImgSource(mock_data_1.picture.src_image);
  }

  useEffect(() => {
    if (!initial) {
      initBoard();
    }
  });

  useEffect(() => {
    if (imgSource !== null) {
      getImgCoord();
    }
  }, [gameName, imgSource, getImgCoord]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const f = document.getElementById("box");
 
  if (f) {
    document.addEventListener(
      "click",
      (ev) => {
        f.style.transform = `translateY(${ev.clientY - 3}px)`;
        f.style.transform += `translateX(${ev.clientX - 3}px)`;
        normalizeCoord(ev.clientX, ev.clientY);
      },
      false
    );
  } else {
    console.log("Element does not exist");
  }

  function normalizeCoord(x, y) {
    const imgClick = clickInsideImg(x, y);
    switch (imgClick) {
      case true:{
        const W = Number(endcoords.x) - Number(coords.x);
        const H = Number(endcoords.y) - Number(coords.y);
        const relativeX = Number(x) - Number(coords.x);
        const relativeY = Number(y) - Number(coords.y);
        const Xnormalize1 = (2 * relativeX) / W - 1;
        const Ynormalize1 = (2 * relativeY) / H - 1;
        setTagginCoords({ x: Xnormalize1, y: Ynormalize1 });
      }
        break;
      case false:
        setTagginCoords({ x: 0, y: 0 });
        break;
    }
  }

  function clickInsideImg(x, y) {
    switch (Number(x) > Number(coords.x) && Number(x) < Number(endcoords.x)) {
      case true:
        switch (
          Number(y) > Number(coords.y) &&
          Number(y) < Number(endcoords.y)
        ) {
          case true:
            return true;
          case false:
            return false;
        }
      break;
      case false:
        return false;
    }
  }

  return (
    <>
      <div className="bar">
        <>
          <div id="box" className={`${box}`}></div>
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
              id={gameName}
              src={imgSource}
              alt={gameName}
              className=""
              width={width * 0.8}
            ></img>
          </>
        )}
      </div>
    </>
  );
};

export default DrawingBoard;
