import { useState } from "react";
import { getNormalizedCoords } from "./coord";
import { urlAddresses } from "../assets/urlAdresses";


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
        return filtered[0];
      } else {
        return null;
      }
    }


  async function submitChar(event) {
  
    const url = `${urlAddresses.round}/${props.game.game_id}`;
    event.stopPropagation();
    const {x,y} = getNormalizedCoords(
      props.tagginCoords,
      props.coords,
      props.W,
      props.H
    );
    const objCharSelect = getObject(selected);
    const bodydata = {
      char_obj: objCharSelect,
      normalize_x: x,
      normalize_y: y,
    };
    try {
      await fetch(url, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
        },
        body: JSON.stringify(bodydata),
      })
        .then((res) => res.json())
        .then((data) => {
          props.setMessageObj(data);
          if(data.game){
            props.setGame(data.game);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }catch (error) {
      alert("Something was wrong. try again later");
      console.log(error);
    }

    closeMenu();
    props.setClickImg(false);
  }

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
