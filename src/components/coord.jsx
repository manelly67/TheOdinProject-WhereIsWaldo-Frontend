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

const getNormalizedCoords = (tagginCoords, coords,W,H,setNormalizeCoords) => {
  const relativeX = tagginCoords.x - coords.x;
  const relativeY = tagginCoords.y - coords.y;
  let Xnormalize1 = ((2 * relativeX) / W )- 1;
  Xnormalize1=Number(Xnormalize1.toFixed(10));
  let Ynormalize1 = ((2 * relativeY) / H) - 1;
  Ynormalize1=Number(Ynormalize1.toFixed(10));
  setNormalizeCoords({x:Xnormalize1,y:Ynormalize1});
}

const fromNormalizeToScreen = () => {
  
};

export { moveToCoord, clickInsideImg, getNormalizedCoords };
