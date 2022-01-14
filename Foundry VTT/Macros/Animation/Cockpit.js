/*
source: 
icon: icons/tools/navigation/spyglass-telescope-brass.webp
*/

// 
const version = 'v0.2';

main ();

async function main() {
  let currentTile = await Tagger.getByTag("cockpit");  
  let alpha = currentTile[0].data.alpha;  
  unHideTile(currentTile[0]);
}

async function unHideTile(tile) {
  tile.update({
    "alpha": tile.data.alpha === 0 ? 1.0 : 0.0
  });
}
