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

// Requires at least 1 target
if (canvas.tokens.controlled[0]===undefined || Array.from(game.user.targets)[0]===undefined){
  ui.notifications.warn("You must select a token and target another one!");    
} else {
  messageToTheChat();
}

function messageToTheChat() {
  let attacker=canvas.tokens.controlled[0];
  let target=Array.from(game.user.targets)[0];  
  let message = `<h2><img style="vertical-align:middle" src=${chatimage} width="28" height="28"> Grappling</h2>`;
  if (coreRules === true) {
      message = `<div class="swade-core"><h2><img style="vertical-align:middle" src=${chatimage} width="28" height="28"> @Compendium[swade-core-rules.swade-rules.od3tHNJTS8Ma4n2o]{Grappling} Grappling</h2>`;
  }  
  
  let attackerAthletics = attacker.actor.items.find(i => i.name === 'Athletics');
  let attackerAthleticsMod = attackerAthletics.data.data.die.modifier;
  if(!attackerAthleticsMod) { attackerAthleticsMod = 0; }
  let attackerDiceRoll = '1d'+attackerAthletics.data.data.die.sides + '+' + attackerAthleticsMod;
  
  let targetAthletics = target.actor.items.find(i => i.name === 'Athletics');
  let targetAthleticsMod = targetAthletics.data.data.die.modifier;
  if(!targetAthleticsMod) { targetAthleticsMod = 0; }
  let targetDiceRoll = '1d'+targetAthletics.data.data.die.sides + '+' + targetAthleticsMod;
  
  message += `<p>${attackerDiceRoll} and ${targetDiceRoll}</p>`;
  
  // send message
  let chatData = {
    user: game.user._id,    
    content: message
  };  
  ChatMessage.create(chatData, {});  
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