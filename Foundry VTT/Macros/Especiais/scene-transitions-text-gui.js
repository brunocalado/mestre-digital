// YOU CAN CHANGE WHAT YOU NEED HERE
const audio           = 'worlds/monstro-da-semana/assets/horror-riser.mp3'; // Sound - path to audio file
const backgroundImage = ''; // pass any relative or absolute image url here.
const bgColor         = '#000000';
const bgOpacity       = 0.7;
const bgPos           = 'center center';
const bgSize          = 'cover'; // Image Size Options: auto contain
const delay           = 8000; //how long for transition to stay up | ms = 1000 == 1 second
const fadeIn          = 400; // ms = 1000 == 1 second - how long to fade in
const fadeOut         = 400; // ms = 1000 == 1 second - how long to fade out
const fontColor       = '#ffffff';
const fontSize        = '64px';
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
  const messages = ['Dia', 'Sombras', 'Entardecer', 'Poente', 'Anoitecer', 'Meia-noite'];

  let sceneList = ``;  
  for (let message of messages) {
    sceneList += `<option value="${message}">${message}</option>`;
  }

  let template = `      
    <h2 style="text-align:center;">Contagem Regressiva</h2>
    <p style="text-align:center;">
    <select id="mysceneid" type="text" style="text-align:center; width: 300px;">
      ${sceneList}
    </select>          
    </p>
    </br>
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
  const sceneID = false;
  const eventName = html.find("#mysceneid")[0].value;    
  let content = `<h3>Contagem Regressiva</h3></br>`;
  
  content += `<h1><b style="color:red;">${eventName}</b>!</h1>`; // Text

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
