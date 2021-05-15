const version = 'v1.0';

/* Deviation p99 SWADE
If a blast template misses, it deviates 1d6″
for thrown weapons (such as grenades) and
2d6″ for fired projectiles. Multiply by 2 if the
attack was made at Medium Range, 3 if Long,
and 4 for Extreme.

Next roll a d12 and read it like a clock
facing to determine the direction the missile
deviates. A weapon can never deviate more
than half the distance to the original target
(that keeps it from going behind the thrower).

source: 
icon: icons/weapons/artillery/cannon-engraved-gold.webp
*/

getRequirements();

function getRequirements() {
  let template = `
  <h2>Weapon Type</h2>
  <table style="width:100%">
  <tr>
    <td><input type="radio" id="thrown" name="weapontype" value="thrown"><label for="thrown">Thrown weapon</label></td>
    <td><input type="radio" id="projectile" name="weapontype" value="projectile" checked="checked><label for="projectile">Projectile</label></td>    
  </tr>
  </table>  
  <h2>Range</h2>
  <table style="width:100%">
  <tr>
    <td><input type="radio" id="short" name="range" value="short" checked="checked><label for="thrown">Short</label></td>
    <td><input type="radio" id="medium" name="range" value="medium"><label for="projectile">Medium</label></td>    
    <td><input type="radio" id="long" name="range" value="long"><label for="projectile">Long</label></td>    
    <td><input type="radio" id="extreme" name="range" value="extreme"><label for="projectile">Extreme</label></td>    
  </tr>
  </table>    
  `;
  new Dialog({
    title: "Deviation",
    content: template,
    buttons: {
      ok: {
        label: "Go!",
        callback: async (html) => {
          rollForIt(html);
        },
      }
    },
  }).render(true);
}

function rollForIt(html) {
  const weapontype=html.find('input[name="weapontype"]:checked').val();
  const range=html.find('input[name="range"]:checked').val();
  let deviation;
  
  if (weapontype=='thrown') {
    deviation = diceRoll('1d6', range);
  } else {
    deviation = diceRoll('2d6', range);
  }
}

function diceRoll(die, range) {
  const rangeMultiplier = rangeCheck(range);
  let direction = new Roll('1d12').roll();
  const trueRange = directionCheck(direction);
  let roll = new Roll(die).roll();
  let message = `
  <h2>Deviation</h2>
  <div>
    <img style="vertical-align:middle" src="icons/containers/chest/chest-simple-walnut.webp" width="64" height="64">  
    <span><p>Move the blast <b>${roll.total*rangeMultiplier}"</b> to <b style="color:red">${direction.total}</b></p></span>    
  </div>      
  `;  
  
  if (direction) {
    message += `<div><b style="color:red">A weapon can never deviate more than half the distance to the original target (that keeps it from going behind the thrower).</b></div>`;
  }
  
  let tempChatData = {
    type: CHAT_MESSAGE_TYPES.ROLL,
    roll: roll,
    rollMode: game.settings.get("core", "rollMode"),
    content: message
  };     
  ChatMessage.create(tempChatData);  
  return roll.total;
}

function rangeCheck(range) {
  if (range=='short') {
    return 1;
  } else if (range=='medium') {
    return 2;
  } else if (range=='long') {
    return 3;
  } else if (range=='extreme') {
    return 4;
  }
}

function directionCheck(direction) {
  if (direction==4 || direction==5 || direction==6 || direction==7 || direction==8) {
    return true
  } else {
    return false
  } 
}
