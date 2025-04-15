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

const getNormalizedCoords = (tagginCoords, coords,W,H) => {
  console.log(tagginCoords);
  console.log(coords);
  console.log(W);
  console.log(H);
  const relativeX = tagginCoords.x - coords.x;
  const relativeY = tagginCoords.y - coords.y;
  let Xnormalize1 = ((2 * relativeX) / W )- 1;
  Xnormalize1=Number(Xnormalize1.toFixed(10));
  let Ynormalize1 = ((2 * relativeY) / H) - 1;
  Ynormalize1=Number(Ynormalize1.toFixed(10));
  return {x:Xnormalize1,y:Ynormalize1};
}

// normalX and normalY will be received from the backend answer
const fromNormalizeToScreen = (normalX,normalY,W,H,coords) => {
  console.log(W,H);
  let relativeX = (W*(normalX+1))/2;
  let X = Number((coords.x + relativeX).toFixed(2));
  let relativeY = (H*(normalY+1))/2;
  let Y = Number((coords.y + relativeY).toFixed(2));
  console.log({x:X,y:Y});
  return {x:X,y:Y};
};

export { moveToCoord, clickInsideImg, getNormalizedCoords, fromNormalizeToScreen };
