const macroVersion = 'v0.4';
/*
Ganhar Proventos 

*/
// https://gist.githubusercontent.com/EstolanoBeu/e0e08556d54beaa9b1e38964b47752e9/raw/849e2056227fde55a104b9d3ecfcd6b4bcc5ce68/Ganhar%2520Proventos

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
            flavor: "Earn Income Results",
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            roll
          }
        ChatMessage.create(chatData, {})
    }
}

const handleCrits = (roll) => roll === 1 ? -10 : (roll === 20 ? 10 : 0);

let getDC = (level) => { // Création de DC en fonction du niveau
  let arrayDC = [14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38, 39, 40, 42, 44, 46, 48, 50]
    var DC = arrayDC[level];
  return DC;
}

let valueIncome = (skillRank, taskLevel) => {
  let arrayIncome = [
    [0.01,0.02,0.04,0.08,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.5,2,2.5,3,4,6,8,8],
    [0.05,0.2,0.3,0.5,0.7,0.9,1.5,2,2.5,3,4,5,6,7,8,10,13,15,20,30,40,50],
    [0.05,0.2,0.3,0.5,0.8,1,2,2.5,3,4,5,6,8,10,15,20,25,30,45,60,75,90],
    [0.05,0.2,0.3,0.5,0.8,1,2,2.5,3,4,6,8,10,15,20,28,36,45,70,100,150,175],
    [0.05,0.2,0.3,0.5,0.8,1,2,2.5,3,4,6,8,10,15,20,28,40,55,90,130,200,300],
  ]
  var GP = arrayIncome[skillRank][taskLevel];

  return GP;
}


let earnIncome = (taskLevel, charName, skillRank, skillMod, days) => {
    var DC = getDC(taskLevel), gp = 0;
    var critFailure = false;

    var roll = new Roll(`1d20`).roll().total;
    var crit = handleCrits(roll);

    let message = `Começa uma tarefa nível ${taskLevel} durante ${days} dia(s)... [[${roll}+${skillMod}]] ! </br> </br>`;

    // Modify taskLevel based on success range
    if (roll + crit + skillMod >= DC+10) {
        taskLevel++;
    } else if (roll+crit + skillMod >= DC) {
        
    } else if (roll + crit + skillMod < DC-10) {
        critFailure = true;
    } else if (roll + crit + skillMod < DC) {
        taskLevel = 0;
    }

    // Calculate the amount of GP based on proficiency and the new "taskLevel"
    if (!critFailure) {
      gp = valueIncome(skillRank, taskLevel);
      
      if (roll + crit + skillMod >= DC+10) {
          toChat(`${message} Sucesso Crítico! ${charName} ganha ${gp}po por dia, totalizando um salário de ${(gp*days).toFixed(2)}po!`);
      } else if (roll+crit + skillMod >= DC) {
          toChat(`${message} Sucesso! ${charName} ganha ${gp}po por dia, totalizando um salário de ${(gp*days).toFixed(2)}po!`);
      } else if (roll+crit + skillMod < DC) {
          toChat(`${message} Falha... ${charName} ganha apenas ${gp}po por dia, totalizando um salário de ${(gp*days).toFixed(2)}po...`);
      }

    } else {
      toChat(`${message} Falha Crítica! ${charName} recebe nada por seu trabalho e é demitido imediatamente. ${charName} não pode continuar a tarefa. 
        ${charName} tem sua reputação prejudicada, o que pode dificultar com que consiga trabalhos remunerados nesta comunidade novamente...`);
    }
}


let applyChanges = false;
if (actor) {
  if(actor.data.type === 'character') {
    new Dialog({
      title: `Ganhar Proventos - ${macroVersion}`,
      content: `
        <div>Selecione uma perícia e quantos dias para calcular seus ganhos. Lembre-se qeu você precisa ser pelo menos Treinado nesta perícia para Ganhar Proventos!
        </br></br> Se o nível da tarefa ficar em branco,, o nível será ajustado automaticaemnte para o nível do seu personagem.<div>
        <hr/>
        <form>
          <div class="form-group">
            <label>Skill :</label>
            <select name="skill-used" id="skill-used">
              <option value="crafting">Manufatura</option>
              <option value="performance">Performance</option>
              <option value="lore-trained">Saber (T)</option>
              <option value="lore-expert">Saber (E)</option>
              <option value="lore-master">Saber (M)</option>
              <option value="lore-legendary">Saber (L)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Quantos dias :</label>
            <input id="days" name="days" type="number"/>
          </div>
          <div class="form-group">
            <label>Nível da Tarefa :</label>
            <input id="tsk-lvl" name="tsk-lvl" type="number"/>
          </div>
          <div class="form-group">
            <label>Sociedade Pathfinder?</label>
            <input id="pfs" name="pfs" type="checkbox" value="pfs"/>
          </div>
          <div class="form-group">
            <label>Contrabandista Experiente SPF?</label>
            <input id="pfs-smug" name="pfs-smug" type="checkbox" value="pfs-smug"/>
          </div>
        </form>
        `,
      buttons: {
        yes: {
          icon: "<i class='fas fa-check'></i>",
          label: `Ganhar Proventos`,
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
            var {prf} = actor.data.data.skills;
            var charLevel = actor.data.data.details.level.value;
            var charName = actor.data.name;
            var skillRank = 0, skillMod = 0, taskLevel = 0;
            let skillUsed = html.find('[name="skill-used"]')[0].value || "none";
            let days = parseInt(html.find('[name="days"]')[0].value) || 0;
            let pfs = html.find('[name="pfs"]')[0].checked;
            let pfsSmuggler = html.find('[name="pfs-smug"]')[0].checked;;
            let customTaskLevel = parseInt(html.find('[name="tsk-lvl"]')[0].value)
            
            if (customTaskLevel) {
              taskLevel = customTaskLevel;
            } else {
              if (pfsSmuggler) {
                taskLevel = charLevel - 1;
              } else if (pfs) {
                taskLevel = Math.max(charLevel - 2, 0);
              } else taskLevel = charLevel;
            }

            switch (skillUsed) {
              case "crafting":
                skillRank = cra.rank;
                skillMod = cra.totalModifier;
                break;
              case "performance":
                skillRank = prf.rank;
                skillMod = prf.totalModifier;
                break;
              case "lore-trained":
                skillRank = 1;
                skillMod = actor.data.data.abilities.int.mod + charLevel + 2;
                break;
              case "lore-expert":
                skillRank = 2;
                skillMod = actor.data.data.abilities.int.mod + charLevel + 4;
                break;
              case "lore-master":
                skillRank = 3;
                skillMod = actor.data.data.abilities.int.mod + charLevel + 6;
                break;
              case "lore-legendary":
                skillRank = 4;
                skillMod = actor.data.data.abilities.int.mod + charLevel + 8;
                break;
              default:
                skillRank = 0;
                skillMod = 0;
                break;Z
            }

            if (days) {
              if (skillRank) {
              earnIncome(taskLevel, charName, skillRank, skillMod, days);
              } else ui.notifications.warn("Este personagem não é treinado nesta perícia!");
            } else ui.notifications.warn("Você deve trabalhar por pelo menos um dia!");


            return;
          }
        }
      }
    }).render(true);
  } else if (actor.data.type !== 'character') ui.notifications.warn("VOcê deve selecionar um personagem jogável!");
} else ;