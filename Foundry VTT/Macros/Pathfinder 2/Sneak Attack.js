if (!actor) {   /* get selected token */
  ui.notifications.warn(`Select your token!`, {});   
} else {
  getRequirements();

  function getRequirements() {
    let playerSelected;
    let weaponsList = '';
    let playerSelectedActions = [];
    let playerLevel;
    if (actor) {   /* get selected token */
      playerSelected = canvas.tokens.controlled[0].actor;    
      playerSelectedActions = playerSelected.data.data.actions;
      playerLevel = playerSelected.data.data.details.level.value;
    }    
    playerSelectedActions.map((el) => {      
      weaponsList += `<option value="${el.name}">${el.name}</option>`;
    });

    let template = `
    <p>Weapon: <select id="weapon" name="weapon">${weaponsList}</select></p>
    <br />
    <p>
      Level: ${playerLevel} - ${diceByLevel(playerLevel)}d6
    </p> 
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

  function main (html) {
    const critical = html.find("#critical")[0].checked;
    let weapon = html.find(`[name=weapon]`)[0].value;        
    let playerSelected = canvas.tokens.controlled[0].actor;
    let NumberOfDices = diceByLevel(playerSelected.data.data.details.level.value);
    
    // Activate Sneak Attack
    playerSelected.addDamageDice({
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
    console.log('-------------------------------');
    console.log(critical);
    console.log('-------------------------------');
    let bonusdice = 'sneak-attack';
    if (critical) {
      (playerSelected.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon)?.critical(event, [bonusdice]);  
    } else {
      (playerSelected.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon)?.damage(event, [bonusdice]);
    }
    
    // Deactive Sneak Attack
    actor.removeDamageDice('damage', 'sneak-attack');
  }
  
  function diceByLevel(levelStr) {
    let dices;
    let level = parseInt(levelStr)
    if (level<5) {
      dices = 1;
    } else if (level>=5 && level<11) {
      dices = 2;
    } else if (level>=11 && level<17) {
      dices = 3;
    } else if (level>=17) {
      dices = 4;
    }
    return dices;
  }
}
