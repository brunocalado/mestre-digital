const tableHeatA = 'Wanted 0';  // Entanglements - Heat 0-3
const tableHeatB = 'Wanted 1';  // Entanglements - Heat 4/5
const tableHeatC = 'Wanted 2';   // Entanglements - Heat 6+
const tableHeatD = 'Wanted 3';   // Entanglements - Heat 6+
const compendiumTables = 'Wanted Tables';       // Compendium name 
const version = '1.0';
main();

/*
TODO
- replace text by journal

source: 
icon: icons/magic/nature/root-vines-entwined-leaves.webp
*/
  
async function main() {
  
  playersNames = game.actors.contents.filter((t) => t.data.type === "ship").map((p=> p.data.name)); 

  let playerNameList;

  playersNames.map((el) => {      
    playerNameList += `<option value="${el}">${el}</option>`;      
  });  
  
  new Dialog({
    title: `Entanglement - v${version}`,
    content: `
    <h2>Crew</h2>
    <p><select id="playerName" style="width: 100%">${playerNameList}</select></p>
    <br>
    <p>
      <input type="checkbox" id="whisper" checked/>Whisper?
    </p>
    `,
    buttons: {
      roll: {
        label: "Change",
        callback: (html) => {
          createImageFolder(html);
        }
      }, 
      cancel: {
        label: "Cancel"
      }
    }
  }).render(true)
}

async function createImageFolder(html) {
  let playerName = html.find("#playerName")[0].value;
  let whisper = html.find("#whisper")[0].checked;

  let crew = game.actors.getName(playerName).data.data;
  let crewHeat = parseInt(crew.heat);
  let crewWanted = parseInt(crew.wanted);

  let entanglementToUse = '';

  switch (crewWanted) {
    case 0:
      entanglementToUse = await drawFromTable(tableHeatA, compendiumTables);
      break;
    case 1:
      entanglementToUse = await drawFromTable(tableHeatB, compendiumTables);
      break;    
    case 2:
      entanglementToUse = await drawFromTable(tableHeatC, compendiumTables);
      break;    
    case 3:
      entanglementToUse = await drawFromTable(tableHeatD, compendiumTables);
      break;      
  }

  let rollFormula = `${crewWanted}d6`;
  if (rollFormula === "0d6") {
    rollFormula = "2d6kl1";
  }

  entanglementToUse.data.formula = rollFormula;
  
  if (whisper) {
    entanglementToUse.draw({rollMode: 'gmroll'});
  } else {
    entanglementToUse.draw();
  }  
}

async function drawFromTable(tableName, compendiumName) {
  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label==compendiumName )[0].getDocuments();      
  let table = await inside.filter( p=>p.data['name']==tableName )[0];
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  return await table;
}