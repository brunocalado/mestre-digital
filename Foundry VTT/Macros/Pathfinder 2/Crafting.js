const version = 'v0.7';
/* Crafting
Features
- Mostra valor da fórmula

Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Pathfinder%202/Crafting.js
Icon: icons/tools/smithing/crucible.webp
*/

if (!actor) {
  ui.notifications.warn(`Selecione um token!`); // get selected token 
} else {

// 
const tableFormulas = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 13,
  7: 18,
  8: 25,
  9: 35,
  10: 50,
  11: 70,
  12: 100,
  13: 150,
  14: 225,
  15: 325,
  16: 500,
  17: 750,
  18: 1250,
  19: 2000,
  20: 3500
};

(async () => {
  let toChat = (content, rollString) => {
    let chatData = {
      user: game.user.id,
      content,
      speaker: ChatMessage.getSpeaker(),
    }
    ChatMessage.create(chatData, {})
    if (rollString) {
      let roll = new Roll(rollString).roll();
      chatData = {
        ...chatData,
        flavor: "Resultado da Manufatura",
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll
      }
      ChatMessage.create(chatData, {})
    }    
  }
  
  const handleCrits = (roll) => roll === 1 ? -10 : (roll === 20 ? 10 : 0);
  
  let rollCrafting = (args) => {
    let {itmLevel, cra, charLevel, itmType, itmValue, charName, bonusSkill, nomeItem} = args;

    var roll3d = new Roll('1d20').roll();    
    game.dice3d.showForRoll(roll3d);
    var roll = roll3d.total;
    
    var crit = handleCrits(roll);    
    
    var DC = 0, taskLevel = charLevel, gp = 0;
    
    switch (itmLevel) {
      case 1:
        DC = 15;
        break;
      case 2:
        DC = 16;
        break;
      case 3:
        DC = 18;
        break;
      case 4:
        DC = 19;
        break;
      case 5:
        DC =20;
        break;
      case 6:
        DC = 22;
        break;
      case 7:
        DC = 23;
        break;
      case 8:
        DC = 24;
        break;
      case 9:
        DC = 26;
        break;
      case 10:
        DC= 27;
        break;
      case 11:
        DC = 28;
        break;
      case 12:
        DC = 30;
        break;
      case 13:
        DC = 31;
        break;
      case 14:
        DC = 32;
        break;
      case 15:
        DC = 34;
        break;
      case 16:
        DC = 35;
        break;
      case 17:
        DC = 36;
        break;
      case 18:
        DC = 38;
        break;
      case 19:
        DC = 39;
        break;
      case 20:
        DC = 40;
        break;
      default:
        DC = 14;
        break;
      
    }
    
    let finalRoll = roll + crit + cra.value + bonusSkill;
    
    if (finalRoll >= DC+10) taskLevel++;
    
    if (cra.rank === 4) {
      switch (taskLevel) {
        case 1:
          gp = 0.2;
          break;
        case 2:
          gp = 0.3;
          break;
        case 3:
          gp = 0.5;
          break;
        case 4:
          gp = 0.8;
          break;
        case 5:
          gp = 1;
          break;
        case 6:
          gp = 2;
          break;
        case 7:
          gp = 2.5;
          break;
        case 8:
          gp = 3;
          break;
        case 9:
          gp = 4;
          break;
        case 10:
          gp= 6;
          break;
        case 11:
          gp = 8;
          break;
        case 12:
          gp = 10;
          break;
        case 13:
          gp = 15;
          break;
        case 14:
          gp = 20;
          break;
        case 15:
          gp = 28;
          break;
        case 16:
          gp = 40;
          break;
        case 17:
          gp = 55;
          break;
        case 18:
          gp = 90;
          break;
        case 19:
          gp = 130;
          break;
        case 20:
          gp = 200;
          break;
        case 21:
          gp = 300;
          break;
        default:
          gp = 0.05;
          break;
      }
    } else if (cra.rank === 3) {
      switch (taskLevel) {
        case 1:
          gp = 0.2;
          break;
        case 2:
          gp = 0.3;
          break;
        case 3:
          gp = 0.5;
          break;
        case 4:
          gp = 0.8;
          break;
        case 5:
          gp = 1;
          break;
        case 6:
          gp = 2;
          break;
        case 7:
          gp = 2.5;
          break;
        case 8:
          gp = 3;
          break;
        case 9:
          gp = 4;
          break;
        case 10:
          gp= 6;
          break;
        case 11:
          gp = 8;
          break;
        case 12:
          gp = 10;
          break;
        case 13:
          gp = 15;
          break;
        case 14:
          gp = 20;
          break;
        case 15:
          gp = 28;
          break;
        case 16:
          gp = 36;
          break;
        case 17:
          gp = 45;
          break;
        case 18:
          gp = 70;
          break;
        case 19:
          gp = 100;
          break;
        case 20:
          gp = 150;
          break;
        case 21:
          gp = 175;
          break;
        default:
          gp = 0.05;
          break;
      }
      
    } else if (cra.rank === 2) {
      switch (taskLevel) {
        case 1:
          gp = 0.2;
          break;
        case 2:
          gp = 0.3;
          break;
        case 3:
          gp = 0.5;
          break;
        case 4:
          gp = 0.8;
          break;
        case 5:
          gp = 1;
          break;
        case 6:
          gp = 2;
          break;
        case 7:
          gp = 2.5;
          break;
        case 8:
          gp = 3;
          break;
        case 9:
          gp = 4;
          break;
        case 10:
          gp= 5;
          break;
        case 11:
          gp = 6;
          break;
        case 12:
          gp = 8;
          break;
        case 13:
          gp = 10;
          break;
        case 14:
          gp = 15;
          break;
        case 15:
          gp = 20;
          break;
        case 16:
          gp = 25;
          break;
        case 17:
          gp = 30;
          break;
        case 18:
          gp = 45;
          break;
        case 19:
          gp = 60;
          break;
        case 20:
          gp = 75;
          break;
        case 21:
          gp = 90;
          break;
        default:
          gp = 0.05;
          break;
      }
      
    } else if (cra.rank === 1){
      switch (taskLevel) {
        case 1:
          gp = 0.2;
          break;
        case 2:
          gp = 0.3;
          break;
        case 3:
          gp = 0.5;
          break;
        case 4:
          gp = 0.7;
          break;
        case 5:
          gp = 0.9;
          break;
        case 6:
          gp = 1.5;
          break;
        case 7:
          gp = 2;
          break;
        case 8:
          gp = 2.5;
          break;
        case 9:
          gp = 3;
          break;
        case 10:
          gp= 4;
          break;
        case 11:
          gp = 5;
          break;
        case 12:
          gp = 6;
          break;
        case 13:
          gp = 7;
          break;
        case 14:
          gp = 8;
          break;
        case 15:
          gp = 10;
          break;
        case 16:
          gp = 13;
          break;
        case 17:
          gp = 15;
          break;
        case 18:
          gp = 20;
          break;
        case 19:
          gp = 30;
          break;
        case 20:
          gp = 40;
          break;
        case 21:
          gp = 50;
          break;
        default:
          gp = 0.05;
          break;
      }
    }
    
    if (itmType === "rare") DC += 5;
    
    let message = `<h1>Manufatura</h1><p><b style="color:red">${charName}</b> está manufaturando um <b style="color:red">${nomeItem}</b> <b style="color:red">${itmType}</b> de nível <b style="color:red">${itmLevel}</b>. O valor investido foi de <b style="color:red">${itmValue/2} po</b>.</p><p>O resultado da rolagem <b style="color:red">d20+${cra.value}+${bonusSkill}</b> foi [[${roll}+${cra.value}+${bonusSkill}]]</p>`;   
    
    if (finalRoll >= DC+10) {
      toChat(message+`<h2 style="color:DarkGreen">Sucesso Crítico</h2> <p>Sua tentativa é bem-sucedida. Cada dia adicional gasto Manufaturando reduz os materiais necessários para completar o item em uma quantidade ${gp}po e sua graduação de proficiência. </br> ${charName} pode pagar ${itmValue/2}po para terminar imediatamente ou gastar ${Math.ceil((itmValue/2)/gp)} dias extras.</p>
      <h3>Resumo</h3>
      <p><b>Redução de Custo por Dia:</b> ${gp} po</p>      
      <p><b>Tempo para Terminar:</b> ${Math.ceil((itmValue/2)/gp)} dias</p>
      <p><b>Custo da Fórmula:</b> ${tableFormulas[parseInt(itmLevel)]} po</p>
      <p><b style="color:Red">Custo Término Imediato:</b> ${itmValue/2} po</p>
      <p><b style="color:DarkRed">Custo de Término + Fórmula:</b> ${itmValue/2+tableFormulas[parseInt(itmLevel)]} po</p>`);
    } else if (finalRoll >= DC) {
      toChat(message+`<h2 style="color:Green">Sucesso</h2> <p>Sua tentativa é bem-sucedida. Cada dia adicional gasto Manufaturando reduz os materiais necessários para completar o item em uma quantidade ${gp}po e sua graduação de proficiência. </br> ${charName} pode pagar ${itmValue/2}po para terminar imediatamente ou gastar ${Math.ceil((itmValue/2)/gp)} dias extras.</p>
      <h3>Resumo</h3>
      <p><b>Redução de Custo por Dia:</b> ${gp} po</p>      
      <p><b>Tempo para Terminar:</b> ${Math.ceil((itmValue/2)/gp)} dias</p>
      <p><b>Custo da Fórmula:</b> ${tableFormulas[parseInt(itmLevel)]} po</p>
      <p><b style="color:Red">Custo Término Imediato:</b> ${itmValue/2} po</p>
      <p><b style="color:DarkRed">Custo de Término + Fórmula:</b> ${itmValue/2+tableFormulas[parseInt(itmLevel)]} po</p>`);
    } else if (finalRoll < DC-10) {
      toChat(message+`<h2 style="color:DarkRed">Falha Crítica</h2> <p>Você falha em completar o item. Você perde 10% da matéria-prima que supriu, mas pode recuperar o resto. Se quiser tentar novamente, você deve recomeçar do zero.</p>
      <h3>Resumo</h3>
      <p><b>Perda de Materiais:<b> ${(itmValue/2)*0.1} po</p>`);    
    } else if (finalRoll < DC) {
      toChat(message+`<h2 style="color:Red">Falha</h2> <p>Você falha em completar o item. Você pode recuperar a matéria-prima que supriu em seu valor total. Se quiser tentar novamente, você deve recomeçar do zero.</p>`);
    }    
  }
  
  // Form ==============================
  let applyChanges = false;
  new Dialog({
    title: `Manufaturar - ${version}`,
    content: `
    <div>Coloque os dados do item que deseja manufaturar. Não esqueça que precisa da fórmula para poder realizar a manufatura.<div>
    <hr/>
    <form>
      <div class="form-group">
        <label><b>Nível do Item :</b></label>
        <input id="lvl-item" name="lvl-item" type="number" min="0" max="20"/>
      </div>
      <div class="form-group">
        <label><b>Valor do Item (PO) :</b></label>
        <input id="value-item" name="value-item" type="number" min="0"/>
      </div>
      <div class="form-group">
        <label><b>Bônus para Rolagem :</b></label>
        <input id="bonus-skill" name="bonus-skill" type="number" min="-20" max="20"/>
      </div>      
      <div class="form-group">
        <label><b>Item (opcional) :</b></label>
        <input id="nome-item" name="nome-item" type="text" value="item"/>
      </div>      
      <div class="form-group">
        <label><b>Item Raro (CD+5) ?</b></label>
        <input id="rare-item" name="rare-item" type="checkbox" value="rare"/>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Manufaturar !`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancelar`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        var {cra} = actor.data.data.skills;
        var charLevel = actor.data.data.details.level.value;
        var charName = actor.data.name;
        let itmType = html.find('[name="rare-item"]')[0].checked ? "raro" : "comum" ;        
        let itmLevel = parseInt(html.find('[name="lvl-item"]')[0].value) || 0;
        let itmValue = parseInt(html.find('[name="value-item"]')[0].value) || 0;
        let bonusSkill = parseInt(html.find('[name="bonus-skill"]')[0].value) || 0;
        let nomeItem = html.find('[name="nome-item"]')[0].value;
      
        let data = {itmLevel, cra, charLevel, itmType, itmValue, charName, bonusSkill, nomeItem};

        if (itmLevel <= charLevel) {
          if (itmLevel >= 0 && itmLevel <= 20) {
            if (cra.rank >= 4) {
                    return rollCrafting(data);
            } else if (cra.rank >= 3) {
                if (itmLevel < 16) {
                    return rollCrafting(data);
              } else {
                ui.notifications.warn("Não possui proficiência suficiente para manufaturar esse item !");
              }

            } else if (cra.rank >= 1) {
              if (itmLevel < 9) {
                    return rollCrafting(data);
              } else {
                ui.notifications.warn("Não possui proficiência suficiente para manufaturar esse item !");
              }
            } else {
              ui.notifications.warn("Não é treinado em Manufatura, e não pode manufaturar coisas !");
            }
          } else {
            ui.notifications.warn("Invalid item level !");
          }
        } else {
          ui.notifications.warn("Nível do Item acima do nível do personagem !");
        }
        return;
      }
    }
  }
}).render(true);
 })();
 
} // fim do if actor