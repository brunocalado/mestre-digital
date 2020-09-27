/* Attack Assistant - v0.3
Features
- Rolls damage if success. It can add Expose Yourself Damage.
- Check for Precise Tag. Uses DEX instead of STR if it is present.
- Check for Damage Tag. Adds the number of it to the weapon damage.
- Change Default Attribute for the move.
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/Attack%20Assistant.js
Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/Attack%20Assistant.svg
*/

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
  <p style="text-align:center; vertical-align:center"><select id="selectedweapon" style=" width:250px;">${options}</select></p>
  <h2>Modifiers</h2>  
  <table>
    <tr>
    <td style="text-align:center; vertical-align:center"><b>Move:</b> <input id="move_mod" type="number" min="-10" max="10" style="width: 80px" value=0></td>
    <td style="text-align:center; vertical-align:center"><b>Damage:</b> <input id="damage_mod" type="number" min="-10" max="10" style="width: 80px" value=0></td>
    </tr>
  </table>  
  <h2>Options</h2>  
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="expose_yourself"/>Expose Yourself?</td>    
    </tr>
  </table> 
  </br>
  <h2>Change Move Attribute</h2>
  <table>
    <tr>
    <td></td>
    <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Default" checked="checked" />Default</td>    
    <td></td>
    </tr>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Strength"/>Strength</td>
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Dexterity"/>Dexterity</td>      
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Constitution"/>Constitution</td>            
    </tr>
    <tr>    
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Intelligence"/>Intelligence</td>      
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Wisdom"/>Wisdom</td>      
      <td style="text-align:center; vertical-align:center"><input type="radio" id="attribute" name="attribute" value="Charisma"/>Charisma</td>          
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
  // form data
  let weapon = canvas.tokens.controlled[0].actor.items.filter(el => el.data._id == html.find("#selectedweapon")[0].value )[0];
  let expose_yourself = html.find("#expose_yourself")[0].checked;
  let attributeChange = html.find('input[name="attribute"]:checked').val();  
  let move_mod = html.find("#move_mod")[0].value;
  let damage_mod = html.find("#damage_mod")[0].value;
  
  // data
  let playerSelected = canvas.tokens.controlled[0].actor;
  let playerDamageDice = playerSelected.data.data.attributes.damage.value;
  let playerDamageMod = playerSelected.data.data.attributes.damage.misc;
  let attribute;
  let weaponTagDamage = tagCheckDamage(weapon);
  
  attribute = attributeSelect(weapon, attributeChange, playerSelected);
  
  // Output
  let msg = `<h2>${weapon.data.name}</h2>`;
  msg+=`<p>Weapon Tags: ${weapon.data.data.tagsString}</p>`;
  if (attributeChange!='Default') { 
    msg+=`<p>Attribute used for the Move Roll is <b>${attributeChange}</b></p>`;
  }
  let dice = new Roll('2d6+' + attribute + '+' + move_mod).roll();
  let outcome = successCheck(dice);
  //console.log(dice);  
  if (outcome==1) { // 6 or less - failure 
    msg+=`<h3 style="color:#d40023">You failed!</h3>`;
    dice.toMessage({flavor: msg});  
  } else if (outcome==2) { // 7-9 - partial success
    let diceDamage = new Roll(playerDamageDice + '+' + weaponTagDamage + '+' + damage_mod).roll();
    msg+=`<h3 style="color:#00009c">Partial Success</h3>`
    dice.toMessage({flavor: msg});                
    diceDamage.toMessage({flavor: `<h3 style="color:#d40023">Damage</h3>`});
  } else if (outcome==3) { // 10+ - success
    let diceDamage;
    if (expose_yourself) {
      diceDamage = new Roll(playerDamageDice + '+1d6+' + weaponTagDamage + '+' + damage_mod).roll();
    } else {
      diceDamage = new Roll(playerDamageDice + '+' + weaponTagDamage + '+' + damage_mod).roll();
    }    
    msg+=`<h3 style="color:#249c00">Success</h3>`
    dice.toMessage({flavor: msg});                
    diceDamage.toMessage({flavor: `<h3 style="color:#d40023">Damage</h3>`});
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

function attributeSelect(weapon, attributeChange, playerSelected) {  
  if (attributeChange=='Default') { 
    if ( tagCheckPrecise(weapon) ) {
      return parseInt(playerSelected.data.data.abilities.dex['mod']);
    } else {
      return parseInt(playerSelected.data.data.abilities.str['mod']);
    }  
  } else if (attributeChange=='Strength') {
    return parseInt(playerSelected.data.data.abilities.str['mod']);
  } else if (attributeChange=='Dexterity') {
    return parseInt(playerSelected.data.data.abilities.dex['mod']);
  } else if (attributeChange=='Constitution') {
    return parseInt(playerSelected.data.data.abilities.con['mod']);
  } else if (attributeChange=='Intelligence') {
    return parseInt(playerSelected.data.data.abilities.int['mod']);
  } else if (attributeChange=='Wisdom') {
    return parseInt(playerSelected.data.data.abilities.wis['mod']);
  } else if (attributeChange=='Charisma') {
    return parseInt(playerSelected.data.data.abilities.cha['mod']);
  }
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

/* test stuff
  
  console.log('----------------------------');
  console.log(weapon);
  console.log(playerSelected);
  console.log(playerDamage);
  console.log('----------------------------');

canvas.tokens.controlled[0].actor
canvas.tokens.controlled[0].actor.data.data.attributes.damage.value;

*/
