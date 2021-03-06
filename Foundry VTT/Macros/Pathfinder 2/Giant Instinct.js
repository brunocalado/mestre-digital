/* Giant Instinct - v1.4
- Change size, play sound, add clumsy, change ac, add size damage, add rage damage

sound: https://github.com/brunocalado/mestre-digital/raw/master/Foundry%20VTT/Macros/Pathfinder%202/GodzillaRage.ogg
icon: systems/pf2e/icons/features/classes/giant-instinct.jpg
source: https://github.com/brunocalado/mestre-digital/blob/master/Foundry%20VTT/Macros/Pathfinder%202/Giant%20Instinct.js

Rules: https://2e.aonprd.com/Instincts.aspx?ID=4
*/
const HOW_MAD = 10;          // increase for giant instinct or higher levels
const rageSound = 'assets/fx/GodzillaRage.ogg';
const sizeDmg = 2;          // 

(async () => {
    if (actor) { 
    for (let token of canvas.tokens.controlled) {
      // turn off
      if ( (token.actor.data.data.customModifiers["ac"] || []).some((modifier) => modifier.name === "Rage") ) {
        await actor.removeCustomModifier("ac", "Rage");
        await actor.removeCustomModifier("damage", "Rage");
        await actor.removeCustomModifier("damage", "Large");
        await actor.update({ "data.attributes.hp.temp": 0 }); // Remove the line above if you do not wish for your character to lose all temp hp when toggled "off".
        if ( token.data.effects.includes("systems/pf2e/icons/features/classes/rage.jpg") ) {
          token.toggleEffect("systems/pf2e/icons/features/classes/rage.jpg");
        }
        await token.update({"height": 1, "width": 1});
        await PF2eStatusEffects.setStatus(token, [{ name: 'clumsy', value: '0' }]);        
      } else { // turn on
        AudioHelper.play({src: rageSound, volume: 1.0, autoplay: true, loop: false}, true);
        const tmpHP = token.actor.data.data.details.level.value + token.actor.data.data.abilities.con.mod;
        if (token.actor.data.data.attributes.hp.temp < tmpHP) {
          await actor.update({ "data.attributes.hp.temp": tmpHP });
        }
        await actor.addCustomModifier("ac", "Rage", -1, "untyped");        
        await actor.addCustomModifier("damage", "Rage", HOW_MAD, "untyped");                
        await actor.addCustomModifier("damage", "Large", sizeDmg, "untyped");        
        if ( !token.data.effects.includes("systems/pf2e/icons/features/classes/rage.jpg" ) ) {
          token.toggleEffect("systems/pf2e/icons/features/classes/rage.jpg");
        }        
        await token.update({"height": 2, "width": 2});

        await PF2eStatusEffects.setStatus(token, [{ name: 'clumsy', value: '1' }]);
      }
    }
  } else {
    ui.notifications.warn("You must have an actor selected.");
  }
})();