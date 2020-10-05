/* EXP Manager - v0.3
## Features
- Select a token and it'll be selected in the combo
- Choose the amount of experience to give.
- Send XP for everyone
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/EXP%20Manager.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/EXP%20Manager.svg
*/

main();

function main() {
  let playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
  let playerNameList;
  let currentHeroPointsList = '';
  let playerSelected;
  if (actor) {   /* get selected token */
    playerSelected = canvas.tokens.controlled[0].actor.name;        
    playerNameList = `<option value="everyone">Everyone</option>`;  
  } else {
    playerNameList = `<option value="everyone" selected>Everyone</option>`;  
  }    
  playersNames.map((el) => {      
    if (el===playerSelected) {
      playerNameList += `<option value="${el}" selected>${el}</option>`;
    } else {
      playerNameList += `<option value="${el}">${el}</option>`;      
    }    
  });
  
  /* Show actual xp points*/
  let currentHeroPoints = checkHeroExp();
  for (let i = 0; i < currentHeroPoints.length; i++) {
    let levelAvailable='';
    if ( parseInt(currentHeroPoints[i][1])>=(parseInt(currentHeroPoints[i][2])+7) ) {
      levelAvailable = ' <b style="color:red">(level available)</b>'; 
    }
    currentHeroPointsList += '<li>' + currentHeroPoints[i][0] + ' - LV:' + currentHeroPoints[i][2]+ ' - XP:' + currentHeroPoints[i][1] + levelAvailable+ '</li>';    
  }  
  
  let template = `
  <h2>Choose</h2>
  <p><b>Hero:</b> <select id="playerName" style="width: 200px">${playerNameList}</select></p>
  <p>
    <b>How much points do you want to give?</b> <input id="heroPoints" type="number" min="-10" max="10" style="width: 80px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center; " value=1>
  </p>    
  <h2>Current Experience Points</h2>
  <ul>
    ${currentHeroPointsList}
  </ul>
  `;
  
  new Dialog({
    title: "Experience Manager v0.3",
    content: template,
    buttons: {
      ok: {
        label: "Apply",
        callback: (html) => {
          expmanager(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

function expmanager(html){
  let playerName = html.find("#playerName")[0].value;
  let heroPoints = html.find("#heroPoints")[0].value;  
  if (playerName=='everyone') {    
    updateAllHerosXP(heroPoints);
  } else { 
    updateHeroPoints(playerName, heroPoints);
  }
}

function updateHeroPoints(playerName, heroPoints) {
  let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
  let currentHeroPoints = parseInt( character.data.data.attributes.xp.value);
  let total = currentHeroPoints + parseInt( heroPoints );
  character.update({['data.attributes.xp.value']: total});
}

function updateAllHerosXP(heroPoints) {
  let players = game.actors.entities.filter((t) => t.data.type === "character");
  players.map((player) => {
    let currentHeroPoints = parseInt( player.data.data.attributes.xp.value);
    let total = currentHeroPoints + parseInt( heroPoints );
    player.update({['data.attributes.xp.value']: total});
  });
}
  
function checkHeroExp() {
  let heros = [];
  let characters = game.actors.entities.filter((t) => t.data.type === "character");
  characters.forEach( (c) => {
    //console.log(c.data.name + '/ ' + c.data.data.attributes.heroPoints.rank);    
    heros.push([c.data.name, c.data.data.attributes.xp.value, c.data.data.attributes.level.value]);
  }); 
  return heros;
}