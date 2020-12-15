const version = 'v0.1';
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
  let item = actor.items.find(i=> i.name==="Arrows");

  if (item.data.data.quantity.value < 1) {
    ui.notifications.warn(`${game.user.name} not enough ${name} remaining`);
  } else {
    updates.push({"_id": item._id, "data.quantity.value": item.data.data.quantity.value - 1});
      consumed += `${item.data.data.quantity.value - 1} flechas restantes<br>`;
    }
    
    if (updates.length > 0) {
      await actor.updateEmbeddedEntity("OwnedItem", updates);
    }

    ChatMessage.create({
    user: game.user._id,
    speaker: { actor: actor, alias: actor.name },
    content: consumed    
    });
  
  })(); //async end
}