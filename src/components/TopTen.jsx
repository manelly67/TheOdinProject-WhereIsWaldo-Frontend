import { urlAddresses } from "../assets/urlAdresses";
import { useLocation, Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const TopTen = () => {
  const location = useLocation();
  const [gameName, setGameName] = useState(null);
  const [topTen, setTopTen] = useState(null);

  const getTopTen = useCallback(async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.top10) {
        setTopTen(responseData.top10);
      }
    } catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      const { img_id, gameName } = location.state;
      console.log(img_id);
      if (gameName !== null && img_id !== null) {
        const url = `${urlAddresses.topTEN}/${img_id}`;
        console.log(url);
        getTopTen(url);
        setGameName(gameName);
      }
    }
  }, [location.state, getTopTen]);

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
      <Link to="/" style={{ fontSize: "1.3rem" }}>
        HOME
      </Link>
      <h2>TOP TEN</h2>
      <h3>
        GAME:   <span style={{fontStyle:'italic'}}>{gameName}</span>
      </h3>
      {!topTen ? (
        <div>Loading...</div>
      ) : topTen.length > 0 ? (
        <>
          <ul
            style={{
              marginTop:'20px',
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "20px",
            }}
          >
            {topTen.map((r) => {
              return (
                <>
                  {r === null ? null : (
                    <li
                      key={r.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <p style={{ maxWidth: "200px" }}>{r.player.playername}</p>
                      <p style={{ maxWidth: "400px" }}>
                        {formatScore(r.timeRecord)}
                      </p>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </>
      ) : null}
    </>
  );
};

export default TopTen;
