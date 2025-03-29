import { useEffect, useState } from "react";


const DropdownMenu = (props) => {

const saveCoords = props.tagginCoords;
const [init,setInit] = useState(false);
const [classes,setClasses]=useState(props.dropdownMenu);


  function displayMenu(event){
   console.log('llama a la funcion');
   event.stopPropagation();
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

  return (
    <>
      {props.clickImg ? (
        props.imgCharacters.length > 0 ? (
          <>
            <div className={`${props.placeMenu}`}>
              <button id="b1" className={`${props.visible}`}      
              onClick={(event) => {
               displayMenu(event);
              }}
             
              > TAGS </button>
              <form className={`${classes}`}>
                <select  name="character">
                  {props.imgCharacters.map((e) => {
                    return (
                      <option key={e.id} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
                <button>submit</button>
              </form>
            </div>
          </>
        ) : null
      ) : null}
    </>
  );
};

export default DropdownMenu;
