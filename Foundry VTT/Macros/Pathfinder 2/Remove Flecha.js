const nomeDoItem = 'Arrows';

const version = 'v0.2';
/* Remove Ammo 

icon: icons/weapons/ammunition/arrows-barbed-white.webp
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Pathfinder%202/Remove%20Flecha.js
*/

if (!actor) {
  ui.notifications.warn("You must select yourself.");  
} else {
  (async () => { //async 
    
  let updates = [];
  let consumed = "";
  // Use Bolts
  let item = actor.items.find(i=> i.name===nomeDoItem);

  if (item === null || item.data.data.quantity.value < 1) {
    ui.notifications.warn(`${game.user.name} não tem flechas disponíveis!`);
  } else {
    updates.push({"_id": item._id, "data.quantity.value": item.data.data.quantity.value - 1});
    consumed += `<b>${item.data.data.quantity.value - 1}</b> flechas restantes.<br>`;
    

    if (updates.length > 0) {
      await actor.updateEmbeddedEntity("OwnedItem", updates);
    }

    ChatMessage.create({
      user: game.user._id,
      speaker: { actor: actor, alias: actor.name },
      content: consumed    
    });
  }

  })(); //async end
}
