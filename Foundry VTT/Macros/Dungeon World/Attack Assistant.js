/* Attack Assistant - v0.2
Features
- 
Source: 
Icon: 
*/

let DEBUG = true;

main();

function main() {
  let weapons = canvas.tokens.controlled[0].actor.items.filter(el => el.data.type == "equipment").filter(el => el.data.data.itemType == "weapon");

  console.log(weapons) //Testing to ensure the item is correctly selected

  //Display the Chat Card for the selected item
  let options = "";

  for (let wep of weapons) {
    options += `<option value=${wep.id}>${wep.data.name}`
  }

  let dialogTemplate = `
  <h1>Select Weapon</h1>
  <p><select id="selectedweapon">${options}</select></p>
  </br>
  <h1>Options</h1>  
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="expose_yourself"/>Expose Yourself?</td>    
    </tr>
  </table> 
  `;

  new Dialog({
    title: "Available Weapons:",
    content: dialogTemplate,
    buttons: {
      Attack: {
        label: "Attack",
        callback: async (html) => {
          rollDamage(html);
        }
      },
      Cancel: {
        label: "Cancel"
      }
    }
  }).render(true);
}
async function rollDamage(html) {
  let weapon = canvas.tokens.controlled[0].actor.items.filter(el => el.data._id == html.find("#selectedweapon")[0].value )[0];
  let playerSelected = canvas.tokens.controlled[0].actor;
  let playerDamage = playerSelected.data.data.attributes.damage.value;
  let playerDamageMod = playerSelected.data.data.attributes.damage.misc;
  let attribute;
  let weaponTagDamage = tagCheckDamage(weapon);
  
  if ( tagCheckPrecise(weapon) ) {
    attribute=parseInt(playerSelected.data.data.abilities.dex['mod']);
  } else {
    attribute=parseInt(playerSelected.data.data.abilities.str['mod']);
  }
  
  console.log('----------------------------');
  console.log(weapon);
  console.log(playerSelected);
  console.log(playerDamage);
  console.log('----------------------------');
  
  // Output
  let msg = `<h2>${weapon.data.name}</h2>`;
  let dice = new Roll('2d6+' + attribute).roll();
  let outcome = successCheck(dice);
  //console.log(dice);  
  if (outcome==1) { // 6 or less - failure 
    msg+=`<p>You failed!</p>`;
    dice.toMessage({flavor: msg});  
  } else if (outcome==2) { // 7-9 - partial success
    let diceDamage = new Roll(playerDamage + '+' + weaponTagDamage).roll();
    msg+=`<p>Partial Success</p>`
    dice.toMessage({flavor: msg});                
    diceDamage.toMessage();
  } else if (outcome==2) { // 10+ - success
    let diceDamage = new Roll(playerDamage + '+' + weaponTagDamage).roll();
    msg+=`<p>Success</p>`
    dice.toMessage({flavor: msg});                
    diceDamage.toMessage();                
  }
}

function tagCheckDamage(weapon) {
  let tags = weapon.data.data.tagsString.split(',');
  let tmp='';
  let output = 0;
  for (let i = 0; i < tags.length; i++) {
    tmp = tags[i].trim();
    if ( tmp.search(/damage/i)>-1 ) {      
      output = parseInt(tmp.match(/\d/i)[0]);
    }
  }
  return output;
}

function tagCheckPrecise(weapon) {
  let tags = weapon.data.data.tagsString.split(',');
  let tmp='';
  let output = false;
  for (let i = 0; i < tags.length; i++) {
    tmp = tags[i].trim();
    if ( tmp.search(/precise/i)>-1 ) {      
      output = true;
    }
  }
  return output;
}

function successCheck(dicePool) {  
  let total = dicePool.total;
  if (total>=7 && total<=9) {
    return 2;
  } else if (total>=10) {
    return 3;
  } else if (total<=6) {
    return 1;
  }    
}


