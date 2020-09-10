/* Create a walls to emulate darkness (spells DnD, pf, etc) - v1.0
// - Select any token
// - It'll draw a darkness area arround it.
// TODO: options
*/
let grid_radius = 3; // diameter in grids, e.g. 15ft = 3
let d = grid_radius + 1; // center tile counts
const gridSize = canvas.scene.data.grid;
let wl = canvas.getLayer("WallsLayer");
const numSeg = 16;
const theta = Math.PI * 2 / numSeg;
const radius = gridSize * (d-0.5);
let brightLight = -5.5 * d;

for ( let token of canvas.tokens.controlled ) {
    // Update token light emission
    console.log(token);
    token.update({
        dimLight: 0,
        brightLight:  brightLight,
        lightAngle: 360.0});

    let cx = token.x + gridSize / 2;
    let cy = token.y + gridSize / 2;

    let wallData = {};
    wallData.move = CONST.WALL_MOVEMENT_TYPES.NONE;
    wallData.sense = CONST.WALL_SENSE_TYPES.NORMAL;

    console.log('Creating walls for Darkness');
    for (let ns = 0; ns < numSeg; ns++) {
        let p1 = Array(cx + Math.cos(theta*ns) * radius, cy + Math.sin(theta*ns) * radius);
        let p2 = Array(cx + Math.cos(theta*(ns+1)) * radius, cy + Math.sin(theta*(ns+1)) * radius);
        wallData.c = p1.concat(p2);
        wl.constructor.placeableClass.create(wallData);
    }
}