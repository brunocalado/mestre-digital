if (!actor) {   /* get selected token */
  ui.notifications.warn(`Select your token!`, {});   
} else {
  getRequirements();

  function getRequirements() {
    let playerSelected;
    let weaponsList = '';
    let playerSelectedActions = [];
    if (actor) {   /* get selected token */
      playerSelected = canvas.tokens.controlled[0].actor;    
      playerSelectedActions = playerSelected.data.data.actions;
    }    
    playerSelectedActions.map((el) => {      
      weaponsList += `<option value="${el}">${el.name}</option>`;
    });

    let template = `
    <p>Weapon: <select id="weapon">${weaponsList}</select></p>
    <br />
    <p>
      <input type="checkbox" id="critical"/>Critical?
    </p> 
    `;
    new Dialog({
      title: "Sneak Attack",
      content: template,
      buttons: {
        ok: {
          label: "Roll",
          callback: (html) => {
            main(html);
          },
        },
        cancel: {
          label: "Cancel",
        },
      },
    }).render(true);
  }

  async function main (html) {
    let weapon = html.find("#weapon").value;
    let NumberOfDices = 2;
    let playerSelected = canvas.tokens.controlled[0].actor;
    
    // Activate Sneak Attack
    await playerSelected.addDamageDice({
        selector: 'damage',
        name: 'Sneak Attack',
        diceNumber: NumberOfDices,
        dieSize: 'd6',
        category: 'precision',
        options: {
          any: ['agile', 'finesse', 'ranged'],
          all: ['sneak-attack']
        }
    });

    // Roll Sneak Attack  
    let bonusdice = 'sneak-attack';    
    await (playerSelected.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon)?.damage(event, [bonusdice]);

    // Deactive Sneak Attack
    //actor.removeDamageDice('damage', 'sneak-attack');
  }
}