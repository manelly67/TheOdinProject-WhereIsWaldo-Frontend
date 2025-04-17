const base = "https://top-whereis-backend.onrender.com";

const urlAddresses = {
  home: `${base}/`,
  session: `${base}/session-id`,
  createplayer: `${base}/players/player_for_session`,
  readplayer: `${base}/players/id`,
  createGame: `${base}/games/new`,
  round: `${base}/games/round`,
  askForName:`${base}/players/update`,
  topTEN: `${base}/games/top-10`,
};

export { urlAddresses };
