/*
source: 
icon: icons/tools/navigation/spyglass-telescope-brass.webp
*/

// 
const version = 'v0.1';

main ();

async function main() {
  let currentTile = await Tagger.getByTag("cockpit");  
  let alpha = currentTile[0].data.alpha;    
  
  console.log(currentTile[0])
  console.log(alpha)

  if (alpha=='1') {
    await currentTile[0].document.update({'alpha': 0});
  } else {
    await currentTile[0].document.update({'alpha': 1});
  }  

}
