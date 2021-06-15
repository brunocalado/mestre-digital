const version = 'v1.0';
const chatimage = "icons/magic/control/fear-fright-white.webp";

/* Unshaken

source: 
icon: icons/magic/control/fear-fright-white.webp
*/

let bennies;
let token;
let bv;

if (canvas.tokens.controlled[0]===undefined) {
  ui.notifications.error("Please select a token."); // No Token is Selected
} else {
  token = canvas.tokens.controlled[0];
  main();
}

async function main() {
  if (token.actor.data.data.status.isShaken === true) {
    rollUnshake();
  } else if (token) {
    token.actor.update({ "data.status.isShaken": true });
    ChatMessage.create({
      user: game.user.id,
      content: `<p><b style="color:red">${game.user.name}</b> is Shaken now!</p>`,
    });        
  }
}

async function rollUnshake() {
  const edgeNames = ['combat reflexes', 'demon', 'undead', 'construct', 'undead (harrowed)'];
  const actorAlias = speaker.alias;
  // ROLL SPIRIT AND CHECK COMBAT REFLEXES
  let spirit = '{1d' + token.actor.data.data.attributes.spirit.die.sides + 'x+' + token.actor.data.data.attributes.spirit.die.modifier+',1d6x}';  
  let spiritDice = new Roll(spirit).roll({ async : false });  
  let traitdie = spiritDice.terms[0].results[0].result;
  let wilddie = spiritDice.terms[0].results[1].result;  
  let spiritRolled=Math.max(traitdie, wilddie);
  
  const edges = token.actor.data.items.filter(function (item) {
    return edgeNames.includes(item.name.toLowerCase()) && (item.type === "edge" || item.type === "ability");
  });
  
  let rollWithEdge = spiritRolled;
  let edgeText = "";
  for (let edge of edges) {
    rollWithEdge += 2;
    edgeText += `<br/><i>+ ${edge.name}</i>`;
  }
  
  let chatData = `<div><h2><img style="vertical-align:middle" src=${chatimage} width="28" height="28">Shaken</h2>`;    
  chatData += `${actorAlias} rolled <b style="color:blue"> ${rollWithEdge} </b>`;
  
  // Checking for a Critical Failure.
  if ( spiritDice.terms[0].results[0].result==1 && spiritDice.terms[0].results[1].result==1 ) {
    ui.notifications.notify("You've rolled a Critical Failure!");
    chatData += `${actorAlias} rolled a <span style="font-size:150% color:red"> Critical Failure! </span>`;
  } else {
    if (rollWithEdge <= 3) {
        chatData += ` and remains Shaken.`;
        useBenny();
    } else if (rollWithEdge >= 4) {
        chatData += `, is no longer Shaken and may act normally.`;
        token.actor.update({ "data.status.isShaken": false });
    }
    chatData += ` ${edgeText}`;
  }
  ChatMessage.create({ content: chatData+`</div>` });
  spiritDice.toMessage();
}

function useBenny() {
  bv = checkBennies();
  if (bv > 0) {
    new Dialog({
      title: 'Spend a Benny?',
      content: `Do you want to spend a Benny to act immediately? (You have ${bv} Bennies left.)`,
      buttons: {
          one: {
            label: "Yes.",
            callback: (html) => {
              spendBenny();
              token.actor.update({ "data.status.isShaken": false });
            }
          },
          two: {
            label: "No.",
            callback: (html) => { return; },
          }
        },
        default: "one"
      }).render(true)
  }
  else {
      return;
  }
}

// Check for Bennies
function checkBennies() {
  bennies = token.actor.data.data.bennies.value;

  // Non GM token has <1 bennie OR GM user AND selected token has <1 benny
  if ((!game.user.isGM && bennies < 1) || (game.user.isGM && bennies < 1 && game.user.getFlag("swade", "bennies") < 1)) {
    ui.notifications.error("You have no more bennies left.");
  }
  if (game.user.isGM) {
    bv = bennies + game.user.getFlag("swade", "bennies");
  }
  else {
    bv = bennies;
  }
  return bv;
}

// Spend Benny function
async function spendBenny() {
  bennies = token.actor.data.data.bennies.value;
  //Subtract the spend, use GM benny if user is GM and token has no more bennies left or spend token benny if user is player and/or token has bennies left.
  if (game.user.isGM && bennies < 1) {
    game.user.setFlag("swade", "bennies", game.user.getFlag("swade", "bennies") - 1)
  } else {
    token.actor.update({
      "data.bennies.value": bennies - 1,
    })
  }

  //Show the Benny Flip
  if (game.dice3d) {
    game.dice3d.showForRoll(new Roll("1dB").roll({ async : false }), game.user, true, null, false);
  }

  //Chat Message to let the everyone know a benny was spent
  ChatMessage.create({
    user: game.user.id,
    content: `<p><b style="color:red">${game.user.name}</b> spent a Benny and <b style="color:red">${token.name}</b> may act normally now.</p>`,
  });
}


