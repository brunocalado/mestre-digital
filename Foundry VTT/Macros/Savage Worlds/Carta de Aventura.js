/* Carta de Aventura - v1.2

Fonte: https://gitlab.com/lipefl/foundrymacros/-/blob/master/macros/CartaDeAventura.js
Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Carta%20de%20Aventura.svg
TODO:
- Auto add item.
- Auto check item.
*/

let itemCard = "Carta de Aventura" // nome do item que guarda a carta
let defaultTable = "Adventure Deck" // nome da tabela padrão

let chars = game.actors.entities.filter(t => t.data.type === "character"); // todos os personagens
let optionchars = '';
let allchars = [];

for (const char of chars) {
  let myitem = char.items.find(i => i.name === itemCard);
  if (myitem !== null) { // filtra personagens que tem o item 
    optionchars += `<option value="` + char._id + `">` + char.name + `</option>`;
    allchars.push(char._id);
  }
}

if (!optionchars) { // nenhum personagem
  ui.notifications.warn(`Nenhum personagem possui o item ` + itemCard + `.`, {});
} else {  
  getRequirements();
}

function getRequirements() {
  let rollTableName = ""; // nome da tabela com as cartas
  Array.from(game.tables).map((el) => { 
    if (defaultTable==el.data.name) {
      rollTableName += `<option value="${el.data.name}" selected>${el.data.name}</option>`;
    } else {
      rollTableName += `<option value="${el.data.name}">${el.data.name}</option>`;
    }
  });

  let template = `
<h2>Distribuição</h2>
<p>Quantas cartas? <input id="qtde" type="number" min="1" max="3" style="width: 50px" value=1></p>
<p>Para qual personagem? <select id="jogs"><option value="todos">Todos</option>` + optionchars + `</select></p>
</br>
<h2>Opções</h2>
<p>Usar a tabela: <select id="tableName">${rollTableName}</select></p>
<p>
  <h3>Origem</h3>
  <input type="radio" id="compendium" name="origem" value="compendium">
  <label for="compendium">Compendium</label>
  <input type="radio" id="journal" name="origem" value="journal" checked="checked>
  <label for="journal">Journal</label>
</p>
<p>Item: <b>${itemCard}</b></p>
<h2>Ajuda</h2>
<p>Cada jogador deve ter um item chamado <b>${itemCard}</b>. O sorteio será realizado e a carta será colocada na descrição desse item. Você pode alterar a tabela e item padrões indo no começo dessa macro e colocando o nome desejado para ser o padrão.</p>
`;

  new Dialog({
    title: "Cartas de Aventura - v1.2",
    content: template,
    buttons: {
      ok: {
        label: "Entregar",
        callback: function(html) {
          applyFormOptions(html)
        }
      },
      cancel: {
        label: "Cancelar",
      },
    },
  }).render(true);
}

function applyFormOptions(html) {
  let qtde = html.find("#qtde")[0].value;
  let selchar = html.find("#jogs")[0].value;
  let tableName = html.find("#tableName")[0].value;
  let origem = html.find('input[name="origem"]:checked').val();

  if (selchar === 'todos') {

    for (let i = 0; i < allchars.length; i++) {
      giveCards(qtde, allchars[i], tableName, origem);
    }

  } else {
    giveCards(qtde, selchar, tableName, origem);
  }

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: 'Cartas de Aventura entregues'
  };
  ChatMessage.create(chatData, {});
}

function giveCards(howmany, actorId, rollTableName, origem) {
  let char = game.actors.get(actorId);
  let myitem = char.items.find(i => i.name === itemCard);
  let updatedesc = '';

  for (let i = 1; i <= howmany; i++) {
    let results = drawFromTable(rollTableName);
    if (origem=='compendium') {
      updatedesc += '<p>@Compendium[' + results[0].collection + '.' + results[0].resultId + ']{' + results[0].text + '}</p>';
    } else {
      updatedesc += '<p>@' + results[0].collection + '[' + results[0].resultId + ']{' + results[0].text + '}</p>';
    }    
  }

  myitem.update({
    ["data.description"]: updatedesc
  });
}

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