//player must select token, otherwise they will roll as player instead of character 

 

let mustRoll; 

 

const options = [ 

  {group: "Perception"}, 

  {name: "Perception", rollType: "attributes", item: "perception"}, 

  {group: "Saves"}, 

  {name: "Fortitude", rollType: "saves", item: "fortitude"}, 

  {name: "Reflex", rollType: "saves", item: "reflex"}, 

  {name: "Will", rollType: "saves", item: "will"}, 

  {group: "Skills"}, 

  {name: "Acrobatics", rollType: "skills", item: "Acrobatics", ability: "dex"}, 

  {name: "Arcana", rollType: "skills", item: "Arcana", ability: "int"}, 

  {name: "Athletics", rollType: "skills", item: "Athletics", ability: "str"}, 

  {name: "Crafting", rollType: "skills", item: "Crafting", ability: "int"}, 

  {name: "Deception", rollType: "skills", item: "Deception", ability: "cha"}, 

  {name: "Diplomacy", rollType: "skills", item: "Diplomacy", ability: "cha"}, 

  {name: "Intimidation", rollType: "skills", item: "Intimidation", abr: "itm", ability: "cha"}, 

  {name: "Medicine", rollType: "skills", item: "Medecine", ability: "wis"}, 

  {name: "Nature", rollType: "skills", item: "Nature", ability: "wis"}, 

  {name: "Occultism", rollType: "skills", item: "Occultism", ability: "int"}, 

  {name: "Performance", rollType: "skills", item: "Performance", abr: "prf", ability: "cha"}, 

  {name: "Religion", rollType: "skills", item: "Religion", ability: "wis"}, 

  {name: "Society", rollType: "skills", item: "Society", ability: "int"}, 

  {name: "Stealth", rollType: "skills", item: "Stealth", ability: "dex"}, 

  {name: "Survival", rollType: "skills", item: "Survival", ability: "wis"}, 

  {name: "Thievery", rollType: "skills", item: "Thievery", ability: "dex"}, 

]; 

 

let content = `<div class="form-group"><p><label>What to roll : </label><select id="selectTest">`; 

for (let i = 0 ; i < options.length ; i++) { 

  if (options[i].group !== undefined) 

    content += `<optgroup label='${options[i].group}'/>`; 

  else 

    content += `<option value='${i}'>${options[i].name}</option>`; 

} 

content += `</select></p>`; 

content += `</div>`; 

 

let dialog = new Dialog({ 

  title: "Blind GM Roll", 

  content: content, 

  buttons: { 

    roll: { 

      icon: "<i class='fas fa-check'></i>", 

      label: "Roll the die!", 

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

      let choice = options[html.find('#selectTest')[0].value]; 

      globalRoll(choice); 

    } 

  } 

}); 

 

dialog.render(true); 

 

function globalRoll(option) { 

  let targets = canvas.tokens.controlled; 

  let output = `<h2>${option.name}</h2>`; 

 

  for (let target of targets) { 

    let isPC = target.actor.data.type === "character"; 

    let {mod, rank} = getModAndRank(target, isPC, option); 

    output += testOutput (target.name, isPC, rank, mod); 

  } 

  let chatData = { 

    user:  game.users.find(i => i.isGM).id, 

    content: output + game.user.name, 

    whisper: [game.users.find(i => i.isGM).id], 

  }; 

  ChatMessage.create(chatData, {}); 

} 

 

function getModAndRank (target, isPC, option) { 

  let mod; 

  let rank; 

  if (option.rollType === "skills") { 

    // SPECIAL CASE : SKILLS ARE DIFFERENT FOR PCs and NPCs 

    if (isPC) { 

      // SKILL FOR PC 

      let abrev = (option.abr === undefined) ? option.item.substring(0,3).toLowerCase() : option.abr; 

      mod = target.actor.data.data[option.rollType][abrev].value; 

      rank = target.actor.data.data[option.rollType][abrev].rank; 

    } else { 

      // SKILL FOR NPC 

      let level = target.actor.data.data.details.level.value; 

      let itemSkill = target.actor.data.items.find(item => item.name === option.item); 

      if (itemSkill !== undefined) { 

        mod = itemSkill.data.mod.value; 

        if (level >= 17) 

          rank = 4; 

        else if (level >= 9) 

          rank = 3; 

        else if (level >= 5) 

          rank = 2; 

        else 

          rank = 1; 

      } else { 

        mod = target.actor.data.data.abilities[option.ability].mod; 

        rank = 0; 

      } 

    } 

  } else { 

    // PERCEPTION / SAVES FOR PCs and NPCs 

    mod = target.actor.data.data[option.rollType][option.item].value; 

    if (isPC) { 

      rank = target.actor.data.data[option.rollType][option.item].rank; 

    } else if (option.item === "perception") { 

      let level = target.actor.data.data.details.level.value; 

      if (level >= 13) 

        rank = 4; 

      else if (level >= 7) 

        rank = 3; 

      else 

        rank = 2; 

    } 

  } 

  return {mod, rank}; 

} 

 

function rankToText (rank) { 

  switch (rank) { 

    case 4: return "Legendary"; 

    case 3: return "Master"; 

    case 2: return "Expert"; 

    case 1: return "Trained"; 

    case 0: return "Untrained"; 

  } 

} 

 

function testOutput (name, isPC, rank, mod) { 

  let rankDescription = ""; 

  if (rank !== undefined) { 

    rankDescription = " (" + rankToText(rank); 

    if (!isPC) rankDescription += "?"; 

    rankDescription += ")"; 

  } 

 

  let roll = new Roll('1d20').roll(); 

  let resd20 = roll._result; 

  let resRoll = Number(resd20) + mod; 

 

  let style=`border: 1px solid darkgrey; 

             padding: 2px; 

             margin: 0 0 4px 0; 

             display: flex; 

             justify-content: space-between;`; 

  let output = `<h4 style="margin-bottom: 2px">${name}${rankDescription}</h4>`; 

  output += `<div style="${style}"> 

      <span>1d20 + ${mod} = <strong>${resRoll}</strong></span> 

    </div>` 

  return output; 

} 