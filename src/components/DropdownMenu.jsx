import { useState } from "react";
import { getNormalizedCoords, fromNormalizeToScreen } from "./coord";


// CREAR un componente escribir etiqueta con base a una respueta correct/incorrect
const DropdownMenu = (props) => {
  const [classes, setClasses] = useState(props.dropdownMenu);
  const [selected, setSelected] = useState(null);

  function displayMenu(event) {
    event.stopPropagation();
    setSelected(props.imgCharacters[0].name);
    toggleOpenClose();
  }

  function toggleOpenClose() {
    if (classes === props.dropdownMenu) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  function openMenu() {
    setClasses(props.visible);
  }

  function closeMenu() {
    setClasses(props.dropdownMenu);
  }

  function getObject(selected) {
    let filtered = props.imgCharacters.filter((e) => e.name === selected);
    if (filtered) {
      props.setSelectedChar(filtered[0]);
    }
  }

  function submitChar(event) {
    console.log("funcion submit char");

    event.stopPropagation();
    getNormalizedCoords(
      props.tagginCoords,
      props.coords,
      props.W,
      props.H,
      props.setNormalizeCoords
    );
    getObject(selected);

    // DESDE AQUI SE LLAMARA LA FUNCION PARA EL BACKEND
    // con el objeto personaje, las coordenadas normalizadas, el jugador, y el id del juego o partida
    // y set actualizara el setResponseData 
   /*  let responseData = {
      answer: "correct",
      tagX: Number(-0.1586304817),
      tagY: Number(-0.6217662801),
      characters: [{ id: "char-1", name: "Wally", found: true }],
    };
    manageAnswer(responseData); */

    closeMenu();
    props.setClickImg(false);
  }

  /* function manageAnswer(responseData) {
    const parentDiv = document.querySelector(".bar");
    console.log(parentDiv);
    if (responseData.answer === "correct") {
      let { x, y } = fromNormalizeToScreen(
        responseData.tagX,
        responseData.tagY,
        props.W,
        props.H,
        props.coords
      );
    }
  } */

  return (
    <>
      {props.clickImg ? (
        props.imgCharacters.length > 0 ? (
          <>
            <div className={`${props.placeMenu}`}>
              <button
                className={`${props.visible}`}
                onClick={(event) => {
                  displayMenu(event);
                }}
              >
                TAGS
              </button>
              <div
                role="menu"
                className={`${classes}`}
                aria-hidden={classes === props.visible ? false : true}
              >
                <select
                  name="character"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  onChange={(event) => setSelected(event.target.value)}
                >
                  {props.imgCharacters.map((e) => {
                    return (
                      <option
                        key={e.id}
                        value={e.name}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={(event) => {
                    submitChar(event);
                  }}
                >
                  submit
                </button>
              </div>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
};

export default DropdownMenu;
