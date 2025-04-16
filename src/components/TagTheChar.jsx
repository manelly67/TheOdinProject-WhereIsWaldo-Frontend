import { useState, useEffect } from "react";
import { fromNormalizeToScreen } from "./coord";

const TagTheChar = (props) => {
  const { imgCharacters, W, H, coords } = props;
  const [imgCharacToTag, setImgCharacToTag] = useState(null);

  useEffect(() => {
    let temp = [];
    imgCharacters.forEach((e) => {
      if (e.found === true) {
        const { x, y } = fromNormalizeToScreen(
          Number(e.x),
          Number(e.y),
          W,
          H,
          coords
        );
        temp.push({ id: e.id, name: e.name, found: e.found, x: x, y: y });
      } else {
        temp.push({ id: e.id, name: e.name, found: e.found, x: e.x, y: e.y });
      }
    });
    console.log(temp);
    setImgCharacToTag(temp);
  }, [imgCharacters, W, H, coords]);

  const allTags =
    imgCharacToTag === null
      ? null
      : imgCharacToTag.map((e) => (
          <div
            key={e.id}
            style={{
             /*  backgroundColor: "black",
              color: "white",
              fontSize: "0.6rem",
              border: "1px solid white", */
              zIndex: "1",
            }}
          >
            {e.found === false ? null : (
              <p
                key={crypto.randomUUID()}
                role="tag"
                style={{
                  position: "absolute",
                  top: `${e.y + 5 }px`,
                  left: `${e.x  }px`,
                  backgroundColor: "black",
                  border: "1px solid white",
                  color: "yellow",
                  fontSize: "0.6rem",
                  fontWeight: 900,
                }}
              >
                {e.name}
              </p>
            )}
          </div>
        ));

  return (
  <>
  {imgCharacToTag ? <div>{allTags}</div> : null}
  </>
  );
};

export default TagTheChar;
