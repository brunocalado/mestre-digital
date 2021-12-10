/* - v1.1
Source: brunocalado
Icon: icons/environment/people/commoner.webp
*/

(async () => {
  const faction1 = await drawFromTable('Factions');
  const faction2 = await drawFromTable('Factions');
  const client = await drawFromTable('Client / Target');
  const target = await drawFromTable('Client / Target');
  const twist = await drawFromTable('Twist');
  const place = await drawFromTable('Job Location');
  const task = await drawFromTable('Work');
  const connection = await drawFromTable('Connection');

  let msg = `<h2>Job</h2>`;
  msg += `<ul><li>Faction 1: <b>${faction1}</b></li>`;
  msg += `<li>Faction 2: <b>${faction2}</b></li>`;
  msg += `<li>Client: <b>${client}</b></li>`;
  msg += `<li>Target: <b>${target}</b></li>`;
  msg += `<li>Twist: <b>${twist}</b></li>`;
  msg += `<li>Job Location: <b>${place}</b></li>`;
  msg += `<li>Job: <b>${task}</b></li>`;
  msg += `<li>Connection: <b>${connection}</b></li></ul>`;

  let message=msg;
  let msgId = randomID();

  let data = {
    name: `${task}`,
    content: msg
  };          
  
  message+=`<button style="background:#d10000;color:white" id="createJob-`
  message+=msgId;
  message+=`">Save As Journal Entry</button>`;

  let chatData = {
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  
  
  addEventListenerOnHtmlElement("#createJob-" + msgId, 'click', (e) => {
    createJob(data);    
  });
})()

/* Functions */
async function drawFromTable(tableName) {

  let roll_compendiums;
  let job_compendiums;
  if( game.majorVersion > 7 ) {
    roll_compendiums = game.packs.filter( p => p.documentName === 'RollTable');
    job_compendiums = await roll_compendiums.filter( p => p.metadata.label === 'Job Tables' )[0].getDocuments();
  } else {
    roll_compendiums = game.packs.filter( p => p.entity === 'RollTable');
    job_compendiums = await roll_compendiums.filter( p => p.metadata.label === 'Job Tables' )[0].getContent();
  }
  const table = await job_compendiums.filter( p=> p.name === tableName )[0];        
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  const output = await table.roll();
  const result = output.results[0].data.text;
  return result;  
}

function addEventListenerOnHtmlElement(element, event, func){    
  Hooks.on("renderChatMessage", (chatItem, html, data) => {
    if( html[0].querySelector(element) !== null ) {
      html[0].querySelector(element).addEventListener(event, func);
    }
  });
}

async function createJob(data) {

  let folder;
  if( game.folders.find( f => f.name === "Job Ideas") === undefined ) {
    folder = await Folder.create( {
      name: "Job Ideas",
      type: "JournalEntry"
    } );
  } else {
    folder = game.folders.find( f => f.name === "Job Ideas");
  }
  data.folder = folder;

  const instantAdventure = await JournalEntry.create(data);
  await instantAdventure.sheet.render(true);    
}