const tableHeatA = 'Entanglements - Heat 0-3';  // Entanglements - Heat 0-3
const tableHeatB = 'Entanglements - Heat 4/5';  // Entanglements - Heat 4/5
const tableHeatC = 'Entanglements - Heat 6+';   // Entanglements - Heat 6+
let crewName = 'crew';  
const version = '1.0';
main();

/*
TODO
- replace text by journal
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
  
  let crew = game.actors.getName(playerName).data.data;
  let crewHeat = parseInt(crew.heat);
  let crewWanted = parseInt(crew.wanted);

  let entanglementToUse = '';

  switch (crewHeat) {
    case 0:
    case 1:
    case 2:
    case 3:
      entanglementToUse = game.tables.getName(tableHeatA);
    break
    case 4:
    case 5:
      entanglementToUse = game.tables.getName(tableHeatB);
    break
    case 6:
    case 7:
    case 8:
    case 9:
      entanglementToUse = game.tables.getName(tableHeatC);
  }

  let rollFormula = `${crewWanted}d6`;
  if (rollFormula === "0d6") {
    rollFormula = "2d6kl1";
  }

  entanglementToUse.data.formula = rollFormula;

  entanglementToUse.draw();
}

