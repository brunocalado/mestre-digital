// https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/-/wikis/PF2E-Foundry-Game-System/For-Players#other-automations

if (!actor) {
  ui.notifications.warn("You must select yourself.");
  return
}

let updates = [];
let consumed = "";
// Use Bolts
let item = actor.items.find(i=> i.name==="Arrows");

if(item === null) return

if (item.data.data.quantity.value < 1) {

  ui.notifications.warn(`${game.user.name} not enough ${name} remaining`);
} else {

  updates.push({"_id": item._id, "data.quantity.value": item.data.data.quantity.value - 1});
consumed += `${item.data.data.quantity.value - 1} arrows left<br>`;
}

if (updates.length > 0) {
  actor.updateEmbeddedEntity("OwnedItem", updates);
}
ChatMessage.create({
  user: game.user._id,
speaker: { actor: actor, alias: actor.name },
  content: consumed,
  type: CONST.CHAT_MESSAGE_TYPES.OTHER
});
