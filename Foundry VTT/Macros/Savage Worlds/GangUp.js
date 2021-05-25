const version = 'v1.0';
const chatimage = "icons/commodities/claws/claw-lizard-white-black.webp";

/* Gang Up p101 SWADE core
IMPORTANT
- YOU SHOULD DEFINE TOKEN DISPOSITION: FRIENDLY FOR PCS AND ALLIES. HOSTILE FOR ENEMIES

TODO
- detect dead

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/GangUp.js
icon: icons/commodities/claws/claw-lizard-white-black.webp
*/

// Requires at least 1 target
if (game.user.targets.size == 0) {
  //ui.notifications.error('You must target at least one token');
  messageToTheChat();
} else {
  messageToTheChat();
}

function messageToTheChat() {
  let target=Array.from(game.user.targets)[0]; // token will not be count
  let attacker=canvas.tokens.controlled[0];
  let message = `<h2 style="color:red"><img style="vertical-align:middle" src=${chatimage} width="28" height="28">Gang Up</h2>`;
  message += `<p><b style="color:red">${attacker.name}</b> will receive ${gangUp()} to attack <b style="color:darkblue">${target.name}</b></p>`;
  
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
// - Each ally adjacent to the defender cancels out one point
function gangUp() {    
  let attacker=canvas.tokens.controlled[0];
  let tokenD=Array.from(game.user.targets)[0]; // token will not be count
  
  let token=tokenD; 
  let itemRange=1; // dist 1''
  let enemies;
  let allies;
  let modifier=0;

  let withinRangeOfToken = canvas.tokens.placeables.filter(t => 
  t.id !== tokenD.id   
  && t.data.disposition === -1 
  && t.actor.data.data.status.isStunned === false 
  && t.visible 
  && withinRange(token, t, itemRange)
  );
  
  let alliedWithinRangeOfToken = canvas.tokens.placeables.filter(t => 
  t.id !== tokenD.id 
  && t.data.disposition === 1 
  && t.actor.data.data.status.isStunned === false 
  && withinRange(token, t, itemRange)
  );
  
  enemies = withinRangeOfToken.length;
  allies = alliedWithinRangeOfToken.length;
  
  if ( attacker.data.disposition==1 ) { //friendly   
    if (enemies>allies) {
      modifier = 0; 
      console.log('CASO 1');
    } else if ((allies+1)>enemies) {
      modifier = (allies-1)-(enemies); 
      console.log('CASO 2');
    } else {
      modifier = 0; 
      console.log('CASO 3');
    }
  } else { // neutral/hostile
    if (enemies>allies) {
      modifier = (enemies-1)-(allies); 
      console.log('CASO 4');
    } else if ((allies+1)>enemies) {
      modifier = 0; 
      console.log('CASO 5');
    } else {
      modifier = 0; 
      console.log('CASO 6');
    }
  } 

  //debug
  console.log('-----------------------');
  console.log('Enemies: ' + withinRangeOfToken.length);
  console.log('Allies: ' + alliedWithinRangeOfToken.length);
  console.log('Modifier: ' + modifier);
  console.log('-----------------------');

  return Math.min( 4, modifier );
}


// function from Kekilla
function withinRange(origin, target, range) {
    const ray = new Ray(origin, target);
    let distance = canvas.grid.measureDistances([{ ray }], { gridSpaces: true })[0];
    return range >= distance;
}

/*
&& t.actor.data.type === "npc" 
*/