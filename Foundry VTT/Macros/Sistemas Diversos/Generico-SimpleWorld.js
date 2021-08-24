
/* Fear + Fear Table
icon: icons/magic/death/undead-ghost-scream-teal.webp
*/

let tokenD;
const version = 'v1.0';

if (canvas.tokens.controlled[0]===undefined) {
  ui.notifications.error("Please, select a token."); // No Token is Selected
} else {
  tokenD = canvas.tokens.controlled[0];
  main();
}

async function main() {
  let maneuversOptions = ['Agilidade','Força', 'Inteligência', 'Vontade'];

  let maneuversOptionsList = ``;
  maneuversOptions.map((t) => {
    maneuversOptionsList += `<option value="${t}">${t}</option>`;
  });
  
  new Dialog({
    title:"Escolha",
    content: `
    <h2>Atributo</h2>
    <p>
      <select id="maneuversOptionsID" type="text" style="width: 100%; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
        ${maneuversOptionsList}
      </select>      
    </p>
    <br>
    `,
    buttons: {
      roll: {
        label: "Roll",
        callback: (html) => {
          rollFearTable(html);
        }
      }, 
      cancel: {
        label: "Cancel"
      }
    }
  }).render(true)
}

async function rollFearTable(html) {
  let selecao = html.find("#maneuversOptionsID")[0].value;  
  console.log(selecao)
  console.log(tokenD.actor.data.data.attributes.agilidade.value)
  rolagem(selecao) 
}

async function rolagem(selecao) {  
  if (selecao=='Agilidade') {    
    rolaDado(tokenD.actor.data.data.attributes.agilidade.value)
  } else if (selecao=='Força') {    
    rolaDado(tokenD.actor.data.data.attributes.forca.value)
  } else if (selecao=='Inteligência') {    
    rolaDado(tokenD.actor.data.data.attributes.inteligencia.value)
  } else if (selecao=='Vontade') {    
    rolaDado(tokenD.actor.data.data.attributes.vontade.value)
  }
}

async function rolaDado(bonus) {
  let rolagem = new Roll(`2d6+${bonus}`).roll({ async : false });  
  rolagem.toMessage();
}

