import { useState } from 'react'

import './App.css'

function App() {
  
  const titleDiv = document.querySelector("title");
  if(titleDiv){
    titleDiv.textContent = "WHERE IS WALDO";
  }

  const name_game_1 = "Waldo In The Galactic City";
  const name_game_2 = "Another image";

  return (
    <>
    <h1>Where is Waldo - The Game</h1>

    <div className='setOfButtons'>
      <button>
       <h3>{name_game_1}</h3> 
      </button>
      <button>
       <h3>{name_game_2}</h3> 
      </button>
    </div>
      
    </>
  )
}

export default App
