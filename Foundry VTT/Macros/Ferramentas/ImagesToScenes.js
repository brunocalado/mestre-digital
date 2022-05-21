/*
source: 
icon: icons/sundries/gaming/rune-card.webp

canvas.scene.data

await Folder.createDocuments([{name: "Test", type: "Scene"}])
so lets say you type for Folder Name: Meadows then that becomes a string variable via html.find(blah blah)[0].value... which you can then find... let folder = game.folders.getName(variable) followed by if(!folder) await Folder.createDocuments([{name: "Test", type: "Scene"}]) so if the folder is undefined, it makes it. then continue as you would in your macro
*/

const version = '1.4';
const debug = true;

main();

async function main() {
  new Dialog({
    title: `Image To Scene - ${version}`,
    content: `
    <h3>Important</h3>
    <ul>
      <li>To get the folder path right, you can drop a tile from it in the canvas and copy the path.</li>
    </ul>
    <h2>Configuration</h2>
    <div>
      <p><b>Folder Name:</b> </p>
      <input type="text" id="folderName" value='Cenas'/>
    </div>
    <div>
      <p><b>Folder Path:</b> </p>
      <input type="text" id="folderPath" value='modules/mymaps/animatedmaps'/>
    </div>    
    
    <p><b>Dimensions:</b> </p>
    <p>Set to 0 to auto detect images. If you're using videos you need to define the size: 1920x1080</p>
    <table>
    <tbody>
      <tr>
        <td>Width</td>
        <td>Height</td>
      </tr>
      <tr>
        <td><input type="number" id="width" value='1920'/></td>
        <td> <input type="number" id="height" value='1080'/></td>
      </tr>
    </tbody>
    </table>    
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
  
  const widthCustom = html.find("#width")[0].value;  
  const heightCustom = html.find("#height")[0].value;  
  
  const createdFolder = await Folder.createDocuments([{name: folderName, type: "Scene"}]);
  const folderID = createdFolder[0].id;  

  let {files} = await FilePicker.browse("data", folderPath);

  for (let img of files) {
    if (debug) { console.log('File: ' + img); }    
    if (widthCustom==0) {
      const myScene = await createScene(img, folderID, 50);
    } else {
      const myScene = await createScene(img, folderID, 50, widthCustom, heightCustom);
    }
  }
  
}

// --------------------------------
// Functions
async function getDimensions(path) {
  const fileExtension = path.split('.').pop(); 
  if (debug) {
    console.log( fileExtension );
  }
  
  let img = new Image();
  return await new Promise(resolve => { 
    img.onload = function() {
      resolve({width: this.width, height: this.height});
    };
    img.src = path;
  });
}

async function createScene(imgPath, folderID, gridSize=70, widthCustom=0, heightCustom=0) {
  //const imgPath = "assets/art/map/Fey Woods.jpg";
  let dimensions;
  let sceneWidth;
  let sceneHeight;
  if (widthCustom==0) {
    dimensions = await getDimensions(imgPath);
    sceneWidth = dimensions.width;
    sceneHeight = dimensions.height;    
    console.log(dimensions);
  } else {
    sceneWidth = parseInt(widthCustom);
    sceneHeight = parseInt(heightCustom);
  }  

  // Name Cleaning
  var splitPath = function (str) {
    let imageName = str.split('\\').pop().split('/').pop(); // remove path
    imageName = imageName.split('.').slice(0, -1).join('.'); // remove extension
    imageName = imageName.replace(/_/g, " ");
    imageName = imageName.replace(/-/g, " ");
    imageName = decodeURI( imageName )
    return imageName;
  }
/*
  var splitPath = function (str) {
    let imageName = str.split('\\').pop().split('/').pop(); // remove path
    imageName = imageName.split('.').slice(0, -1).join('.'); // remove extension
    imageName = imageName.replaceAll("%20", " ").replaceAll("-", " ").replaceAll("_", " ");
    return imageName;
  }  
*/    
  
  // --------------------------
  // Scene Optons
  let data = {
    name: splitPath(imgPath),
    width: sceneWidth,
    height: sceneHeight,
    img: imgPath,
    grid: gridSize,
    folder: folderID,
    gridDistance: 1,
    gridUnits: 'in',
    fogExploration: false,
    gridType: 1,
    backgroundColor: "#000000",
    padding: 0,
    gridAlpha: 0,
    navigation: false
  };

  await Scene.create(data);
}
  
