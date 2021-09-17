/* - v1.1
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/scum-villainy_people.js
Icon: 
*/

(async () => {
  const name1 = await drawFromTable('Nomes');
  const surname = await drawFromTable('Sobrenomes');
  const aparen1 = await drawFromTable('Aparência - Identidade');
  const aparen2 = await drawFromTable('Aparência');
  const alias = await drawFromTable('Codinomes');

  let msg = `<h2>${name1} ${surname} (${alias})</h2>`;
  msg += `<ul><li>Sugestão de Identidade: <b>${aparen1}</b></li>`;
  msg += `<li>Aparência: <b>${aparen2}</b></li></ul>`;
  
  let message=msg;

  let data = {
    name: `${name1}`,
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

async function createNPC(data) {  
  const instantAdventure = await JournalEntry.create(data);
  await instantAdventure.sheet.render(true);    
}

