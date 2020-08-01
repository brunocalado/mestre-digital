/* =======================================
## Instructions
# Give one player hero points.
You can select the token player or choose him from the combobox. 
Choose the amount of hero points and click Apply. 

# Reset hero points
If you check this box, all players will have their hero points set to one.

source: https://github.com/brunocalado/mestre-digital/tree/master/Foundry%20VTT/Macros/Pathfinder%202
*/

getRequirements();

function getRequirements() {
  let playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
  let playerNameList = '';
  let playerSelected;
  if (actor) {   /* get selected token */
    playerSelected = canvas.tokens.controlled[0].actor.name;    
  }    
  playersNames.map((el) => {      
    if (el===playerSelected) {
      playerNameList += `<option value="${el}" selected>${el}</option>`;
    } else {
      playerNameList += `<option value="${el}">${el}</option>`;      
    }    
  });
  
  let template = `
  <p>Player: <select id="playerName">${playerNameList}</select></p>
  <p>
    How much points do you want to give? <input id="heroPoints" type="number" min="1" max="3" style="width: 50px;" value=1>
  </p>  
  <br />
  <p>
    <input type="checkbox" id="reset"/>
    Reset Hero Points? (this will set each character to 1 hero point)
  </p> 
  `;
  new Dialog({
    title: "Hero Points",
    content: template,
    buttons: {
      ok: {
        label: "Apply",
        callback: (html) => {
          main(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

function main(html){
  let playerName = html.find("#playerName")[0].value;
  let heroPoints = html.find("#heroPoints")[0].value;  
  const resetHeroPointsFlag = html.find("#reset")[0].checked;  
  
  if (resetHeroPointsFlag) {    
    resetHeroPoints();
  } else {
    updateHeroPoints(playerName, heroPoints);
  }
}

function updateHeroPoints(playerName, heroPoints) {
  let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
  let currentHeroPoints = parseInt( character.data.data.attributes.heroPoints.rank, 10);
  let total = currentHeroPoints + parseInt( heroPoints, 10);
  console.log('Adding ' + heroPoints + ' to ' + playerName + '. Total: ' + total);
  if (total>3) { // check sum
    ui.notifications.warn(`Player [${playerName}] has ${currentHeroPoints}. Maximum allowed is 3.`, {});   
  } else {    
    character.update({['data.attributes.heroPoints.rank']: total});  
  }
}

function resetHeroPoints() {
  let characters = game.actors.entities.filter((t) => t.data.type === "character");
  characters.forEach( (c) => {
    console.log(c.data.data.attributes.heroPoints.rank);
    c.update({['data.attributes.heroPoints.rank']: 1});  
  }); 
}