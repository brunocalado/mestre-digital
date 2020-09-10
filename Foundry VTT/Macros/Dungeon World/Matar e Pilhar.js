/* Hack and Slash - v1.0
*/
if (!actor) {   /* get selected token */
  ui.notifications.warn(`Select your token!`, {});   
} else {
  let playerSelected = canvas.tokens.controlled[0].actor;
  let attribute=parseInt(playerSelected.data.data.abilities.str['mod']);  

  let msg = `<h2>Matar e Pilhar</h2>`;
  let dice = new Roll('1d6+1d8+' + attribute).roll();
  dice.toMessage({flavor: msg});
}
