const nome = "MeuEfeito"; // Troque MeuEfeito pelo nome exato do efeito que você quer ligar ou desligar.

const macroVersion = 'v0.2';

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
    await effect.update({disabled: !effect.data.disabled});            
    let mensagem = `O efeito <b>${nome}</b> foi <b>${effect.data.disabled?'ligado':'desligado'}</b>`;
    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: mensagem
    };  
    ChatMessage.create(chatData, {});    
    
  }
}

