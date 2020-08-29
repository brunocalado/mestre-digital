// Exploration Choice v1.1
// You must select the token. You need GM Screen.
// allows  choice for the exploration activity selected

if (!actor) { 
  ui.notifications.warn("You must have an actor selected."); 
  return;
} 

let mustRoll; 

let options = [ 
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

let content = `
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

for (let i = 0 ; i < options.length ; i++) { 
  if (options[i].group !== undefined) 
    content += `<optgroup label='${options[i].group}'/>`; 
  else 
    content += `<option value='${i}'>${options[i].name}</option>`; 
} 

content += `</select></p>`; 
content += `</div>`; 

let dialog = new Dialog({ 
  title: "Exploration Activity", 
  content: content, 
  buttons: { 
    roll: { 
      icon: "<i class='fas fa-check'></i>", 
      label: "Confirm", 
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
      let choice = options[html.find('#selectTest')[0].value].name; 
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
  }}} 
}); 

dialog.options.width = 760;
dialog.position.width = 760;
dialog.render(true);