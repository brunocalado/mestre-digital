/* EXP Manager - v0.1 
## Features
- Select a token  and it'll be selected
- Choose the amount of experience to give.

source: 
icon:
*/

main();

function main() {
  let playersNames = game.actors.entities.filter((t) => t.data.type === "character").map((p=> p.data.name)); 
  let playerNameList = '';
  let currentHeroPointsList = '';
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
  
  /* Show actual xp points*/
  let currentHeroPoints = checkHeroExp();
  for (let i = 0; i < currentHeroPoints.length; i++) {
    currentHeroPointsList += '<li>' + currentHeroPoints[i][0] + ': ' + currentHeroPoints[i][1] + '</li>';
    console.log('<li>' + currentHeroPoints[i][0] + ': ' + currentHeroPoints[i][1] + '</li>');
  }  
  
  let template = `
  <h2>Choose</h2>
  <p><b>Hero:</b> <select id="playerName" style="width: 200px">${playerNameList}</select></p>
  <p>
    <b>How much points do you want to give?</b> <input id="heroPoints" type="number" min="-10" max="10" style="width: 80px; box-sizing: border-box;border: none;background-color: #2d3748;color: white; text-align: center; " value=1>
  </p>    
  <h2>Current Experience Points</h2>
  <ul>
    ${currentHeroPointsList}
  </ul>
  `;
  new Dialog({
    title: "Experience Points Manager v0.1",
    content: template,
    buttons: {
      ok: {
        label: "Apply",
        callback: (html) => {
          expmanager(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

function expmanager(html){
  let playerName = html.find("#playerName")[0].value;
  let heroPoints = html.find("#heroPoints")[0].value;  
  
  updateHeroPoints(playerName, heroPoints);
}

function updateHeroPoints(playerName, heroPoints) {
  let character = game.actors.entities.filter((t) => t.data.type === "character").filter((v) => v.data.name === playerName)[0];
  let currentHeroPoints = parseInt( character.data.data.attributes.xp.value);
  let total = currentHeroPoints + parseInt( heroPoints );
  console.log('Adding ' + heroPoints + ' to ' + playerName + '. Total: ' + total);
  character.update({['data.attributes.xp.value']: total});
}

function checkHeroExp() {
  let heros = [];
  let characters = game.actors.entities.filter((t) => t.data.type === "character");
  characters.forEach( (c) => {
    //console.log(c.data.name + '/ ' + c.data.data.attributes.heroPoints.rank);    
    heros.push([c.data.name, c.data.data.attributes.xp.value]);
  }); 
  return heros;
}
