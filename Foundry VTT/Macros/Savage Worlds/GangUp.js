const version = 'v1.0';
const chatimage = "icons/commodities/claws/claw-lizard-white-black.webp";

/* Gang Up p101 SWADE core

source: 
icon: icons/commodities/claws/claw-lizard-white-black.webp
*/

// Requires at least 1 target
if (game.user.targets.size == 0) {
  ui.notifications.error('You must target at least one token');
} else {
  messageToTheChat();
}

function messageToTheChat() {
  let token=Array.from(game.user.targets)[0]; // token will not be count
  let message = `<h2 style="color:red"><img style="vertical-align:middle" src=${chatimage} width="28" height="28">Gang Up</h2>`;
  message += `<p>To attack ${token.name} you will receive ${gangUp()}</p>`;

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
  //let tokenD=canvas.tokens.targeted[0]; // 
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
  
  enemies = Math.min( 4, (withinRangeOfToken.length-1) ); //up to a maximum of +4.
  allies = (alliedWithinRangeOfToken.length);
  
  if (allies>enemies) {
    modifier = Math.abs(enemies-allies)-1; 
  } else {
    modifier = (enemies-allies); 
  }

  //debug
  console.log('-----------------------');
  console.log('Enemies: ' + withinRangeOfToken.length);
  console.log('Allies: ' + alliedWithinRangeOfToken.length);
  console.log('Modifier: ' + modifier);
  console.log('-----------------------');
  
  return modifier;
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