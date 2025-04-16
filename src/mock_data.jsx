const mock_data_1 = {
  game_id: "generate_id",
  startedAt: new Date(),
  picture: {
    src_image:
      "https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608952/find_the_charaters_in_the_galactic_city_pcuwu3.png",
    characters: [
      { id: "char-1", name: "Wally", found: false, x: 0, y: 0 },
      { id: "char-2", name: "R2D2", found: false, x: 0, y: 0 },
      {
        id: "char-3",
        name: "Courage the Cowardly Dog",
        found: false,
        x: 0,
        y: 0,
      },
    ],
  },
};

const mock_data_2 = {
  game_id: "generate_id",
  startedAt: new Date(),
  picture: {
    src_image:
      "https://res.cloudinary.com/dwlqplcgt/image/upload/v1743608911/find_the_lucky_clover_mqkdmu.png",
    characters: [
      { id: "char-4", name: "Four Leaf Clover", found: false, x: 0, y: 0 },
    ],
  },
};

const mock_player = {
  player: {
    id: "ec335d1b-98c8-42b5-aa45-94099a7b041d",
    playername: "ANONIMOUS",
    sessionId: "k8WaVzsac5EBe7mfw0ORAVoFf53ptUh-",
  },
};

const mock_game = {  // game database not the oject response
  id: "f59e2335-8d8c-431d-9432-f91ea8513b92",
  startedAt: "2025-04-11 22:16:02.423",
  finishedAt: null,
  timeRecord: {},
  playerId: "5290bdec-150a-4c48-b740-d791ea5e9ad8",
  pictureId: "img-1",
  status: "GAMING",
  targets: [
    { x: 0, y: 0, id: "char-1", name: "Wally", found: false },
    { x: 0, y: 0, id: "char-2", name: "R2D2", found: false },
    {
      x: 0,
      y: 0,
      id: "char-3",
      name: "Courage the Cowardly Dog",
      found: false,
    },
  ],
  timeInSeconds: null,
};

export { mock_data_1, mock_data_2, mock_player, mock_game };
