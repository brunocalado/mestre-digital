/* Inspire Defense - v0.1
- +1 AC, +1 saving throws, multi token selection
- It won't add physical resistance 

sound: 
icon: systems/pf2e/icons/spells/inspire-defense.jpg
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Pathfinder%202/Inspire%20Defense.js

Rules: https://2e.aonprd.com/Spells.aspx?ID=387
*/

const spell_level = 5;      // WIP
const icon = 'systems/pf2e/icons/spells/inspire-defense.jpg';
//const rageSound = 'assets/fx/GodzillaRage.ogg'; WIP

(async () => {
    if (actor) { 
    for (let token of canvas.tokens.controlled) {
      // turn off
      if ( (token.actor.data.data.customModifiers["ac"] || []).some((modifier) => modifier.name === "Inspire Defense") ) {
        await actor.removeCustomModifier("ac", "Inspire Defense", +1, "untyped"); //AC        
        await actor.removeCustomModifier("fortitude", "Inspire Defense", +1, "untyped"); //saving-throw        
        await actor.removeCustomModifier("reflex", "Inspire Defense", +1, "untyped"); //saving-throw        
        await actor.removeCustomModifier("will", "Inspire Defense", +1, "untyped"); //saving-throw        
        if ( token.data.effects.includes(icon) ) {
          token.toggleEffect(icon);
        }
      } else { // turn on        
        await actor.addCustomModifier("ac", "Inspire Defense", +1, "untyped"); //AC        
        await actor.addCustomModifier("fortitude", "Inspire Defense", +1, "untyped"); //saving-throw        
        await actor.addCustomModifier("reflex", "Inspire Defense", +1, "untyped"); //saving-throw        
        await actor.addCustomModifier("will", "Inspire Defense", +1, "untyped"); //saving-throw        

        if ( !token.data.effects.includes(icon ) ) {
          token.toggleEffect(icon);
        }                
      }
    }
  } else {
    ui.notifications.warn("You must have an actor selected.");
  }
})();