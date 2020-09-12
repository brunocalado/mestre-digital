/* Carta de Aventura - v1.0

Fonte: https://gitlab.com/lipefl/foundrymacros/-/blob/master/macros/CartaDeAventura.js
Icon: 
*/

var rollTableName = "BaralhoAventura" /// nome da tabela com as cartas
var itemCard="Carta de Aventura" /// nome do item que guarda a carta

let chars=game.actors.entities.filter(t=> t.data.type === "character"); /// todos os personagens
let optionchars='';
var allchars=[];

for (const char of chars){
let myitem= char.items.find(i=>i.name === itemCard);
if (myitem!==null){ /// filtra personagens que tem o item 
optionchars+=`<option value="`+char._id+`">`+char.name+`</option>`;
allchars.push(char._id);
}

}

if (!optionchars){ /// nenhum personagem
    ui.notifications.warn(`Nenhum personagem possui o item `+itemCard+`.`, {});
}

let template= `<p>Quantas cartas? <input type="number" value="1" id="qtde" style="width:50px" /></p>
<p>Para qual personagem? <select id="jogs"><option value="todos">Todos</option>`+optionchars+`</select></p>`;
new Dialog({
    title: "Entregar Cartas de Aventura",
    content: template,
    buttons: {
      ok: {
        label: "Entregar",
        callback: function(html){ applyFormOptions(html)}
      },
      cancel: {
        label: "Cancelar",
      },
    },
  }).render(true);

  function drawFromTable(tableName) {
    const table = game.tables.getName(tableName);
    if (!table) {
      ui.notifications.warn(`Table ${tableName} not found.`, {});
      return;
    }
    let results = table.roll().results;
  
    // if table is without replacemenets, mark results as drawn
    if (table.data.replacement === false) {
      results = results.map(r => {
        r.drawn = true;
        return r;
      });
  
     table.updateEmbeddedEntity("TableResult", results);
    }
    
    return results
  }

function applyFormOptions(html) {
let qtde= html.find("#qtde")[0].value;
let selchar= html.find("#jogs")[0].value;


if (selchar==='todos'){

    for (let i=0;i<allchars.length;i++){
        giveCards(qtde,allchars[i]);
    }

} else {
    giveCards(qtde,selchar);
}

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: 'Cartas de Aventura entregues'
};
ChatMessage.create(chatData, {});
}

function giveCards(howmany,actorId){
 let char=game.actors.get(actorId);
 let myitem=char.items.find(i=>i.name === itemCard);
 let updatedesc='';

 for(let i=1;i<=howmany;i++){
    let results=drawFromTable(rollTableName);
    updatedesc+='<p>@Compendium['+results[0].collection+'.'+results[0].resultId+']{'+results[0].text+'}</p>';
 }

 myitem.update({["data.description"]:updatedesc});
}



