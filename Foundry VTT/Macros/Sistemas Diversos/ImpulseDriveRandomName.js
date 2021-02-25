const macroVersion = 'v0.1';
/* Random Name
Features
- 

source: 
icon: icons/sundries/books/book-stack.webp
*/

enviarChat();

// MAIN =============================
async function enviarChat() {     
  let randomname = await drawFromTable('Random Names');        
  let message = `<h2>Random Name</h2>`;
  message+=`<h3><b style="color: red">${randomname}</b></h3>`;

  let chatData = {
    user: game.user._id,    
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  
}

/* Functions */
async function drawFromTable(tableName) {

  let list_compendium = await game.packs.filter(p=>p.entity=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='Tables' )[0].getContent();      
  const table = await inside.filter( p=>p._data['name']==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  return await table.roll().results[0].text;  
}