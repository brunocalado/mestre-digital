/* - v1.1
Source:
Icon: 
Icon2: icons/environment/people/commoner.webp
*/

(async () => {
  const faction1 = await drawFromTable('Facções');
  const faction2 = await drawFromTable('Facções');
  const client = await drawFromTable('Cliente/Alvo');
  const target = await drawFromTable('Cliente/Alvo');
  const twist = await drawFromTable('Reviravolta ou Complicação');
  const place = await drawFromTable('Local da Tarefa');
  const task = await drawFromTable('Tarefa');
  const connection = await drawFromTable('Conexão');

  let msg = `<h2>Trabalho</h2>`;
  msg += `<ul><li>Facção 1: <b>${faction1}</b></li>`;
  msg += `<li>Facção 2: <b>${faction2}</b></li>`;
  msg += `<li>Cliente: <b>${client}</b></li>`;
  msg += `<li>Alvo: <b>${target}</b></li>`;
  msg += `<li>Reviravolta ou Complicação: <b>${twist}</b></li>`;
  msg += `<li>Local da Tarefa: <b>${place}</b></li>`;
  msg += `<li>Tarefa: <b>${task}</b></li>`;
  msg += `<li>Conexão: <b>${connection}</b></li></ul>`;  

  msg+= `<br>`;
  msg+= await createPeople();
  msg+= `<br>`;
  msg+= await createPeople();  
  
  let message=msg;
  message += `<p>Personagens serão criados dentro do registro criado.</p>`; // vai para o chat

  let data = {
    name: `${task}`,
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

async function createPeople() {
  const name1 = await drawFromTable('Nomes');
  const surname = await drawFromTable('Sobrenomes');
  const aparen1 = await drawFromTable('Aparência - Identidade');
  const aparen2 = await drawFromTable('Aparência');
  const alias = await drawFromTable('Codinomes');

  let msg = `<h2>${name1} ${surname} (${alias})</h2>`;
  msg += `<ul><li>Sugestão de Identidade: <b>${aparen1}</b></li>`;
  msg += `<li>Aparência: <b>${aparen2}</b></li></ul>`;
  
  return msg;
}