// Exploration Choice v1.1
// You must select the token. You need GM Screen.
// allows  choice for the exploration activity selected

if (!actor) { 
  ui.notifications.warn("You must have an actor selected."); 
  return;
} 

let funcExplo; 

let options1 = [ 
  {name: "Avoid Notice", item: "AN"},
  {name: "Defend", item: "D"},   
  {name: "Detect Magic", item: "DM"}, 
  {name: "Follow the Expert", item: "FTE"}, 
  {name: "Hustle", item: "H"}, 
  {name: "Investigate", item: "I"}, 
  {name: "Repeat a Spell", item: "RAS"}, 
  {name: "Scout", item: "S"}, 
  {name: "Search", item: "SCH"}, 
]; 

let content1 = `
<p><strong>TABLE: EXPLORATION ACTIVITIES</strong></p>
<table style="height: 235px; width: 750px;">
<tbody>
<tr style="height: 15px;">
<td style="background: #5d0000; color: white; width: 150px; height: 17px;"><strong>Activity name</strong></td>
<td style="background: #5d0000; color: white; width: 91px; text-align: center; height: 17px;"><strong>Traits</strong></td>
<td style="background: #5d0000; color: white; width: 955px; height: 17px;"><strong>Summary</strong></td>
</tr>
<tr style="height: 15px;">
<td style="background: #ede3c8; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="IE2nThCmoyhQA0Jn"> Avoid Notice</a></td>
<td style="background: #ede3c8; width: 91px; text-align: center; height: 17px;">&ndash;</td>
<td style="background: #ede3c8; width: 955px; height: 17px;">You attempt a Stealth check to avoid notice while traveling at half speed.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #f5efe0; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="cYtYKa1gDEl7y2N0"> Defend</a></td>
<td style="background: #f5efe0; width: 91px; text-align: center; height: 17px;">&ndash;</td>
<td style="background: #f5efe0; width: 955px; height: 17px;">You move at half your travel speed with your shield raised.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #ede3c8; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="Yb0C1uLzeHrVLl7a"> Detect Magic</a></td>
<td style="background: #ede3c8; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #ede3c8; width: 955px; height: 17px;">You cast detect magicat regular intervals.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #f5efe0; width: 150px; height: 65px; vertical-align: top;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="tfa4Sh7wcxCEqL29"> Follow the Expert</a></td>
<td style="background: #f5efe0; width: 91px; vertical-align: top; text-align: center; height: 65px;">auditory, concentrate, visual</td>
<td style="background: #f5efe0; width: 955px; height: 65px; vertical-align: top;">Choose an ally attempting a recurring skill check while exploring, such as climbing, or performing a different exploration tactic that requires a skill check (like Avoiding Notice).</td>
</tr>
<tr style="height: 15px;">
<td style="background: #ede3c8; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="JuqmIAnkL9hVGai8"> Hustle</a></td>
<td style="background: #ede3c8; width: 91px; text-align: center; height: 17px;">move</td>
<td style="background: #ede3c8; width: 955px; height: 17px;">You strain yourself to move at double your travel speed.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #f5efe0; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="EwgTZBWsc8qKaViP"> Investigate</a></td>
<td style="background: #f5efe0; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #f5efe0; width: 955px; height: 17px;">You seek out information about your surroundings while traveling at half speed.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #ede3c8; width: 150px; height: 17px;">Refocus</td>
<td style="background: #ede3c8; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #ede3c8; width: 955px; height: 17px;">You spend 10 minutes performing deeds to restore your magical connection.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #f5efe0; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="OQaFzDtVEOMWizJJ"> Repeat a Spell</a></td>
<td style="background: #f5efe0; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #f5efe0; width: 955px; height: 17px;">You repeatedly cast the same spell while moving at half speed.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #ede3c8; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="kV3XM0YJeS2KCSOb"> Scout</a></td>
<td style="background: #ede3c8; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #ede3c8; width: 955px; height: 17px;">You scout ahead and behind the group to watch danger, moving at half speed.</td>
</tr>
<tr style="height: 15px;">
<td style="background: #f5efe0; width: 150px; height: 17px;"><a class="entity-link" draggable="true" data-pack="pf2e.actionspf2e" data-lookup="TiNDYUGlMmxzxBYU"> Search</a></td>
<td style="background: #f5efe0; width: 91px; text-align: center; height: 17px;">concentrate</td>
<td style="background: #f5efe0; width: 955px; height: 17px;">You Seek meticulously for hidden doors ,concealed hazards, and so on.</td>
</tr>
</tbody>
</table>

<div class="form-group"><p><label>Select the exploration activity to perform </label><select id="selectTest">`; 

for (let i = 0 ; i < options1.length ; i++) { 
  if (options1[i].group !== undefined) 
    content1 += `<optgroup label='${options1[i].group}'/>`; 
  else 
    content1 += `<option value='${i}'>${options1[i].name}</option>`; 
} 

content1 += `</select></p>`; 
content1 += `</div>`; 
content1 += `<div><input type="checkbox" id="askroll"/>Ask for secret roll?</div></br>`;


