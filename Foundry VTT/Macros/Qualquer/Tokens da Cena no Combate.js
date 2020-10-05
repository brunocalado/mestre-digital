/* All tokens to Combat v1.3
* - This macro select all tokens in the scene
* - Add all of them to the combat tracker
* - Roll Initiave for all
* modified from @atnoslen with a little help from @Atropos (thanks!) 
* source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Qualquer/Tokens%20da%20Cena%20no%20Combate.js
* icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Qualquer/Tokens%20da%20Cena%20no%20Combate.svg
*/

getRequirements();

function getRequirements() {
  const scene = game.scenes.entities.filter(scene => scene.active === true)[0];
  let tokens_list = [];
  scene.data.tokens.forEach(function(token) {
    tokens_list += `<li>${token.name}</li>`;
  });
    
  let template = `
  <h2>Tokens</h2>
  <ul>
    ${tokens_list}
  </ul>    
  <h2>Opções</h2>
  <table style="width:100%">
  <tr>
    <td><input type="radio" id="rollall" name="rolltype" value="rollall"><label for="rollall">Rolar para Todos?</label></td>
    <td><input type="radio" id="rollnpc" name="rolltype" value="rollnpc" checked="checked><label for="rollnpc">Rolar apenas para NPC?</label></td>    
  </tr>
  </table>  
  <p>
  <input type="checkbox" id="startcombat" checked/>Iniciar Combate?
  </p>
  `;
  new Dialog({
    title: "Todo Mundo para o Combate",
    content: template,
    buttons: {
      ok: {
        label: "Manda Pau!",
        callback: async (html) => {
          rollForIt(html);
        },
      }
    },
  }).render(true);
}

function rollForIt(html) {
  const dice=html.find('input[name="rolltype"]:checked').val();
  let flagstartcombat=html.find("#startcombat")[0].checked;
  
  const scene = game.scenes.entities.filter(scene => scene.active === true)[0];
  let tokens = [];

  let startCRoll=function rollAndStart() {
    if(dice=='rollall') {
      game.combat.rollAll();
    } else {
      game.combat.rollNPC();
    }      
    if (flagstartcombat) {
      game.combat.startCombat();
    }
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
}