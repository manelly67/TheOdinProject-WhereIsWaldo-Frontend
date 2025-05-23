import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";
import ToggleTheme from "./components/ToggleTheme";
import { urlAddresses } from "./assets/urlAdresses";

let didInit = false;

function App() {
  const titleDiv = document.querySelector("title");
  if (titleDiv) {
    titleDiv.textContent = "WHERE IS WALDO";
  }
 
  const navigate = useNavigate();
  const name_game_1 = "Waldo In The Galactic City";
  const name_game_2 = "Oh! Waldo is not here";

  const playerId =
    readCookieValue("player_id") === null ? null : readCookieValue("player_id");
  
  const [player, setPlayer] = useState(null);
  const [wakeUp, setWakeUp] = useState(false);

  function readCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    } else {
      return null;
    }
  }

  const getSession = useCallback(async () => {
    try {
      const response = await fetch(urlAddresses.session);
      const responseData = await response.json();
      if (responseData.SessionID) {
        const { SessionID } = responseData;
        return SessionID;
      }
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, []); 

  const getPlayer = useCallback(async () => {
    let session = "";
    try {
      session = await getSession();
      const bodydata = { sessionId: session };
      await fetch(urlAddresses.createplayer, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
        },
        body: JSON.stringify(bodydata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.player) {
            const { player } = data;
            setPlayer(player);
            setWakeUp(true);
            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000 * 86400;
            now.setTime(expireTime);
            document.cookie = `player_id=${
              player.id
            };expires=${now.toUTCString()};path=/`;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, [getSession]);

  const updatePlayerObj = useCallback(async () => {
    try {
      const response = await fetch(`${urlAddresses.readplayer}/${playerId}`, {
        method: "GET",
      });
      const responseData = await response.json();
      if (responseData.player) {
        const { player } = responseData;
        setPlayer(player);
        setWakeUp(true);
      }
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, [playerId]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      if (playerId === null) {
        getPlayer();
      }
    }
  }, [playerId, getPlayer]);

  useEffect(() => {
    if (playerId !== null) {
      setWakeUp(false);
      updatePlayerObj();
    }
  }, [updatePlayerObj, playerId]);


  return (
    <>
      <ToggleTheme theme="light" />
      <h1>Where is Waldo - The Game</h1>
   
      {!wakeUp ? (
        <>
          <div>
            <p>loading...</p>
            <hr></hr>
            <p>
              Dear user, this is a study project, please wait 1 minute for the
              server to wake up.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="setOfButtons">
          <p>For study purposes your player will last one day</p>
          <p>and can play each game once</p>
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
      )}
     
    </>
  );
}

export default App;
