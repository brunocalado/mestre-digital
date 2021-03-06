const macroVersion = 'v0.6';
/* EXP Manager
## Features
- Select a token and it'll be selected in the combo
- Choose the amount of experience to give or to remove.
- Send XP for everyone
- Warn about level available
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/EXP%20Manager.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/EXP%20Manager.svg
*/

const selectionType = false;

main();

function main() {
  let playersNames;
  if (selectionType) {
    console.log('');
    /*
    playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
    playersNames = User.collection.entities.filter(it => it.active === true);
    let users = User.collection.entities.filter(it => it.active === true);
    game.users is the master list. Each "user" object has a character field
    */
    
  } else {
    playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
  }
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
    let heroexp = parseInt(currentHeroPoints[i][1]);
    if (!heroexp) {      
      heroexp=0;
    }    
    if ( heroexp>=(heroexp+7) ) {
      levelAvailable = ' <b style="color:red">(level available)</b>'; 
    }
    currentHeroPointsList += '<li>' + currentHeroPoints[i][0] + ' - LV:' + currentHeroPoints[i][2]+ ' - XP:' + heroexp + levelAvailable+ '</li>';    
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
    title: `Experience Manager - ${macroVersion}`,
    content: template,
    buttons: {
      ok: {
        label: "Apply",
        callback: async (html) => {
          expmanager(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function expmanager(html){
  let playerName = html.find("#playerName")[0].value;
  let heroPoints = html.find("#heroPoints")[0].value;  
  if (playerName=='everyone') {    
    updateAllHerosXP(heroPoints);
  } else { 
    updateHeroPoints(playerName, heroPoints);
  }
}

async function updateHeroPoints(playerName, heroPoints) {
  let total;
  let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
  let currentHeroPoints = parseInt( character.data.data.attributes.xp.value );
  if (!currentHeroPoints) {
    total = parseInt( heroPoints );
  } else {
    total = currentHeroPoints + parseInt( heroPoints );    
  }      
  await character.update({['data.attributes.xp.value']: total});
  expMessage(character, heroPoints);
}

function updateAllHerosXP(heroPoints) {
  let players = game.actors.entities.filter((t) => t.data.type === "character");
  
  players.map(async player => { 
    let total;
    let currentHeroPoints = parseInt( player.data.data.attributes.xp.value);
    if (!currentHeroPoints) {
      total = parseInt( heroPoints );
    } else {
      total = currentHeroPoints + parseInt( heroPoints );
    }          
    await player.update({['data.attributes.xp.value']: total});
    expMessage(player, heroPoints);  
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

function expMessage(player, points) {
  let message = `<h2>${player.data.name}</h2>`;
  let levelup = '';  
  if ( parseInt(player.data.data.attributes.xp.value)>=(parseInt(player.data.data.attributes.level.value)+7) ) {
    levelup = '<span style="color:red"><b>Level Available!</b></span>'
  }    
  message += `
  <div>
    <img style="vertical-align:middle" src="systems/dungeonworld/assets/icons/macros/EXP%20Manager.svg" width="32" height="32">  
    <span>received <b>${points}</b> of experience.</span>
    ${levelup}
  </div>     
  `;  
  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: message
  };  
  ChatMessage.create(chatData, {});
}