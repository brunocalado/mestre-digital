const macroVersion = 'v0.1';
/* HP Manager
## Features
- Select a token and it'll be selected in the combo
- Choose the amount of HP to give or to remove.
- Send HP for everyone

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/HP%20Manager.js
icon: systems/dungeonworld/assets/icons/skills/blood_04.webp
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
  let currentHeroPoints = checkHeroHP();
  for (let i = 0; i < currentHeroPoints.length; i++) {
    let heroexp = parseInt(currentHeroPoints[i][1]);
    if (!heroexp) {      
      heroexp=0;
    }    
    currentHeroPointsList += '<li>' + currentHeroPoints[i][0] + ': <b style="color: red">' + currentHeroPoints[i][1] + '/' + currentHeroPoints[i][2] + '</b></li>';    
  }  
  
  let template = `
  <h2>Choose</h2>
  <p><b>Hero:</b> <select id="playerName" style="width: 200px">${playerNameList}</select></p>
  <p><b>Type:</b> <select id="recoverType" style="width: 200px">
    <option value="custom">Custom</option>
    <option value="makecamp" selected>Make Camp</option>  
    <option value="recover">Recover</option>    
    </select>
  </p>
  <p>
    <b>Custom value (must choose <b>Custom</b>):</b> <input id="customhp" type="number" min="-300" max="300" style="width: 80px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center; " value=0>
  </p>    
  <h2>Current HP</h2>
  <ul>
    ${currentHeroPointsList}
  </ul>
  `;
  
  new Dialog({
    title: `HP Manager - ${macroVersion}`,
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
  let recoverType = html.find("#recoverType")[0].value;
  let customhp = html.find("#customhp")[0].value;  

  if (playerName=='everyone') {    
    updateAllHerosHP(recoverType, customhp);
  } else { 
    updateHP(playerName, recoverType, customhp);
  }
}

async function updateHP(playerName, recoverType, customhp) {
  let total;
  let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
  let hp = 0;
  let currentHP = parseInt( character.data.data.attributes.hp.value );
  let maxHP = parseInt( character.data.data.attributes.hp.max );

  if (recoverType=='makecamp') {
    hp = Math.floor(maxHP/2);
  } else if (recoverType=='recover') {
    hp = maxHP;    
  } else {
    hp = parseInt( customhp );
  }
  
  if (!currentHP) {
    total = parseInt( hp );
  } else {
    total = currentHP + parseInt( hp );    
    if (total>maxHP) {
      total = maxHP;
    }
  }      
  await character.update({['data.attributes.hp.value']: total});
  hpMessage(character, hp, recoverType);
}

function updateAllHerosHP(recoverType, customhp) {
  let players = game.actors.entities.filter((t) => t.data.type === "character");
  
  players.map(async player => { 
    updateHP(player.name, recoverType, customhp);  
  });
}

function checkHeroHP() {
  let heros = [];
  let characters = game.actors.entities.filter((t) => t.data.type === "character");
  characters.forEach( (c) => {
    console.log(c.data.name + '/ ' + c.data.data.attributes.hp.value);    
    heros.push([c.data.name, c.data.data.attributes.hp.value, c.data.data.attributes.hp.max]);
  }); 
  return heros;
}

function hpMessage(character, points, recoverType) {
  let message = `<h2>${character.name}</h2>`;
  let icon;
  let currentHP = parseInt( character.data.data.attributes.hp.value );
  let maxHP = parseInt( character.data.data.attributes.hp.max );

  if (recoverType=='makecamp') {
    icon = 'icons/environment/settlement/tent.webp';
  } else if (recoverType=='recover') {
    icon = 'icons/sundries/survival/bedroll-blue-red.webp';
  } else {
    icon = 'systems/dungeonworld/assets/icons/skills/blood_04.webp';
  }
  
  message += `
  <div>
    <img style="vertical-align:middle" src="${icon}" width="32" height="32">  
    <span>received <b style="color: green">${points}</b> of HP. The current situation is <b style="color: red">${currentHP}/${maxHP}</b>.</span>
  </div>
  `;
  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: message
  };  
  ChatMessage.create(chatData, {});
}