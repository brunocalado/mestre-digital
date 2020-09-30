/* Create a walls for isometric cubes- v0.1
- Instructions: selected a tile. It'll draw the walls near. Drag the walls after.
TODO
- Center on the tile.
*/

const gridSize = canvas.scene.data.grid;
let wl = canvas.getLayer("WallsLayer");
let halfd = (Math.sin(Math.PI/8)*gridSize)/2;
let halfD = (Math.cos(Math.PI/8)*gridSize)/2;

for ( let tile of canvas.tiles.controlled ) {    
    console.log(tile); //debug
    let cx = tile.x;
    let cy = tile.y;    
    
    // point A
    drawWall( Array(cx, cy), Array(cx + gridSize, cy) );
    // point B
    drawWall( Array(cx + gridSize, cy), Array(cx + gridSize, cy+gridSize) );
    // point C
    drawWall( Array(cx + gridSize, cy), Array(cx + gridSize, cy+gridSize) );
    // point D
    drawWall( Array(cx + gridSize, cy), Array(cx + gridSize, cy+gridSize) );
}

function drawWall(firstPoint, secondPoint, options) {
  let wallData = {};
  let p1 = firstPoint;
  let p2 = secondPoint;
  wallData.move = CONST.WALL_MOVEMENT_TYPES.NONE;
  wallData.sense = CONST.WALL_SENSE_TYPES.NORMAL;

  wallData.c = firstPoint.concat(secondPoint);
  wl.constructor.placeableClass.create(wallData);    
}
