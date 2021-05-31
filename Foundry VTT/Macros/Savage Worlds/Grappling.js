const version = 'v1.0';
const chatimage = "icons/commodities/biological/tentacle-purple-white.webp";
let coreRules = false;
if (game.modules.get("swade-core-rules")?.active) { coreRules = true; }

/* Grappling p101 SWADE core
IMPORTANT
- 

TODO
- 
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Grappling.js
icon: icons/commodities/biological/tentacle-purple-white.webp
*/

let attacker;
let target;  

// Requires at least 1 target
if (canvas.tokens.controlled[0]===undefined || Array.from(game.user.targets)[0]===undefined){
  ui.notifications.warn("You must select a token and target another one!");    
} else {
  attacker=canvas.tokens.controlled[0];
  target=Array.from(game.user.targets)[0];    
  messageToTheChat();
}

function messageToTheChat() {
  const gangupbonus = gangUp();
  const sizebonus = -calc();
  let attackerRolled;
  let targetRolled;
  let rolls3D=[];
  
  let message = `<h2><img style="vertical-align:middle" src=${chatimage} width="28" height="28"> Grappling</h2>`;
  if (coreRules) {
      message = `<div class="swade-core"><h2><img style="vertical-align:middle" src=${chatimage} width="28" height="28"> @Compendium[swade-core-rules.swade-rules.od3tHNJTS8Ma4n2o]{Grappling} Grappling</h2>`;
  }  
  
  let attackerAthletics = attacker.actor.items.find(i => i.name === 'Athletics');
  let attackerAthleticsMod = attackerAthletics.data.data.die.modifier;
  if(!attackerAthleticsMod) { attackerAthleticsMod = 0; }
  let attackerDiceRoll = '1d'+attackerAthletics.data.data.die.sides + 'x+' + attackerAthleticsMod + '+' + gangupbonus + '+' + sizebonus;
  attackerRolled = new Roll(attackerDiceRoll).roll();  
  rolls3D.push(attackerRolled);
  
  let targetAthletics = target.actor.items.find(i => i.name === 'Athletics');
  let targetAthleticsMod = targetAthletics.data.data.die.modifier;
  if(!targetAthleticsMod) { targetAthleticsMod = 0; }
  let targetDiceRoll = '1d'+targetAthletics.data.data.die.sides + 'x+' + targetAthleticsMod + '+' + gangupbonus + '+' + sizebonus;;
  targetRolled = new Roll(attackerDiceRoll).roll();  
  rolls3D.push(targetRolled);
  
  message += `<p>${attacker.name} is trying to grab ${target.name}.</p>`;
  if (coreRules) {
    message += `<ul><li>The @Compendium[swade-core-rules.swade-rules.hdXOHCe38O8KGyUz]{Ganging Up} bonus is: ${sizebonus}</li>`;
  } else {
    message += `<ul><li>The Gang Up bonus is: ${gangupbonus}</li>`;  
  }   
  if (coreRules) {
    message += `<li>The @Compendium[swade-core-rules.swade-rules.mbP0fwcquD98QtwX]{Size & Scale} penalty is: ${sizebonus}</li></ul>`;
  } else {
    message += `<li>The Size/Scale penalty is: ${sizebonus}</li></ul>`;    
  }  
        
  //outcome
  if ( attackerRolled.total>=targetRolled.total ) {
    if ( (attackerRolled.total+4)>=targetRolled.total ) {
      if (coreRules) {
        message += `<p>The ${target.name} is @Compendium[swade-core-rules.swade-rules.sTArFBzbesQkjLVg]{Bound and Entangled}.</p>`;
      } else {
        message += `<p>The ${target.name} is Entangled and Bound.</p>`;        
      }        
    } else {
      if (coreRules) {
        message += `<p>The ${target.name} is @Compendium[swade-core-rules.swade-rules.sTArFBzbesQkjLVg]{Entangled}.</p>`;
      } else {
        message += `<p>The ${target.name} is Entangled.</p>`;        
      }         
    }
  } else {
    message += `<p>${attacker.name} failed.</p>`;
  }  
  
  // send message
  let chatData = {
    user: game.user._id,    
    content: message
  };  
  ChatMessage.create(chatData, {});  
  
  let tempChatData = {
    type: CHAT_MESSAGE_TYPES.ROLL,
    roll: rolls3D[0],
    rollMode: game.settings.get("core", "rollMode"),
    content: `<p>${attacker.name}: ${rolls3D[0].total}</p>`
  };     
  ChatMessage.create(tempChatData);  
  tempChatData = {
    type: CHAT_MESSAGE_TYPES.ROLL,
    roll: rolls3D[1],
    rollMode: game.settings.get("core", "rollMode"),
    content: `<p>${target.name}: ${rolls3D[1].total}</p>`
  };     
  ChatMessage.create(tempChatData);  


  
}

