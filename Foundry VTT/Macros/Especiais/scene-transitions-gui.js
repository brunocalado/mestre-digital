// YOU CAN CHANGE WHAT YOU NEED HERE
const audio           = ''; // Sound - path to audio file
const backgroundImage = ''; // pass any relative or absolute image url here.
const bgColor         = '#333333';
const bgOpacity       = 0.7;
const bgPos           = 'center center';
const bgSize          = 'cover'; // Image Size Options: auto contain
const content         = `<p>Get <b style="color:red;">Ready</b>!</p>`; // Text
const delay           = 5000; //how long for transition to stay up | ms = 1000 == 1 second
const fadeIn          = 400; // ms = 1000 == 1 second - how long to fade in
const fadeOut         = 400; // ms = 1000 == 1 second - how long to fade out
const fontColor       = '#ffffff';
const fontSize        = '28px';
const gmEndAll        = true; // whwn the fm clicks to end the transition - end for everyone
const gmHide          = true; // hide the transistion on other windows logged in as a GM
const skippable       = true; //Allows players to skip transition with a click before delay runs out.
// -------------------------------------------------------





// -------------------------------------------------------
/*
icon: icons/magic/time/arrows-circling-green.webp
source: 
*/

const version = 'v0.1';

main();

function main() {  

  let sceneList = `<option value="transitiononly">Just Show the Transition</option>`;  
  for (let scene of game.scenes) {
    sceneList += `<option value="${scene.id}">${scene.name}</option>`;
  }

  let template = `      
    <h2 style="text-align:center;">Choose the scene you want to transition</h2>
    <p style="text-align:center;">
    <select id="mysceneid" type="text" style="text-align:center; width: 300px;">
      ${sceneList}
    </select>          
    </p>
  `;

  new Dialog({
    title: `Scene Transition GUI - ${version}`,
    content: template,
    buttons: {
      ok: {
        label: "Transition!",
        callback: async (html) => {
          changeScene(html);
        },
      },
      cancel: {
        label: "Cancel",
      }
    },
    default: "ok"
  }, {}).render(true);
}

async function changeScene(html) {
  let sceneID;
  const mySceneNameID = html.find("#mysceneid")[0].value;    
  
  if ('transitiononly' == mySceneNameID) {
    sceneID = false;
  } else {
    sceneID = mySceneNameID;
  }

  Transition.macro({
    sceneID:      sceneID,
    content:      content,
    fontColor:    fontColor,
    fontSize:     fontSize,
    bgImg:        backgroundImage, // pass any relative or absolute image url here.
    bgPos:        bgPos,
    bgSize:       bgSize,
    bgColor:      bgColor,
    bgOpacity:    bgOpacity,
    fadeIn:       fadeIn, //how long to fade in
    delay:        delay, //how long for transition to stay up
    fadeOut:      fadeOut, //how long to fade out
    audio:        audio, //path to audio file
    skippable:    skippable, //Allows players to skip transition with a click before delay runs out.
    gmHide:       gmHide, // hide the transistion on other windows logged in as a GM
    gmEndAll:     gmEndAll, // whwn the fm clicks to end the transition - end for everyone
  }, true ) //show to the triggering user

}
