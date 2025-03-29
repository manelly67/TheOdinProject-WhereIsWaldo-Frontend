import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import mock_data_1 from "../mock_data";
import styles from "../Box.module.css";
import TargetingBox from "./TargetinBox";
import DropdownMenu from "./DropdownMenu";
import { moveToCoord, clickInsideImg } from "./coord";

const DrawingBoard = () => {
  const { box, placeMenu, dropdownMenu, visible } = styles;
  const titleDiv = document.querySelector("title");

  const location = useLocation();
  const [initial, setInitial] = useState(false);

  const [player, setPlayer] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [responseData, setResponseData] = useState("{}");
  const [imgSource, setImgSource] = useState(null);
  const [imgCharacters, setImgCharacters] = useState(null);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [endcoords, setEndcoords] = useState({ x: 0, y: 0 });
  const [W, setW] = useState(0);
  const [H, setH] = useState(0);
  const [tagginCoords, setTagginCoords] = useState({ x: 0, y: 0 });
  const [clickImg, setClickImg] = useState(false);
  const [normalizeCoords, setNormalizeCoords] = useState({ x: 0, y: 0 });
  const [selectedChar, setSelectedChar] = useState({id:"",name:"",found:false});

  console.log(coords);
  console.log(endcoords);
  console.log(width, "-", height);
  console.log(W, "-", H);
  console.log(tagginCoords);
  console.log(clickImg);
  console.log(normalizeCoords);
  console.log(selectedChar);

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

  async function getData(mock_data_1) {
    setResponseData(mock_data_1);
    setImgSource(mock_data_1.picture.src_image);
    setImgCharacters(mock_data_1.picture.characters);
  }

  const getImgCoord = useCallback(() => {
    const imageRef = document.getElementById(`${gameName}`);
    if (imageRef) {
      const rect = imageRef.getBoundingClientRect();
      setCoords({
        x: Number(rect.left.toFixed(4)),
        y: Number(rect.top.toFixed(4)),
      });
      setEndcoords({
        x: Number(rect.right.toFixed(4)),
        y: Number(rect.bottom.toFixed(4)),
      });
      setW(Number(rect["width"].toFixed(4)));
      setH(Number(rect["height"].toFixed(4)));
     /*  for (const key in rect) {
        if (typeof rect[key] !== "function") {
          console.log(`${key} : ${rect[key]}`);
        }
      } */
    }
  }, [gameName]);

 /*  const handleClick = useCallback(() => {
    document.addEventListener(
      "click",
      (ev) => {
        let { movetoX, movetoY } = moveToCoord(
          ev.clientX,
          ev.clientY,
          ev.pageX,
          ev.pageY
        );
        setTagginCoords({ x: movetoX, y: movetoY });
      },
      false
    );
  }, []); */

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
    const temp = clickInsideImg(tagginCoords, coords, endcoords);
    console.log(temp);
    setClickImg(temp);
  }, [tagginCoords, coords, endcoords]);

  useEffect(() => {
    const f = document.getElementById("box");
    if (f) {
      f.style.transform = `translateY(${tagginCoords.y - 5}px)`;
      f.style.transform += `translateX(${tagginCoords.x - 15}px)`;
    }
  }, [tagginCoords]);

  /* useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]); */

  useEffect(() => {
    document.addEventListener(
      "click",
      (ev) => {
        let { movetoX, movetoY } = moveToCoord(
          ev.clientX,
          ev.clientY,
          ev.pageX,
          ev.pageY
        );
        setTagginCoords({ x: movetoX, y: movetoY });
      },
      false
    );
    return () => {
      document.removeEventListener(
        "click",
        (ev) => {
          let { movetoX, movetoY } = moveToCoord(
            ev.clientX,
            ev.clientY,
            ev.pageX,
            ev.pageY
          );
          setTagginCoords({ x: movetoX, y: movetoY });
        },
        false
      );
    };
  }, []);


  return (
    <>
      <div className="bar">
        <>
          <div id="box" className={`${box}`}>
            <div>
              <TargetingBox />
            </div>
            <div>
              <DropdownMenu
                clickImg={clickImg}
                setClickImg={setClickImg}
                coords={coords}
                W={W}
                H={H}
                endcoords={endcoords}
                tagginCoords={tagginCoords}
                setTagginCoords={setTagginCoords}
                placeMenu={placeMenu}
                dropdownMenu={dropdownMenu}
                visible={visible}
                imgCharacters={imgCharacters}
                selectedChar={selectedChar}
                setSelectedChar={setSelectedChar}
                setNormalizeCoords={setNormalizeCoords}
              />
            </div>
          </div>
          

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
              height={
                width * 0.8 * 0.65 < height ? width * 0.8 * 0.65 : height * 0.95
              }
            ></img>
          </>
        )}
      </div>
    </>
  );
};

export default DrawingBoard;
