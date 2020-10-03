let players = game.actors.entities.filter((t) => t.data.type === "character");

players[0].sheet.render(true);


(()=>{ 
  let macro_actor = game.user.targets.size !== 0 ? Array.from(game.user.targets)[0].actor
  : token !== undefined ? token.actor : character;

  if(!macro_actor) return;

  macro_actor.sheet.render(true); 
})();