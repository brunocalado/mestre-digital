/* Test Shaken - v1.0
*/

let shakenImgPath = "Resources/0-Shaken.png"

/* caralho haha
- verifica se está shaken
-- senao alerta
-- se está faz abaixo
- seleciona o espirito
- conta ferimentos e fadiga
- verifica edges
- soma pontos
- checa se é wild card
- rola o dado
- da o resultado
*/

async function rollUnshake() {  
  let msg = `<h2>Shaken Roll</h2>`;
  const edgeNames = ['combat reflexes', 'demon', 'undead', 'construct'];
  const actorAlias = speaker.alias;
  // ROLL SPIRIT AND CHECK COMBAT REFLEXES   
  const r = await new Roll( 'd' + token.actor.data.data.attributes.spirit.die['sides'] + 'x= +1d6x=' ).roll();
  r.toMessage({flavor: msg}); 
  
  
  const edges = token.actor.data.items.filter(function (item) {
    return edgeNames.includes(item.name.toLowerCase())  && item.type === "edge";
  });  
  let rollWithEdge = r.total;
  let edgeText = "";  
  for (let edge of edges) {
    rollWithEdge += 2;
    edgeText = `<br/><i>+ ${edge.name}</i>`;
  }

  let chatData = `${actorAlias} rolled <span style="font-size:150%"> ${rollWithEdge} </span>`;
  
  if (rollWithEdge > 3 && rollWithEdge <= 7) {
    chatData += ` and is no longer Shaken but cannot act this turn.`;
    token.actor.update({"data.status.isShaken": false});
  } else if (rollWithEdge >= 8) {
    chatData += `, is no longer Shaken and may act normally.`;
    token.actor.update({"data.status.isShaken": false});
  } else {
    chatData += `, is still Shaken, may only move at half pace but may take free actions.`;
  }
  chatData += ` ${edgeText}`;

  ChatMessage.create({content: chatData});
}

if (token) {
  if(token && token.data.effects.includes(shakenImgPath)){
    console.log('=======================');
    rollUnshake()
  } else if(token) {
    token.actor.update({"data.status.isShaken": true});
    ui.notifications.warn(`It's not shaken.`);  
  }
} else {
  ui.notifications.warn(`Select a token!`);
}