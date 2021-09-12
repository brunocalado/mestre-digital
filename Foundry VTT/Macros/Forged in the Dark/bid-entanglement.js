const tableHeatA = 'Entanglements - Heat 0-3';  // Entanglements - Heat 0-3
const tableHeatB = 'Entanglements - Heat 4/5';  // Entanglements - Heat 4/5
const tableHeatC = 'Entanglements - Heat 6+';   // Entanglements - Heat 6+
const compendiumTables = 'Entanglements';       // Compendium name 
const version = '1.1';
main();

/*
TODO
- replace text by journal

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/bid-entanglement.js
icon: icons/magic/nature/root-vines-entwined-leaves.webp
*/
  
async function main() {
  
  playersNames = game.actors.contents.filter((t) => t.data.type === "crew").map((p=> p.data.name)); 

  let playerNameList;

  playersNames.map((el) => {      
    playerNameList += `<option value="${el}">${el}</option>`;      
  });  
  
  new Dialog({
    title: `Entanglement - v${version}`,
    content: `
    <h2>Choose</h2>
    <p><b>Crew:</b> <select id="playerName" style="width: 200px">${playerNameList}</select></p>
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

  switch (crewHeat) {
    case 0:
    case 1:
    case 2:
    case 3:
      entanglementToUse = await drawFromTable(tableHeatA, compendiumTables) 
    break
    case 4:
    case 5:
      entanglementToUse = await drawFromTable(tableHeatB, compendiumTables) 
    break
    case 6:
    case 7:
    case 8:
    case 9:
      entanglementToUse = await drawFromTable(tableHeatC, compendiumTables) 
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
  //return await table.draw({rollMode: 'gmroll'});
  return await table;
}