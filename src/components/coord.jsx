const moveToCoord = (clientX, clientY, pageX, pageY) => {
  let movetoX = clientX === pageX ? clientX : pageX;
  let movetoY = clientY === pageY ? clientY : pageY;
  movetoX = Number(movetoX.toFixed(6));
  movetoY = Number(movetoY.toFixed(6));
  return { movetoX, movetoY };
};

const clickInsideImg = (tagginCoords, coords, endcoords) => {
  console.log(tagginCoords, coords, endcoords);
    switch (tagginCoords.x > coords.x && tagginCoords.x < endcoords.x) {
      case true:
        switch (tagginCoords.y > coords.y && tagginCoords.y < endcoords.y) {
          case true:
            return true;
          default:
            return false;
        }
      default:
        return false;
    } 
};

const getNormalizedCoords = () => {

}

export { moveToCoord, clickInsideImg, getNormalizedCoords };
