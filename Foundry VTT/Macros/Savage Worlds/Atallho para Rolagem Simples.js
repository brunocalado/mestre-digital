/* Atallho para Rolagem Simples v1.0
Features
- Roll exploding dice
- You can add the Wild Die
*/

getRequirements();

function getRequirements() {
  //

  let cardsList = "";
  Array.from(game.tables).map((el) => {
    cardsList += `<option value="${el.data.name}">${el.data.name}</option>`;
  });

  let template = `
  <h2>Dice</h2>
  <p>
    <input type="radio" id="d4" name="dice" value="d4">
    <label for="d4">D4</label>
    <input type="radio" id="d6" name="dice" value="d6" checked="checked>
    <label for="d6">d6</label>
    <input type="radio" id="d8" name="dice" value="d8">
    <label for="d8">d8</label>
    <input type="radio" id="d10" name="dice" value="d10">
    <label for="d10">d10</label>
    <input type="radio" id="d12" name="dice" value="d12">
    <label for="d12">D12</label>
  </p>
  </br>
  <h2>Options</h2>
  <p>
    <input type="checkbox" id="wilddie"/>
    Add wild die?
  </p>  
  <br />
  `;
  new Dialog({
    title: "SWADE Dice",
    content: template,
    buttons: {
      ok: {
        label: "Roll!",
        callback: async (html) => {
          makeTiles(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function makeTiles(html) {  
  const d4 = html.find('input[name="dice"]:checked').val()=='d4';
  const d6 = html.find('input[name="dice"]:checked').val()=='d6';
  const d8 = html.find('input[name="dice"]:checked').val()=='d8';
  const d10 = html.find('input[name="dice"]:checked').val()=='d10';
  const d12 = html.find('input[name="dice"]:checked').val()=='d12';
  const wilddie = html.find("#wilddie")[0].checked;  
      
  if (d4) {
    let dice = new Roll('d4x=').roll();    
    dice.toMessage({flavor: 'Normal Die'});
    if (wilddie) {
      let wildroll = new Roll('d6x=').roll();
      dice.toMessage({flavor: 'Wild Die'});
    }
  }
  if (d6) {
    let dice = new Roll('d6x=').roll();    
    dice.toMessage({flavor: 'Normal Die'});
    if (wilddie) {
      let wildroll = new Roll('d6x=').roll();
      dice.toMessage({flavor: 'Wild Die'});
    }
  }  
  if (d8) {
    let dice = new Roll('d8x=').roll();    
    dice.toMessage({flavor: 'Normal Die'});
    if (wilddie) {
      let wildroll = new Roll('d6x=').roll();
      dice.toMessage({flavor: 'Wild Die'});
    }
  }  
  if (d10) {
    let dice = new Roll('d10x=').roll();    
    dice.toMessage({flavor: 'Normal Die'});
    if (wilddie) {
      let wildroll = new Roll('d6x=').roll();
      dice.toMessage({flavor: 'Wild Die'});
    }
  }  
  if (d12) {
    let dice = new Roll('d12x=').roll();    
    dice.toMessage({flavor: 'Normal Die'});
    if (wilddie) {
      let wildroll = new Roll('d6x=').roll();
      dice.toMessage({flavor: 'Wild Die'});
    }
  }  
}