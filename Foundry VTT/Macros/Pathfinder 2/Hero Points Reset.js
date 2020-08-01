/* =======================================
## Instructions
# Reset hero points
All players will have their hero points set to one.

source: https://github.com/brunocalado/mestre-digital/tree/master/Foundry%20VTT/Macros/Pathfinder%202
*/

resetHeroPoints();

function resetHeroPoints() {
  let characters = game.actors.entities.filter((t) => t.data.type === "character");
  characters.forEach( (c) => {
    c.update({['data.attributes.heroPoints.rank']: 1});  
  }); 
}
