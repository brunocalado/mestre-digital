const version = 'v1.1';
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
  let modifier = calc(actorSize, targetSize);

  let message = `<h2 style="color:red"><img style="vertical-align:middle" src=${chatimage} width="28" height="28">Size/Scale Calculator</h2>`;
  message += `<ul><li>${tokenActor.name} Size : ${actorSize}.</li>`;
  message += `<li>${tokenTarget.name} Size: ${targetSize}.</li></ul>`;
  if (modifier!=0) {
    message += `<ul><li>${tokenActor.name} has <b style="color:red">${modifier}</b> to attack ${tokenTarget.name}.</li>`;
    message += `<li>${tokenTarget.name} has <b style="color:red">${calc(targetSize, actorSize)}</b> to attack ${tokenActor.name}.</li></ul>`;
  } else {
    message += `<p>They have the same size. There is no modifier.</p>`;
  }

  // send message
  let chatData = {
    user: game.user._id,    
    content: message
  };  
  ChatMessage.create(chatData, {});  
}

function calc(actorSize, targetSize) {
  if (actorSize==targetSize) {
    return 0;
  } else {
    let diff = Math.abs(actorSize) + Math.abs(targetSize);
    if (actorSize<targetSize) {    
      return diff;
    } else {
      return -diff;
    }
  }       
}