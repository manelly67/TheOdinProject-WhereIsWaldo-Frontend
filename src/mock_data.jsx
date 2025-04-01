const mock_data_1 = {
  game_id: "generate_id",
  startedAt: new Date(),
  picture: {
    src_image:
      "https://res.cloudinary.com/dwlqplcgt/image/upload/v1742854639/Waldo_galactic_city_lzdru1.png",
    characters: [
      { id: "char-1", name: "Wally", found: false, x: 0, y: 0 },
      { id: "char-2", name: "The Wizard", found: false, x: 0, y: 0 },
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
    src_image: "https://",
    characters: [
      { id: "char-4", name: "Four Leaf Clover", found: false, x: 0, y: 0 },
    ],
  },
};

export { mock_data_1, mock_data_2 };
