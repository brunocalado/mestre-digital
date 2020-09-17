/* Instant NPC - v1.0
Source: https://github.com/brunocalado/mestre-digital/tree/master/Foundry%20VTT/Macros/Dungeon%20World
Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/Instant%20NPC.svg
*/

const NPCName = drawFromTable('Names')[0].text;
const NPCKnack = drawFromTable('Knacks')[0].text;
const NPCInstinct = drawFromTable('Instincts')[0].text;
let msg = '';
msg = `<h3>Personality</h3>`;
msg += `<p><b>Instinct:</b> ${NPCInstinct}</p>`;
msg += `<p><b>Knack:</b> ${NPCKnack}</p>`;
msg += `<h3>Treasure</h3>`;
msg += `<p>${treasureCoins(1,10)} coins.</p>`;

(async () => {
  let instantNPC = await Actor.create({
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
      }
    }
  });
  
  console.log(instantNPC);
})()

/* Funcions */
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

function treasureCoins(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;  
}
