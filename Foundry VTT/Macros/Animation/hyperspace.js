/*
source: 
icon: 
*/

// mp4
const assetPath = 'modules/hyperspace/hyperspace/';
const hyperspaceFilename = 'hyperspace.mp4';

let currentTile = await Tagger.getByTag("endgoal");  
let currentImg = currentTile[0].data.img;  

const version = 'v0.4';

let loopingBackground = canvas.background.placeables.find(t => t.data.img.endsWith(hyperspaceFilename)); //locate

main ();

async function main() {
  

  if(loopingBackground.data.alpha === 0.0){ //choose end image
    await new FilePicker({
      type: "imagevideo",
      displayMode: "tiles",
      current: currentImg,
      callback: imagePath => { playSequence(imagePath) }
    }).browse(assetPath + "backgrounds/");
  } else {
    playSequence();
  }  
}

async function playSequence(img) {    
  if(img) { //start
    new Sequence()
      .sound(assetPath + "sounds/FTLSound_Intro.ogg")
        .volume(0.55)
      .wait(1850)
      .effect(assetPath + "start-hyperspace.webm").anchor(0)
      .wait(1050)
      .animation()
        .on(loopingBackground)
        .opacity(1.0)
        .volume(1.0)
      .wait(1500)
      .thenDo(async() => { 
        await currentTile[0].document.update({img: img});
      })
      .play()
  } else { // end

    new Sequence()
      .sound(assetPath + "sounds/FTLSound_Outro.ogg")
        .volume(0.55)
      .wait(200)
      .effect(assetPath + "stop-hyperspace.webm").anchor(0)
      .wait(350)
      .animation()
        .on(loopingBackground)
        .opacity(0.0)
        .volume(0.0)
      .play()

  }
}