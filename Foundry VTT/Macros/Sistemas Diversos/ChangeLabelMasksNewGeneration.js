
const version = '0.1';
/*
Features
- 
Atributos atuais

Qual vai subir?
Qual vai descer?

*/

if (!actor) {
  /* get selected token */
  ui.notifications.warn(`Selecione um token!`);
} else { 
  (async () => { 
    let myHero = canvas.tokens.controlled[0].actor;
    const labels = ['Danger','Freak','Mundane','Savior','Superior'];
    const heroName = myHero.name;
    let danger = myHero.data.data.stats.danger.value;
    let freak = myHero.data.data.stats.freak.value;
    let mundane = myHero.data.data.stats.mundane.value;
    let savior = myHero.data.data.stats.savior.value;
    let superior = myHero.data.data.stats.superior.value;
    let goingUp;
    let goingDown;
    
    labels.map((el) => {      
      goingUp += `<option value="${el}">${el}</option>`;         
    });
    labels.map((el) => {      
      goingDown += `<option value="${el}">${el}</option>`;         
    }); 

  /*data.data.stats.danger.label
  data.data.stats.danger.value*/
  
    let monsterType = [
    'Hoarder', 'Far from home', 'Magical', 'Divine', 'Planar', 'Lord over others', 'Ancient and noteworthy' 
    ].sort();
    let monsterTypeList = ``;
    let tmp;
    monsterType.map((el) => {  
      tmp = el.split(' ').join('').toLowerCase();      
      monsterTypeList+=`<li class="meuitem"><input type="checkbox" id="${tmp}"><label for="${tmp}">${el}</label></li>`;    
    });
    
    let template = `
    <style>  
    #dungeonworldmacrocss header {
      background: #060f52;
      border-radius: 0;    
      border: none;    
      margin-bottom: 2px;
      font-size: .75rem;
    }
    #dungeonworldmacrocss form {
      margin-bottom: 30px;   
    }
    #dungeonworldmacrocss .window-content {    
         
    }  
    #dungeonworldmacrocss .form-fields.buttons {
      justify-content: flex-start !important;
    }
    #dungeonworldmacrocss .button {
      height: 35px;
      box-shadow: inset 0 0 0 1px #1111FF,inset 0 0 0 1.5px var(--tertiary),inset 0 0 0 1px #1111FF;
      font-size: 12px;
      padding: 0;
      background: #eb34b7;
      color: white;
      cursor: pointer;
    }
    #dungeonworldmacrocss .button:hover {
      box-shadow: 0 0 4px red;
    }
    #dungeonworldmacrocss .meuitem input[type="radio"] {
      opacity: 0;
      position: fixed;
      width: 0;  
    }
    #dungeonworldmacrocss .minhalista {    
      display: inline-block;
      list-style-type: none; 
      text-align: left; 
      margin: 0; 
      padding: 0; 
      width: 100%;
    }
    #dungeonworldmacrocss .meuitem {    
      display: inline-block;    
      padding: 2px; 
    }  
    #dungeonworldmacrocss .meuitem label {    
      cursor: pointer;    
      margin: 0px 3px ;
      
      height: 100%;
      width: 100%;
      border-radius: 3px;
      font-size: 16px;
      font-family: "Signika", sans-serif;  
      background: #060f52;        
      color: white;    
    }
    
    #dungeonworldmacrocss .checkbox label i {
      margin-right: 5px;
      color: white;
      background: #6d729c;
    }
    #dungeonworldmacrocss .meuitem label:hover {
      box-shadow: 0 0 14px black;
    }
    #dungeonworldmacrocss .meuitem input[type="checkbox"]:selected + label {
      background: rgba(0, 0, 150, 0.7);
    }
    #dungeonworldmacrocss .dialog-button {
      height: 50px;
      background: #060f52;
      color: white;
      justify-content: space-evenly;
      align-items: center;
      cursor: pointer;
    }    
    </style>
    
    <h2>Choose</h2>

  <table>
    <tr>
      <td><b style="color:red">Damage Die:</b> <input id="damageDiceID" type="text" style="width: 90px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center;" value="1d6"></td>
      <td><b style="color:red">Damage Bonus: </b> <input id="damageBonusID" type="number" min="-10" max="10" style="width: 70px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center;" value=0></td>    
    </tr>
  <table>
    
    
    
    <h2>Monster Type</h2>
      <div class="form-fields">

      <ul class="minhalista">
        ${monsterTypeList}    
      </ul>
    </div>
    </br>
    `;
    
    new Dialog({
      title: `Change Label - ${version}`,
      content: template,
      buttons: {
        ok: {
          label: "Roll",
          callback: async (html) => {
            changeLabel(html);
          },
        },
        cancel: {
          label: "Cancel",
        },
      },
      default: "ok"    
    }, { id: 'dungeonworldmacrocss'}).render(true);
  })()

}

async function changeLabel(html){
}