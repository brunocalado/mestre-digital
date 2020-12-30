const nome = "MeuEfeito"; // Troque MeuEfeito pelo nome exato do efeito que você quer ligar ou desligar.


const macroVersion = 'v0.1';

/* Ativar/Desativar Efeito
Source: 
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
  }
}