let dialog = new Dialog({ 
  title: "Exploration Activity", 
  content: content1, 
  buttons: { 
    roll: { 
      icon: "<i class='fas fa-check'></i>", 
      label: "Confirm", 
      callback: () => funcExplo = true, 
    }, 
    cancel: { 
      icon: "<i class='fas fa-times'></i>", 
      label: "Cancel", 
      callback: () => funcExplo = false, 
    }, 
  }, 

  default: "roll", 
  close: html => { 
    if (funcExplo) {
      let choice = options[html.find('#selectTest')[0].value].name; 
      let askroll = html.find("#askroll")[0].checked;
      let setcolour = ``; 
      let saystuff = ``;
      let descoutput = ``;  

  if (choice === 'Avoid Notice'){ 
    setcolour += `000000`; 
    saystuff += `creeps around trying to move silently`; 
    descoutput += `You attempt a Stealth check to avoid notice while traveling at half speed. If you have the Swift Sneak feat, you can move at full Speed rather than half, but you still can’t use another exploration activity while you do so. If you have the Legendary Sneak feat, you can move at full Speed and use a second exploration activity. If you’re Avoiding Notice at the start of an encounter, you usually roll a Stealth check instead of a Perception check both to determine your initiative and to see if the enemies notice you (based on their Perception DCs, as normal for Sneak, regardless of their initiative check results).`; 
  } 

  if (choice === 'Defend'){
    setcolour += `000000`; 
    saystuff += `raises their shield and moves slowly looking for an imminent attack`; 
    descoutput += `You move at half your travel speed with your shield raised. If combat breaks out, you gain the benefits of Raising a Shield before your first turn begins.`; 
  } 

  if (choice === 'Detect Magic'){ 
    setcolour += `000000`; 
    saystuff += `looks around but not really focused on the real world`; 
    descoutput += `You cast detect magic at regular intervals. You move at half your travel speed or slower. You have no chance of accidentally overlooking a magic aura at a travel speed up to 300 feet per minute, but must be traveling no more than 150 feet per minute to detect magic auras before the party moves into them.`; 
  }
  if (choice === 'Follow the Expert'){ 
    setcolour += `000000`; 
    saystuff += `tries to help someone who looks like they know what they are doing`; 
    descoutput += `Choose an ally attempting a recurring skill check while exploring, such as climbing, or performing a different exploration tactic that requires a skill check (like Avoiding Notice). The ally must be at least an expert in that skill and must be willing to provide assistance. While Following the Expert, you match their tactic or attempt similar skill checks. Thanks to your ally’s assistance, you can add your level as a proficiency bonus to the associated skill check, even if you’re untrained. Additionally, you gain a circumstance bonus to your skill check based on your ally’s proficiency (+2 for expert, +3 for master, and +4 for legendary).`;
  } 
  if (choice === 'Hustle'){
    setcolour += `000000`; 
    saystuff += `jogs quickly onwards`; 
    descoutput += `You strain yourself to move at double your travel speed. You can Hustle only for a number of minutes equal to your Constitution modifier × 10 (minimum 10 minutes). If you are in a group that is Hustling, use the lowest Constitution modifier among everyone to determine how fast the group can Hustle together.`;
  } 
  if (choice === 'Investigate'){ 
    setcolour += `000000`; 
    saystuff += `peers intently at something, scratching their head`; 
    descoutput += `You seek out information about your surroundings while traveling at half speed. You use Recall Knowledge as a secret check to discover clues among the various things you can see and engage with as you journey along. You can use any skill that has a Recall Knowledge action while Investigating, but the GM determines whether the skill is relevant to the clues you could find.`; 
  } 
  if (choice === 'Repeat a Spell'){ 
    setcolour += `000000`; 
    saystuff += `mumbles something under their breath`; 
    descoutput += `You repeatedly cast the same spell while moving at half speed. Typically, this spell is a cantrip that you want to have in effect in the event a combat breaks out, and it must be one you can cast in 2 actions or fewer. In order to prevent fatigue due to repeated casting, you’ll likely use this activity only when something out of the ordinary occurs. You can instead use this activity to continue Sustaining a Spell or Activation with a sustained duration. Most such spells or item effects can be sustained for 10 minutes, though some specify they can be sustained for a different duration.`; 
  } 
  if (choice === 'Scout'){ 
    setcolour += `000000`; 
    saystuff += `keeps an eye out for any adversaries`;
    descoutput += `You scout ahead and behind the group to watch danger, moving at half speed. At the start of the next encounter, every creature in your party gains a +1 circumstance bonus to their initiative rolls.`; 
  }
  if (choice === 'Search') { 
    setcolour += `000000`; 
    saystuff += `looks through all the stuff around them`; 
    descoutput += `You Seek meticulously for hidden doors, concealed hazards, and so on. You can usually make an educated guess as to which locations are best to check and move at half speed, but if you want to be thorough and guarantee you checked everything, you need to travel at a Speed of no more than 300 feet per minute, or 150 feet per minute to ensure you check everything before you walk into it. You can always move more slowly while Searching to cover the area more thoroughly, and the Expeditious Search feat increases these maximum Speeds. If you come across a secret door, item, or hazard while Searching, the GM will attempt a free secret check to Seek to see if you notice the hidden object or hazard. In locations with many objects to search, you have to stop and spend significantly longer to search thoroughly.`;
  } 

  // create the message 
  let messageContent = '';  
  messageContent += `<p>${token.name} ${saystuff}</p>` 
  messageContent += `<details closed=""><summary><a>Exploration Activity: ${choice}</a></summary><p>"${descoutput}"</p></details>`  

  if (messageContent !== '') { 
    let chatData = { 
      user: game.user._id, 
      speaker: ChatMessage.getSpeaker(), 
      content: messageContent, 
    }; 
    ChatMessage.create(chatData, {}); 
    if(askroll) {
      dialog2.render(true); 
    }
  }}} 
}); 

dialog.options.width = 770;
dialog.position.width = 770;
dialog.render(true);

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

 

let dialog2 = new Dialog({ 

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