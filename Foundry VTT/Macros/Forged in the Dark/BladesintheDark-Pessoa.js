/* Gerar Pessoa - v1.1
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/BladesintheDark-Pessoa.js
Icon: icons/environment/people/commoner.webp
*/

(async () => {
  const nome = await drawFromTable('Pessoas - Nomes');
  const sobrenome = await drawFromTable('Pessoas - Sobrenomes');
  const traco = await drawFromTable('Pessoas - Traços');
  const raizes = await drawFromTable('Pessoas - Raízes');
  const aparencia = await drawFromTable('Pessoas - Aparência');
  const estilo = await drawFromTable('Pessoas - Estilo');
  const objetivo = await drawFromTable('Pessoas - Objetivos');
  const metodosAcao = await drawFromTable('Pessoas - Métodos de Ação');
  const peculiaridades = await drawFromTable('Pessoas - Peculiaridades');
  const alcunhas = await drawFromTable('Pessoas - Alcunhas');
  const profissao = await drawFromTable('Pessoas - Profissões');
  const interesse = await drawFromTable('Pessoas - Interesses');

  let msg = `<h2>${nome} ${sobrenome}</h2>`;
  msg += `<ul><li>Nome + Sobrenome: <b>${nome} ${sobrenome}</b></li>`;
  msg += `<li>Possível Alcunha: <b>${alcunhas}</b></li>`;
  msg += `<li>Traço: <b>${traco}</b></li>`;
  msg += `<li>Origens: <b>${raizes}</b></li>`;
  msg += `<li>Aparência: <b>${aparencia}</b></li>`;
  msg += `<li>Estilo: <b>${estilo}</b></li>`;
  msg += `<li>Objetivo: <b>${objetivo}</b></li>`;
  msg += `<li>Métodos de Ação: <b>${metodosAcao}</b></li>`;
  msg += `<li>Interesse: <b>${interesse}</b></li>`;
  msg += `<li>Peculiaridades: <b>${peculiaridades}</b></li>`;
  msg += `<li>Profissão: <b>${profissao}</b></li></ul><br>`;
  
  let message=msg;

  let data = {
    name: `${nome} ${sobrenome}`,
    content: msg
  };
  addEventListenerOnHtmlElement("#createNPC", 'click', (e) => {    
    createNPC(data);    
  });          
  
  message+=`<button style="background:#d10000;color:white" id="createNPC">Criar</button>`;
  
  let chatData = {
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  

})()

/* Functions */
async function drawFromTable(tableName) {

  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='Tabelas' )[0].getDocuments();      
  const table = await inside.filter( p=>p.name==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  const output = await table.roll();
  const result = output.results[0].data.text;
  return result;  
}

function addEventListenerOnHtmlElement(element, event, func){    
    Hooks.once("renderChatMessage", (chatItem, html) => { // Use Hook to add event to chat message html element
        html[0].querySelector(element).addEventListener(event, func);        
    });
} // end addEventListenerOnHtmlElement

async function createRandomNPC(data) {  
  const instantNPC = await Actor.create(data);
  await instantNPC.sheet.render(true);    
}

async function createNPC(data) {  
  const instantAdventure = await JournalEntry.create(data);
  await instantAdventure.sheet.render(true);    
}
