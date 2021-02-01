const macroVersion = 'v0.1';
/* Mission Generator
Features
- 

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/ImpulseDriveAdventureGenerator.js
icon: icons/sundries/gaming/dice-runed-tan.webp
*/

(async () => { 

  let missionTypes = ['Random', 'The Milk Run', 'The Heist', 'The Assault', 'The Defense', 'The Salvage', 'The Investigation'];
  let missionList;    

  missionTypes.map((el) => {      
    if (el==='Random') {
      missionList += `<option value="${el}" selected>${el}</option>`;
    } else {
      missionList += `<option value="${el}">${el}</option>`;      
    }    
  });  
  
  let template = `
  <style>  
  #dungeonworldmacrocss header {
    background: #060f52;
    border-radius: 0;    
    border: none;    
    margin-bottom: 2px;
    font-size: .75rem;
  }
  #dungeonworldmacrocss form {
    margin-bottom: 30px;   
  }
  #dungeonworldmacrocss .window-content {    
       
  }  
  #dungeonworldmacrocss .form-fields.buttons {
    justify-content: flex-start !important;
  }
  #dungeonworldmacrocss .button {
    height: 35px;
    box-shadow: inset 0 0 0 1px #1111FF,inset 0 0 0 1.5px var(--tertiary),inset 0 0 0 1px #1111FF;
    font-size: 12px;
    padding: 0;
    background: #eb34b7;
    color: white;
    cursor: pointer;
  }
  #dungeonworldmacrocss .button:hover {
    box-shadow: 0 0 4px red;
  }
  #dungeonworldmacrocss .meuitem input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;  
  }
  #dungeonworldmacrocss .minhalista {    
    display: inline-block;
    list-style-type: none; 
    text-align: left; 
    margin: 0; 
    padding: 0; 
    width: 100%;
  }
  #dungeonworldmacrocss .meuitem {    
    display: inline-block;    
    padding: 2px; 
  }  
  #dungeonworldmacrocss .meuitem label {    
    cursor: pointer;    
    margin: 0px 3px ;
    
    height: 100%;
    width: 100%;
    border-radius: 3px;
    font-size: 16px;
    font-family: "Signika", sans-serif;  
    background: #060f52;        
    color: white;    
  }
  
  #dungeonworldmacrocss .checkbox label i {
    margin-right: 5px;
    color: white;
    background: #6d729c;
  }
  #dungeonworldmacrocss .meuitem label:hover {
    box-shadow: 0 0 14px black;
  }
  #dungeonworldmacrocss .meuitem input[type="checkbox"]:selected + label {
    background: rgba(0, 0, 150, 0.7);
  }
  #dungeonworldmacrocss .dialog-button {
    height: 50px;
    background: #060f52;
    color: white;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }    
  </style>  
  
  <h2>Mission Type</h2>
    <div class="form-fields">

    <ul class="minhalista">
      <select id="missionSelected" style="width: 200px">${missionList}</select>
    </ul>
  </div>
  
  </br>
  `;
  
  new Dialog({
    title: `Mission Generator - ${macroVersion}`,
    content: template,
    buttons: {
      ok: {
        label: "Roll",
        callback: async (html) => {
          missionRoller(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
    default: "ok"    
  }, { id: 'dungeonworldmacrocss'}).render(true);
})()

// MAIN =============================
async function missionRoller(html){
  let mission = html.find("#missionSelected")[0].value;
  
  enviarChat(mission);
}


/* Functions */
async function enviarChat(mission) {     
  if (mission=='Random') {
    const missionRandom = ['The Milk Run', 'The Heist', 'The Assault', 'The Defense', 'The Salvage', 'The Investigation'];    
    mission = missionRandom[Math.floor(Math.random() * missionRandom.length)];    
  }
  let message = `<h2>Mission: <b style="color: red">${mission}</b></h2>`;  
  let messageNoHook;
  
  if (mission=='The Milk Run') {    
    message+=`<p>Safe -2, Clock 3, 0-1 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Cargo Passengers');
    let part2 = await drawFromTable(mission + ' - ' + 'Location');
    let part4 = await drawFromTable(mission + ' - ' + 'Location');
    let part3 = await drawFromTable(mission + ' - ' + 'Complications');
    message+= `<p>Pick up (<b style="color: red">${part1}</b>) from (<b style="color: red">${part2}</b>), and deliver it to (<b style="color: red">${part4}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part3}</b></p>`;
  } else if (mission=='The Heist') {    
    message+=`<p>Risky -1, Clock 3, 0-1 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Location');
    let part2 = await drawFromTable(mission + ' - ' + 'Interact with');    
    let part3 = await drawFromTable(mission + ' - ' + 'Target');
    let part4 = await drawFromTable(mission + ' - ' + 'Complications');
    message+= `<p>Infiltrate (<b style="color: red">${part1}</b>) and (<b style="color: red">${part2}</b>) (<b style="color: red">${part3}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part4}</b></p>`;
  } else if (mission=='The Assault') {    
    message+=`<p>Deadly +1, Clock 3, 0-1 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Target');
    let part2 = await drawFromTable(mission + ' - ' + 'Intent');        
    let part3 = await drawFromTable(mission + ' - ' + 'Complication');
    message+= `<p>Assault (<b style="color: red">${part1}</b>) to (<b style="color: red">${part2}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part3}</b></p>`;
  } else if (mission=='The Defense') {    
    message+=`<p>Dangerous 0, Clock 4, 0-1 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Target');
    let part2 = await drawFromTable(mission + ' - ' + 'Threat');        
    let part3 = await drawFromTable(mission + ' - ' + 'Complication');
    message+= `<p>Protect (<b style="color: red">${part1}</b>) from (<b style="color: red">${part2}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part3}</b></p>`;
  } else if (mission=='The Salvage') {    
    message+=`<p>Risky -1, Clock 4, 0-1 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Salvage');
    let part2 = await drawFromTable(mission + ' - ' + 'Location');        
    let part3 = await drawFromTable(mission + ' - ' + 'Complications');
    message+= `<p>Go to (<b style="color: red">${part1}</b>) and search for (<b style="color: red">${part2}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part3}</b></p>`;
  } else if (mission=='The Investigation') {    
    message+=`<p>Risky -1, Clock 5, 1-2 Complications.</p>`;
    let part1 = await drawFromTable(mission + ' - ' + 'Crime');
    let part2 = await drawFromTable(mission + ' - ' + 'Mystery');        
    let part3 = await drawFromTable(mission + ' - ' + 'Complication');
    message+= `<p>Investigate and resolve Crime: (<b style="color: red">${part1}</b>) or Mystery: (<b style="color: red">${part2}</b>).</p>`;
    message+=`<p>Complications: <b style="color: red">${part3}</b></p>`;
  }

  messageNoHook = message;
  addEventListenerOnHtmlElement("#createJournal", 'click', (e) => {    
    createMissionJournal(mission, messageNoHook);      
  });          
  message+=`<button style="background:#d10000;color:white" id="createJournal">Create Journal</button>`;

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
  let inside = await list_compendium.filter( p=>p.metadata.label=='Contract' )[0].getContent();      
  const table = await inside.filter( p=>p._data['name']==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  return await table.roll().results[0].text;  
}

function addEventListenerOnHtmlElement(element, event, func){    
    Hooks.once("renderChatMessage", (chatItem, html) => { // Use Hook to add event to chat message html element
        html[0].querySelector(element).addEventListener(event, func);        
    });
} // end addEventListenerOnHtmlElement

async function createMissionJournal(mission, message) {  
  let myjournal = await JournalEntry.create({   
    name: mission,  
    content: message    
  });
  await myjournal.sheet.render(true);  
}