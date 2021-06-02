
/* All tokens to Combat v1.1
* - This macro select all tokens in the scene
* - Add all of them to the combat tracker
* - Roll Initiave for all
* modified from @atnoslen with a little help from @Atropos (thanks!) 
* source: 
* icon: icons/magic/time/clock-stopwatch-white-blue.webp
*/

(async () => {
  const scene = game.scenes.contents.filter(scene => scene.active === true)[0];
  let tokens = [];
  
  let startCRoll=async function rollAndStart() {
    await game.combat.rollAll();
    await game.combat.startCombat();
  }

  if (!game.combat) {
    scene.data.tokens.forEach(function(token) {
      tokens.push({tokenId:token.id});
    });

    Combat.create({scene:scene.data._id, combatants:tokens}).then(startCRoll);

  } else {
    // Combat already exists, add the missing tokens.
    // This assumes createCombatant is expensive, so create an array
    // instead of calling individually.
    scene.data.tokens.forEach(function(token) {
      if (game.combat.combatants.filter(combatant => combatant.tokenId === token.id).length === 0) {
        tokens.push({tokenId:token.id});
      }
    });

    //game.combat.createCombatant(tokens).then(startCRoll);
    game.combat.createEmbeddedDocuments("Combatant", tokens).then(startCRoll);

    //The Combat#createCombatant method has been deprecated in favor of Combatant.create and will be removed in 0.9.0
  }
  
})()

