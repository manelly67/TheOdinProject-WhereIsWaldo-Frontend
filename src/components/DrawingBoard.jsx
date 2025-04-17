import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import TargetingBox from "./TargetinBox";
import DropdownMenu from "./DropdownMenu";
import TagTheChar from "./TagTheChar";
import Message from "./Message";
import AskForName from "./AskForName";
import styles from "../styles/Box.module.css";
import { moveToCoord, clickInsideImg } from "./coord";
import { urlAddresses } from "../assets/urlAdresses";

let didInitImg1 = false;
let didInitImg2 = false;

const DrawingBoard = () => {
  const { box, placeMenu, dropdownMenu, visible } = styles;
  const [gameName, setGameName] = useState(null);
  const titleDiv = document.querySelector("title");
  if (titleDiv) {
    titleDiv.textContent = gameName;
  }
  const location = useLocation();

  const [game, setGame] = useState(null);
  const [messageObj, setMessageObj] = useState(null);
  const [isInTop, setIsInTop] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const imgSource = game === null ? null : game.picture.src_image;
  const imgId = game === null ? null : game.picture.id_image;
  const imgCharacters = game === null ? null : game.picture.characters;
  const score = game === null ? null : formatScore(game.timeRecord);
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [endcoords, setEndcoords] = useState({ x: 0, y: 0 });
  const [W, setW] = useState(0);
  const [H, setH] = useState(0);
  const [tagginCoords, setTagginCoords] = useState({ x: 0, y: 0 });
  const [clickImg, setClickImg] = useState(false);
  const [stop, setStop] = useState(false);

  const getData = useCallback(async (url) => {
    try {
      await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.game) {
            const { game } = data;
            setGame(game);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, []);

  const initBoard = useCallback(async () => {
  
    if (location.state !== null) {
      const { player, gameName } = location.state;
      setGameName(gameName);

      if (gameName !== null) {
        if (gameName === "Waldo In The Galactic City") {
          const url = `${urlAddresses.createGame}/img-1/${player.id}`;
          if (!didInitImg1) {
            didInitImg1 = true;
            await getData(url);
          }
        }
        if (gameName === "Oh! Waldo is not here") {
          const url = `${urlAddresses.createGame}/img-2/${player.id}`;
          if (!didInitImg2) {
            didInitImg2 = true;
            await getData(url);
          }
        }
      }
    }
  }, [location.state, getData]);

  const getImgCoord = useCallback(() => {
    const imageRef = document.getElementById(`${gameName}`);
    if (imageRef) {
      const rect = imageRef.getBoundingClientRect();
      setCoords({
        x: Number(rect.left.toFixed(10)),
        y: Number(rect.top.toFixed(10)),
      });
      setEndcoords({
        x: Number(rect.right.toFixed(10)),
        y: Number(rect.bottom.toFixed(10)),
      });
      setW(Number(rect["width"].toFixed(4)));
      setH(Number(rect["height"].toFixed(4)));
    }
  }, [gameName]);

  const updateData = useCallback(async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const responseData = await response.json();
      if (responseData.game) {
        const { game } = responseData;
        setGame(game);
      }
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, []);

  const checkIsInTopTen = useCallback(async (game) => {
    const url = `${urlAddresses.topTEN}/${game.picture.id_image}`;
    try {
      const response = await fetch(url);
      const responseData = await response.json();
      if (responseData.top10) {
        const { top10 } = responseData;
        top10.forEach((r) => {
          if (r) {
            if (r.id === game.game_id) {
              setIsInTop(true);
            }
          }
        });
      }
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (game === null) {
      initBoard();
    }
  }, [game, initBoard]);

  useEffect(() => {
    if (location.state !== null) {
      const { player, gameName } = location.state;
      if (gameName !== null && player !== null) {
        if (gameName === "Waldo In The Galactic City") {
          const url = `${urlAddresses.createGame}/img-1/${player.id}`;
          updateData(url);
        }
        if (gameName === "Oh! Waldo is not here") {
          const url = `${urlAddresses.createGame}/img-2/${player.id}`;
          updateData(url);
        }
      }
    }
  }, [location.state, updateData]);

  useEffect(() => {
    if (imgSource !== null) {
      getImgCoord();
    }
  }, [gameName, imgSource, getImgCoord]);

  useEffect(() => {
    const temp = clickInsideImg(tagginCoords, coords, endcoords);
     setClickImg(temp);
  }, [tagginCoords, coords, endcoords]);

  useEffect(() => {
    const f = document.getElementById("box");
    if (f) {
      if (tagginCoords.x === 0 && tagginCoords.y === 0) {
        f.style.transform = `translateY(${tagginCoords.y}px)`;
        f.style.transform += `translateX(${tagginCoords.x}px)`;
      } else {
        f.style.transform = `translateY(${tagginCoords.y - 5}px)`;
        f.style.transform += `translateX(${tagginCoords.x - 15}px)`;
      }
    }
  }, [tagginCoords]);

  useEffect(() => {
    switch (game === null) {
      case true:
        break;
      case false:
        switch (game.status === "ENDED") {
          case true:
            setStop(true);
            if (game.player.name_player === "ANONIMOUS") {
              if (!dontAskAgain) {
                checkIsInTopTen(game);
              }
            }
            break;
          case false:
            switch (game.status === "GAMING") {
              case true: {
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
              }
              default:
                break;
            }
        }
    }
  }, [game, dontAskAgain, checkIsInTopTen]);

  function formatScore(score) {
    if (score) {
      const { days, hours, minutes, seconds } = score;
      let d = days ? `${days} days` : "";
      let h = hours ? `${hours} hours` : "";
      let m = minutes ? `${minutes} minutes` : "";
      let s = seconds ? `${seconds} seconds` : "";
      return `${d} ${h} ${m} ${s}`;
    }
  }

  return (
    <>
      <div className="bar">
        <>
          {!stop ? (
            <>
              <div id="box" className={`${box}`}>
                <div>
                  <TargetingBox />
                </div>
                <div>
                  <DropdownMenu
                    clickImg={clickImg}
                    setClickImg={setClickImg}
                    game={game}
                    setGame={setGame}
                    coords={coords}
                    W={W}
                    H={H}
                    tagginCoords={tagginCoords}
                    setTagginCoords={setTagginCoords}
                    placeMenu={placeMenu}
                    dropdownMenu={dropdownMenu}
                    visible={visible}
                    imgCharacters={imgCharacters}
                    setMessageObj={setMessageObj}
                  />
                </div>
              </div>
            </>
          ) : null}

          <div>
            <ToggleTheme theme="dark" />
          </div>

          <div className="setOfLinks">
            <Link to="/" style={{ fontSize: "1.3rem" }}>
              HOME
            </Link>
            <Link
              to={"/top_ten"}
              state={{ img_id: imgId, gameName: gameName }}
              style={{ fontSize: "1.3rem" }}
            >
              TOP TEN
            </Link>
            {!game ? null : !game.timeInSeconds ? null : (
              <>
                <div>
                  <p> Your SCORE:</p>
                  <p style={{ width: "80px" }}>{score}</p>
                </div>
              </>
            )}
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
              width={width * 0.75}
              height={
                width * 0.8 * 0.65 < height ? width * 0.8 * 0.65 : height * 0.95
              }
            ></img>
          </>
        )}
      </div>
      {imgCharacters ? (
        <TagTheChar imgCharacters={imgCharacters} coords={coords} W={W} H={H} />
      ) : null}

      {messageObj ? (
        <Message messageObj={messageObj} setMessageObj={setMessageObj} />
      ) : null}

      {isInTop ? (
        <AskForName
          game={game}
          setIsInTop={setIsInTop}
          setDontAskAgain={setDontAskAgain}
        />
      ) : null}
    </>
  );
};

export default DrawingBoard;
