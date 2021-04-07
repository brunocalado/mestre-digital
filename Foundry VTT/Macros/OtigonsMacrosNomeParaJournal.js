/* version 0.1
canvas.tokens.controlled[0].actor;
*/

drawFromDnDActor('Spell Animations');
drawFromDnDActor('Explosions');
drawFromDnDActor('Ranged Weapon Attacks');
drawFromDnDActor('Melee Weapon Attacks');

/* Functions */
async function drawFromDnDActor(nomeCompendium) {
  let list_compendium = await game.packs.filter(p=>p.entity=='Macro');      
  let inside = await list_compendium.filter( p=>p.metadata.label==nomeCompendium )[0].getContent();     
  let tmp = ``;    
  
  for (var i in inside) { //console.log(inside[i]);  
    tmp += `<p>{{macro "${inside[i].name}"}}</p>`;    
  }

  createJournal({
    name: nomeCompendium,
    content: tmp

  });
}

async function createJournal(data) {  
  const instantJournal = await JournalEntry.create(data);     
}