// pg 101 swade core
// - Each additional adjacent foe (who isn’t Stunned)
// - adds +1 to all the attackers’ Fighting rolls, up to a maximum of +4.
// - Each ally adjacent to the defender cancels out one point of Gang Up bonus from an attacker adjacent to both.
function gangUp() {
  const debug_flag=true;
  
  let attacker=canvas.tokens.controlled[0];
  let defender=Array.from(game.user.targets)[0]; // token will not be count
  
  let tokenD=defender; // token will be removed 
  let itemRange=1; // dist 1''
  let enemies;
  let allies;
  let modifier=0;
  
  let withinRangeOfToken;
  let alliedWithinRangeOfToken;
  let alliedWithinRangeOfDefenderAndAttacker;
  
  if (attacker.data.disposition===-1) { // NPC (hostile) is attacking PCs (friendly)
    withinRangeOfToken = canvas.tokens.placeables.filter(t => 
      t.id !== attacker.id 
      && t.data.disposition === -1 
      && t.actor.data.data.status.isStunned === false 
      && t.visible 
      && withinRange(defender, t, itemRange)
    );    
    alliedWithinRangeOfToken = canvas.tokens.placeables.filter(t => 
      t.id !== defender.id 
      && t.data.disposition === 1 
      && t.actor.data.data.status.isStunned === false 
      && withinRange(defender, t, itemRange)
    );    
    //alliedWithinRangeOfDefenderAndAttacker intersection with attacker and defender
    alliedWithinRangeOfDefenderAndAttacker = alliedWithinRangeOfToken.filter(t => 
      t.data.disposition === 1 
      && t.actor.data.data.status.isStunned === false 
      && withinRange(attacker, t, itemRange)
    );    
  } else if (attacker.data.disposition===1) { // PCs (friendly) is attacking NPC (hostile)
    withinRangeOfToken = canvas.tokens.placeables.filter(t => 
      t.id !== attacker.id 
      && t.data.disposition === 1 
      && t.actor.data.data.status.isStunned === false 
      && t.visible 
      && withinRange(defender, t, itemRange)
    );    
    alliedWithinRangeOfToken = canvas.tokens.placeables.filter(t => 
      t.id !== defender.id 
      && t.data.disposition === -1 
      && t.actor.data.data.status.isStunned === false 
      && withinRange(defender, t, itemRange)
    );    
    //alliedWithinRangeOfDefenderAndAttacker intersection with attacker and defender
    alliedWithinRangeOfDefenderAndAttacker = alliedWithinRangeOfToken.filter(t => 
      t.data.disposition === -1 
      && t.actor.data.data.status.isStunned === false 
      && withinRange(attacker, t, itemRange)
    ); 
  }

  enemies = withinRangeOfToken.length;   
  allies = alliedWithinRangeOfDefenderAndAttacker.length;
  modifier = Math.max(0, (enemies-allies) );  

  //debug
  if (debug_flag) {
    console.log('-----------------------');
    console.log('Enemies: ' + withinRangeOfToken.length);
    console.log('Allies: ' + alliedWithinRangeOfToken.length);
    console.log('Allies Adjacent to Both: ' + alliedWithinRangeOfDefenderAndAttacker.length);
    console.log('Modifier: ' + modifier);
    console.log('-----------------------');
  }
  return Math.min( 4, modifier );
}

// function from Kekilla
function withinRange(origin, target, range) {
    const ray = new Ray(origin, target);
    let distance = canvas.grid.measureDistances([{ ray }], { gridSpaces: true })[0];
    return range >= distance;
}

// ======================
function calc() {
  let actorSize = attacker.actor.data.data.stats.size;
  let targetSize = target.actor.data.data.stats.size;
  let actorModifier = sizeToModifier(actorSize);
  let targetModifier = sizeToModifier(targetSize);
  let swat=false;   
  
  let diff;
  if (actorModifier == targetModifier) {
      return 0;
  } else {
      if (actorModifier < targetModifier) {
          if (swat) {
            diff = Math.abs(actorModifier) + Math.abs(targetModifier);
            diff = Math.max( (diff-4), 0);
          } else {                  
            diff = Math.abs(actorModifier) + Math.abs(targetModifier);
          }
          return diff;
      } else {
          if (swat) {
            diff = Math.abs(actorModifier) + Math.abs(targetModifier);                  
            diff = Math.max( (diff-4), 0);
          } else {
            diff = Math.abs(actorModifier) + Math.abs(targetModifier);
          }                
          return -diff;
      }
  }
}

function sizeToModifier(size) { //p179 swade core
    if (size == -4) {
        return -6;
    } else if (size == -3) {
        return -4;
    } else if (size == -2) {
        return -2;
    } else if (size >= -1 && size <= 3) {
        return 0;
    } else if (size >= 4 && size <= 7) {
        return 2;
    } else if (size >= 8 && size <= 11) {
        return 4;
    } else if (size >= 12 && size <= 20) {
        return 6;
    }
}