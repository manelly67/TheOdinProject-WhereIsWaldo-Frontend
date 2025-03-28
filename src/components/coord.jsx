const moveToCoord = (clientX, clientY, pageX, pageY) => {
  let movetoX = clientX === pageX ? clientX : pageX;
  let movetoY = clientY === pageY ? clientY : pageY;
  movetoX = Number(movetoX.toFixed(6));
  movetoY = Number(movetoY.toFixed(6));
  return { movetoX, movetoY };
};

function clickInsideImg(pageX, pageY, coords, endcoords) {

  switch (pageX > coords.x && pageX < endcoords.x) {
    case true:
      switch (pageY > coords.y && pageY < endcoords.y) {
        case true:
          return true;
          break;
        default:
          return false;
      }
      break;
    default:
      return false;
  }
}

export { moveToCoord, clickInsideImg };
