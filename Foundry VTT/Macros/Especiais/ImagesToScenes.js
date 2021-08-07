
/*
source: 
icon: icons/sundries/gaming/rune-card.webp

canvas.scene.data

await Folder.createDocuments([{name: "Test", type: "Scene"}])
so lets say you type for Folder Name: Meadows then that becomes a string variable via html.find(blah blah)[0].value... which you can then find... let folder = game.folders.getName(variable) followed by if(!folder) await Folder.createDocuments([{name: "Test", type: "Scene"}]) so if the folder is undefined, it makes it. then continue as you would in your macro
*/

const version = '1.0';
const debug = true;

main();

async function main() {
  new Dialog({
    title: `Image To Scene - ${version}`,
    content: `
    <h3>Important</h3>
    <ul>
      <li>The folder name must be unique.</li>
      <li>You need to create the folder manually.</li>
      <li>The folder name must match what you type in here. It's case sensitive.</li>
      <li>To get the folder path right, you can drop a tile from it in the canvas and copy the path.</li>
    </ul>
    <h3>Form</h3>
    <div>
      <p>Folder Name: </p>
      <input type="text" id="folderName" value='Cenas'/>
    </div>
    <div>
      <p>Folder Path: </p>
      <input type="text" id="folderPath" value='modules/mymaps/images/cyberpunk/Alley/'/>
    </div>    
    `,
    buttons: {
      roll: {
        label: "Create",
        callback: (html) => {
          createImageFolder(html);
        }
      }, 
      cancel: {
        label: "Cancel"
      }
    }
  }).render(true)
}

async function createImageFolder(html) {
  const folderName = html.find("#folderName")[0].value;  
  const folderPath = html.find("#folderPath")[0].value;  
  
  const folderID = game.folders.getName(folderName).id;
  let {files} = await FilePicker.browse("data", folderPath);

  for (let img of files) {
    if (debug) { console.log('File: ' + img); } 
    const myScene = await createScene(img, folderID, 50);
  }
  
}

// --------------------------------
// Functions
async function getDimensions(path) {
  let img = new Image();
  return await new Promise(resolve => { 
    img.onload = function() {
      resolve({width: this.width, height: this.height});
    };
    img.src = path;
  });
}

async function createScene(imgPath, folderID, gridSize=70) {
  //const imgPath = "assets/art/map/Fey Woods.jpg";
  let dimensions = await getDimensions(imgPath);
  console.log(dimensions);
  
  var splitPath = function (str) {
    let imageName = str.split('\\').pop().split('/').pop(); // remove path
    imageName = imageName.split('.').slice(0, -1).join('.'); // remove extension
    imageName = imageName.replaceAll("%20", " ").replaceAll("-", " ").replaceAll("_", " ");
    return imageName;
  }  
    
  /* gridType 1: square
  */
  let data = {
    name: splitPath(imgPath),
    width: dimensions.width,
    height: dimensions.height,
    img: imgPath,
    grid: gridSize,
    folder: folderID,
    gridDistance: 1,
    gridUnits: 'in',
    fogExploration: false,
    gridType: 1,
    backgroundColor: "#424242"
  };

  await Scene.create(data);
}
  
