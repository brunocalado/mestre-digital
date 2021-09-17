const version = 'v1.0';

/* Patch Actors

TODO 
- 

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/scum-villainy_patch_actors.js
icon: icons/tools/smithing/hammer-sledge-steel-grey.webp
*/

let message=``;
let characters = game.actors.contents.filter(e => e.data.type === 'character' && e.hasPlayerOwner);

if (characters==undefined) {
  ui.notifications.warn("Each player should own a character!");    
} else {
  
  // VARS
  const effects = ['Mechanic class', 'Muscle class', 'Mystic class', 'Pilot class', 'Scoundrel class', 'Speaker class', 'Stitch class'];
  const playbooks = ['Mechanic', 'Muscle', 'Mystic', 'Pilot', 'Scoundrel', 'Speaker', 'Stitch'];
  
  for(const character of characters) {    

    for (var i=0; i<=effects.length; i++) {     
      const effect = character.effects.find(e => e.data.label === effects[i]);
      if (effect!=undefined) {
        let changes = duplicate(effect.data.changes);        
        const playbookName = changes[0].value;
        if ( playbooks.includes(playbookName) ) {
          changes[0].value = translatePlaybook(playbookName);
          message += `<h2>${character.name}</h2><p>${playbookName} foi trocado por ${translatePlaybook(playbookName)}</p>`;
          await effect.update({changes});          
        } else {
          message += `<h2>${character.name}</h2><p>Nada foi feito. Tudo certo.</p>`;
        }          
      }      
    }
  }

  // to chat
  let chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    content: message
  };

  ChatMessage.create(chatData, {});
}

function translatePlaybook(playbook) {
  if (playbook == 'Mechanic') {
    return 'Mecânico';
  } else if (playbook == 'Muscle') {
    return 'Músculo';
  } else if (playbook == 'Mystic') {
    return 'Místico';
  } else if (playbook == 'Pilot') {
    return 'Piloto';
  } else if (playbook == 'Scoundrel') {
    return 'Malandro';
  } else if (playbook == 'Speaker') {
    return 'Comunicador';
  } else if (playbook == 'Stitch') {
    return 'Costureiro';
  }
}

