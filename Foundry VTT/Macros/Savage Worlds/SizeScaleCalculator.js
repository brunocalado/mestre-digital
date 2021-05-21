const version = 'v1.4';
const chatimage = "icons/tools/hand/scale-balances-merchant-brown.webp";

/* Size Scale p106 SWADE

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/SizeScaleCalculator.js
icon: icons/tools/hand/scale-balances-merchant-brown.webp
*/

let tokenActor=canvas.tokens.controlled[0];
let tokenTarget=Array.from(game.user.targets)[0];

if (tokenActor===undefined || tokenTarget===undefined){
  ui.notifications.warn("You must select a token and target another one!");    
} else {
  rollForIt();  
}

function rollForIt() {
  let actorSize = tokenActor.actor.data.data.stats.size;  
  let targetSize = tokenTarget.actor.data.data.stats.size;
  let actorModifier = sizeToModifier(actorSize);
  let targetModifier = sizeToModifier(targetSize);
  let modifier = calc(actorModifier, targetModifier);

  let message = `<h2 style="color:red"><img style="vertical-align:middle" src=${chatimage} width="28" height="28">Size/Scale Calculator</h2>`;
  message += `<ul><li>${tokenActor.name}: Size=${actorSize} / Modifier=${actorModifier}</li>`;
  message += `<li>${tokenTarget.name}: Size=${targetSize} / Modifier=${targetModifier}</li></ul>`;
  message += `<h3 style="color:red">Result</h3>`;
  if (modifier!=0) {
    message += `<ul><li>${tokenActor.name} has <b style="color:red">${modifier}</b> to attack ${tokenTarget.name}.</li>`;
    message += `<li>${tokenTarget.name} has <b style="color:red">${calc(targetModifier, actorModifier)}</b> to attack ${tokenActor.name}.</li></ul>`;
  } else {
    message += `<p><b>There is no modifier.</b> They have the same Scale.</p>`;
  }

  // send message
  let chatData = {
    user: game.user._id,    
    content: message
  };  
  ChatMessage.create(chatData, {});  
}

function calc(actorModifier, targetModifier) {
  let diff;
  if (actorModifier==targetModifier) {
    return 0;
  } else {    
    if (actorModifier<targetModifier) {          
      diff = Math.abs(actorModifier) + Math.abs(targetModifier);
      return diff;
    } else {
      diff = Math.abs(actorModifier) + Math.abs(targetModifier);
      return -diff;
    }
  }       
}

function sizeToModifier(size) { //p179 swade core
  if ( size==-4 ) {
    return -6;
  } else if ( size==-3 ) {
    return -4;
  } else if ( size==-2 ) {
    return -2;
  } else if ( size>=-1 && size<=3 ) {
    return 0;
  } else if ( size>=4 && size<=7 ) {
    return 2;
  } else if ( size>=8 && size<=11 ) {
    return 4;
  } else if ( size>=12 && size<=20 ) {
    return 6;
  }  
}




