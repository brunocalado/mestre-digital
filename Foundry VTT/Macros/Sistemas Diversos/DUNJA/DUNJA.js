const simpleworldsystem = true; //true= vai usar o ator de simpleworldsystem, false= vai usar os valores abaixo

// Coloque os valores aqui que podem ser apenas: -3 -2 -1 0 1 2 3
let coracao = 2;
let cerebro = 1;
let musculos = 0;
// =============================================

const macroVersion = 'v0.1';
/* DUNJA
## Features
- Read the actor from Simple world building system.
- You can set the values to the macro.

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/DUNJA.js
icon: icons/containers/chest/chest-reinforced-steel-pink.webp
Actor Sheet Model for Simple World Building System: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/model-sheet.json
*/

if (simpleworldsystem) {
  if (!actor) {
    ui.notifications.warn(`Selecione um Token!`); // get selected token  
  } else {
    coracao = canvas.tokens.controlled[0].actor.data.data.attributes.coracao.value;
    cerebro = canvas.tokens.controlled[0].actor.data.data.attributes.cerebro.value;
    musculos = canvas.tokens.controlled[0].actor.data.data.attributes.musculos.value;    
    main();
  }
} else {
  main();
}

function main() {  
  let template = `  
    <style type="text/css">
      div.purpleHorizon {
        border: 4px solid #ff0000;
        background-color: #000000;
        width: 100%;
        text-align: center;
        border-collapse: collapse;
      }
      .divTable.purpleHorizon .divTableCell, .divTable.purpleHorizon .divTableHead {
        border: 0px solid #550000;
        padding: 5px 2px;
      }
      .divTable.purpleHorizon .divTableBody .divTableCell {
        font-size: 13px;
        font-weight: bold;
        color: #FFFFFF;
      }
      
      .divTable{ display: table; }
      .divTableRow { display: table-row; }
      .divTableHeading { display: table-header-group;}
      .divTableCell, .divTableHead { display: table-cell;}
      .divTableHeading { display: table-header-group;}
      .divTableFoot { display: table-footer-group;}
      .divTableBody { display: table-row-group;}

      /* HIDE RADIO */
      [type=radio] { 
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      }

      /* IMAGE STYLES */
      [type=radio] + img {
      cursor: pointer;
      }

      /* CHECKED STYLES */
      [type=radio]:checked + img {
      outline: 4px solid #f00;
      }
      
      .container {
        position: relative;
        text-align: center;
        color: white;
      }
      /* Centered text */
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
      }    

      #kultcss .window-content {    
        background: #000000;
      }     
      #kultcss .dialog-button {
        height: 40px;
        background: #000000;
        color: #ffffff;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        border: none;    
      }  
      #kultcss header {
        background: #000000;
        border-radius: 0;    
        border: none;    
        margin-bottom: 2px;
        font-size: .75rem;
      }
    </style>    
    
    <div class="divTable purpleHorizon">
    <div class="divTableBody">
    
    <div class="divTableRow">    
    <div class="divTableCell">      
      <label>        
        <div class="container">
          <input type="radio" id="attribute" name="attribute" value="cerebro" checked>          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">${formatAttribute(cerebro)}</div>
        </div>
        Cérebro
      </label>      
    </div>    
    <div class="divTableCell">
      <label>        
        <div class="container">
          <input type="radio" id="attribute" name="attribute" value="coracao">          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">${formatAttribute(coracao)}</div>
        </div>
        Coração
      </label>     
    </div>
    <div class="divTableCell">
      <label>        
        <div class="container">
          <input type="radio" id="attribute" name="attribute" value="musculos">          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">${formatAttribute(musculos)}</div>
        </div>
        Músculos
      </label>         
    </div>    
    </div>

    <div class="divTableRow">    
    <div class="divTableCell">      
      <label>        
        <div class="container">
          <input type="radio" id="tiporolagem" name="tiporolagem" value="desvantagem">          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">Desvantagem</div>
        </div>        
      </label>      
    </div>    
    <div class="divTableCell">
      <label>        
        <div class="container">
          <input type="radio" id="tiporolagem" name="tiporolagem" value="normal" checked>          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">Normal</div>
        </div>        
      </label>     
    </div>
    <div class="divTableCell">
      <label>        
        <div class="container">
          <input type="radio" id="tiporolagem" name="tiporolagem" value="vantagem">          
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/DUNJA/dunja.png" width="48" height="48">  
          <div class="centered">Vantagem</div>
        </div>        
      </label>         
    </div>    
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell"></div>
      <div class="divTableCell"></div>      
      <div class="divTableCell">
        <p>Modificador</p>
        <input id="modificador" type="number" min="-10" max="10" style="width: 80px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;" value=0>
      </div>
    </div>
    
    </div>
    </div>
  `;
  
  new Dialog({
    title: `DUNJA - ${macroVersion}`,
    content: template,
    buttons: {
      ok: {
        label: "Rolar",
        callback: async (html) => {
          coinmanager(html);
        },
      },
      cancel: {
        label: "Cancelar",
      }
    },
    default: "ok"
  }, { id: 'kultcss'}).render(true);
}

async function coinmanager(html){
  const attribute = html.find('input[name="attribute"]:checked').val();  
  const tipo = html.find('input[name="tiporolagem"]:checked').val();  
  const modificador = parseInt( html.find("#modificador")[0].value );    
  let dice;
  
  // realiza rolagem
  dice = diceRoll(attribute, tipo, modificador);
  
  // envia mensagem para o chat
  chatMessage(dice, attribute);
}

function diceRoll(attribute, tipo, modificador) {
  let value = {'cerebro': cerebro, 'coracao': coracao, 'musculos': musculos};    

  if (tipo=='normal') {
    return new Roll('1d6+' + value[attribute] + '+' + modificador).roll();
  } else if (tipo=='vantagem') {
    return new Roll('2d6kh+' + value[attribute] + '+' + modificador).roll();
  } else if (tipo=='desvantagem') {
    return new Roll('2d6kl+' + value[attribute] + '+' + modificador).roll();
  }  
}

function chatMessage(dice, attribute) {
  let message = `<h2></h2>`;  
  
  message += resultados(dice, attribute);
  
  dice.toMessage({flavor: message});                  
}

function resultados(dice, attribute) {
  let total = dice.total;
  let msg = ``;  
 
  if (total>=6) {
    msg+=`<h2>Sucesso!</h2>`;      
  } else {
    msg+=`<h2>Falha!</h2>`;
  }

  if (attribute=='coracao') {
    msg+=`<b>Coração</b>`;  
  } else if (attribute=='cerebro') {
    msg+=`<b>Cérebro</b>`;  
  } else if (attribute=='musculos') {
    msg+=`<b>Músculos</b>`;  
  }  
  
  return msg;
}

function formatAttribute(val) {
  if (val==3) {
    return '+3';
  } else if (val==2) {
    return '+2';
  } else if (val==1) {
    return '+1';
  } else {
    return val;
  }
}
