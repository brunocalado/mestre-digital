//no toggle. Must deactivate through character sheet and Modifiers button for associated stat 

let mustRoll; 

let options = [ 
  {group: "Perception"}, 
  {name: "Perception", item: "perception"}, 
  {group: "Armor Class"}, 
  {name: "Armor Class", item: "ac"}, 
  {group: "Saves"}, 
  {name: "Fortitude", item: "fortitude"}, 
  {name: "Reflex", item: "reflex"}, 
  {name: "Will", item: "will"}, 
  {group: "Skills"}, 
  {name: "Acrobatics", item: "acrobatics"}, 
  {name: "Arcana", item: "arcana"}, 
  {name: "Athletics", item: "athletics"}, 
  {name: "Crafting", item: "crafting"}, 
  {name: "Deception", item: "deception"}, 
  {name: "Diplomacy", item: "diplomacy"}, 
  {name: "Intimidation", item: "intimidate"}, 
  {name: "Medicine", item: "medicine"}, 
  {name: "Nature", item: "nature"}, 
  {name: "Occultism", item: "occultism"}, 
  {name: "Performance", item: "perform"}, 
  {name: "Religion", item: "religion"}, 
  {name: "Society", item: "society"}, 
  {name: "Survival", item: "survival"}, 
  {name: "Stealth", item: "stealth"}, 
  {name: "Thievery", item: "thievery"} 
]; 

let content = `<div class="form-group"><p><label>Bonus for : </label><select id="selectTest">`; 

for (let i = 0 ; i < options.length ; i++) { 
  if (options[i].group !== undefined) 
    content += `<optgroup label='${options[i].group}'/>`; 
  else 
    content += `<option value='${i}'>${options[i].name}</option>`; 
} 

content += `</select></p>`; 
content += `<p><label>Bonus : </label><input id="Bonus" type="number" style="width: 80px" value=1 /></p>` 
content += `<p><label>Bonustext : </label><input id="BonusText" type="text" style="width: 80px" value="Raised Shield"/></p>` 
content += `<p><label>Bonustype : </label><input id="BonusType" type="text" style="width: 80px" value="circumstance" /></p>` 
content += `</div>`; 

 
let dialog = new Dialog({ 
  title: "Add Bonus to", 
  content: content, 
  buttons: { 
    roll: { 
      icon: "<i class='fas fa-check'></i>", 
      label: "Do it!", 
      callback: () => mustRoll = true, 
    }, 
    cancel: { 
      icon: "<i class='fas fa-times'></i>", 
      label: "Cancel", 
      callback: () => mustRoll = false, 
    }, 
  }, 

  default: "roll", 
  close: html => { 
    if (mustRoll) { 
      let choice = options[html.find('#selectTest')[0].value].item; 
      let bonus = Number(html.find('#Bonus')[0].value); 
  let bonustext = html.find('#BonusText')[0].value; 
  let bonustype = html.find('#BonusType')[0].value; 
      if (isNaN(bonus) || bonus == 0 ) actor.removeCustomModifier(choice, bonustext);
      actor.addCustomModifier(choice, bonustext, bonus, bonustype); 
    } 
  } 
});  

dialog.render(true);