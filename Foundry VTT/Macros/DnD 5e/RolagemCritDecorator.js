/* RPG NEXT
https://gitlab.com/Nat-Faeeria/crit-decorator
*/

// SUCESSO
(total)=> { 
  const somSucesso = 'music/criticos/Acerto%20Critico%20-%20DBZ.mp3';
  const table = game.tables.entities.find(t => t.name === "Acerto Crítico"); 
  table.draw();   
  let chatData = { user: game.user.id, content: `<h1>Sucesso Crítico!!!</h1>`, speaker: ChatMessage.getSpeaker()};
  ChatMessage.create(chatData, {});
  AudioHelper.play({src: somSucesso, volume: 0.8, autoplay: true, loop: false}, true);
}

// FALHA 
(total)=> { 
  const somFalha = 'music/criticos/Falha%20Critica%20-%20Vicetone.mp3';
  const table = game.tables.entities.find(t => t.name === "Falhas Críticas"); 
  table.draw();
  AudioHelper.play({src: somFalha, volume: 0.8, autoplay: true, loop: false}, true);
}


tion addEventListenerOnHtmlElement(element, event, func){    
    Hooks.once("renderChatMessage", (chatItem, html) => { // Use Hook to add event to chat message html element
        html[0].querySelector(element).addEventListener(event, func);        
    });
    
      addEventListenerOnHtmlElement("#createNPC", 'click', (e) => {    
    createRandomNPC({
    name: NPCName,
    type: "npc",
    img: "",    
    sort: 12000,
    data: {},
    token: {},
    items: [],
    flags: {},
    data: {
      details: {
        biography: msg
      },
      attributes: {
        damage: {
          value: damageDieRolado
        },
        ac: {
          value: randomArmorRolado
        },
        hp: {
          max: npchp,
          value: npchp
        }           
      }      
    }
    });    
  });    
  
    message+=`<button style="background:#d10000;color:white" id="createNPC">Create NPC</button>`;
  
  let chatData = {
    user: game.user._id,    
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});

============================================================================
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
============================================================================

async (total)=> { 
  let list_compendium = await game.packs.filter(p=>p.entity=='RollTable');
  let table = await list_compendium.filter( p=>p.metadata.label=='RPG Next - Tabelas' )[0].getContent();
  table[0].draw();   
  let chatData = { user: game.user.id, content: `<h1>Sucesso Crítico!!!</h1>`, speaker: ChatMessage.getSpeaker()};
  ChatMessage.create(chatData, {});
}

async (total)=> { 
  let list_compendium = await game.packs.filter(p=>p.entity=='RollTable');
  let table = await list_compendium.filter( p=>p.metadata.label=='RPG Next - Tabelas' )[0].getContent();
  table[1].draw();   
  let chatData = { user: game.user.id, content: `<h1>Falha Crítica!!!</h1>`, speaker: ChatMessage.getSpeaker()};
  ChatMessage.create(chatData, {});
}


(total)=> { 
}
