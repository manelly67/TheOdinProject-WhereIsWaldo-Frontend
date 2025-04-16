

function getNormalizedCoords(x, y, coords, W, H) {
  const relativeX = x - coords.x;
 /*  console.log(relativeX);
  console.log(2*relativeX);
  console.log((2*relativeX)/W); */
  const relativeY = y - coords.y;
 /*  console.log(relativeY);
  console.log(2*relativeY);
  console.log((2*relativeY)/H); */

  let Xnormalize1 = ((2 * relativeX) / W )- 1;
  Xnormalize1 = Number(Xnormalize1.toFixed(10));
  let Ynormalize1 = ((2 * relativeY) / H )- 1;
  Ynormalize1 = Number(Ynormalize1.toFixed(10));
  console.log({ x: Xnormalize1, y: Ynormalize1 });
}

/* 
let coords = { x: 0, y: 0 };
let W = 669;
let H = 560;

console.log('centro clover');
getNormalizedCoords(175, 468, coords, W, H);

console.log('extremos clover');
getNormalizedCoords(154, 447, coords, W, H);
getNormalizedCoords(194, 489, coords, W, H); */



/* 
console.log('centro wally');
getNormalizedCoords(340.35, 343.50, coordsImg, Wimg, Himg);

console.log('extremos wally');
getNormalizedCoords(337.35, 343.50, coordsImg, Wimg, Himg);
getNormalizedCoords(340.35, 335.50, coordsImg, Wimg, Himg);
getNormalizedCoords(343.35, 343.50, coordsImg, Wimg, Himg);
getNormalizedCoords(340.35, 347.50, coordsImg, Wimg, Himg);

console.log('centro coraje');
getNormalizedCoords(636.18, 175.20, coordsImg, Wimg, Himg);

console.log('extremos coraje');
getNormalizedCoords(628.17, 175.20, coordsImg, Wimg, Himg);
getNormalizedCoords(636.18, 167.20, coordsImg, Wimg, Himg);
getNormalizedCoords(642.17, 175.20, coordsImg, Wimg, Himg);
getNormalizedCoords(636.18, 186.20, coordsImg, Wimg, Himg);


 */

let coordsImg = { x: 0, y: 0 };
let Wimg = 860;
let Himg = 556;
/* 
console.log('centro wally');
getNormalizedCoords(348, 356, coordsImg, Wimg, Himg);

console.log('extremos wally');
getNormalizedCoords(343, 348, coordsImg, Wimg, Himg);
getNormalizedCoords(350, 364, coordsImg, Wimg, Himg);



console.log('centro r2d2');
getNormalizedCoords(712, 292, coordsImg, Wimg, Himg);

console.log('extremos r2d2');
getNormalizedCoords(700, 275, coordsImg, Wimg, Himg);
getNormalizedCoords(720, 308, coordsImg, Wimg, Himg);
 */

console.log('centro coraje');
getNormalizedCoords(647, 191, coordsImg, Wimg, Himg);

console.log('extremos coraje');
getNormalizedCoords(637, 180, coordsImg, Wimg, Himg);
getNormalizedCoords(655, 200, coordsImg, Wimg, Himg);
