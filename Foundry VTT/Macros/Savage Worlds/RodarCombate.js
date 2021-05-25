/* All tokens to Combat v1.0
* - This macro select all tokens in the scene
* - Add all of them to the combat tracker
* - Roll Initiave for all
* modified from @atnoslen with a little help from @Atropos (thanks!) 
* source: 
* icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Qualquer/Tokens%20da%20Cena%20no%20Combate.svg
*/

(async () => {

  const scene = game.scenes.entities.filter(scene => scene.active === true)[0];
  let tokens = [];
  
  let startCRoll=async function rollAndStart() {
    await game.combat.rollAll();
    await game.combat.startCombat();
  }

  if (!game.combat){
    scene.data.tokens.forEach(function(token) {
      tokens.push({tokenId:token._id});
    });

    Combat.create({scene:scene.data._id, combatants:tokens}).then(startCRoll);

  } else {
    // Combat already exists, add the missing tokens.
    // This assumes createCombatant is expensive, so create an array
    // instead of calling individually.
    scene.data.tokens.forEach(function(token) {
      if (game.combat.combatants.filter(combatant => combatant.tokenId === token._id).length === 0) {
        tokens.push({tokenId:token._id});
      }
    });

    game.combat.createCombatant(tokens).then(startCRoll);
  }
  
})()

