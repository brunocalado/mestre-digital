const nome = "AURA DE PROTEÇÃO"; // Troque MeuEfeito pelo nome exato do efeito que você quer ligar ou desligar.

// Configuração da luz
const pulse = {"type": "pulse", "speed": 5, "intensity": 5};
const luzLigada = {"dimLight": 0, "brightLight": 0, "lightAnimation": pulse}; 
const luzDesligada = {"dimLight": 20, "brightLight": 0, "lightAnimation": pulse};

const macroVersion = 'v0.3';
/* Ativar/Desativar Efeito
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/DnD%205e/ToogleAE.js
Icon: 
*/
//

if (!actor) {
  ui.notifications.warn(`Selecione um token!`); // get selected token 
} else {
  main();
}

async function main() {  
  let effect = canvas.tokens.controlled[0].actor.effects.find(i => i.data.label === nome);
  if (!effect) {
    ui.notifications.warn(`Efeito não localizado!`); // get selected token 
  } else {
    if (!effect.data.disabled) { //desliga 
      (async () => {
        await tokenUpdate(luzLigada);  
      })()
    } else { //liga
      (async () => {
        await tokenUpdate(luzDesligada);  
      })()
    }    
    await effect.update({disabled: !effect.data.disabled});                
    let mensagem = `O efeito <b>${nome}</b> foi ${effect.data.disabled?'<b style="color:red">desativado!</b>':'<b style="color:green">ativado!</b>'}</b>`;
    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: mensagem
    };  
    ChatMessage.create(chatData, {});    
    
  }
}

async function tokenUpdate(data) {
  await canvas.tokens.controlled.map(token => token.update(data));
}

