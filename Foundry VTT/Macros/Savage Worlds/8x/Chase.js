const version = 'v1.1';

/* Chase
Features
- Draw n cards placing them in the scene
- This macro can reset the table preventing from the error
- This macro can line up the cards
source: 
icon: icons/sundries/gaming/playing-cards.webp
*/

main();

function main() {
  //How Many Cards to Draw
  //Width/Height
  //Which Table to Draw From
  let cardsList = "";
  Array.from(game.tables).map((el) => {
    cardsList += `<option value="${el.data.name}">${el.data.name}</option>`;
  });

  let template = `
  <p>Table to Draw From: <select id="tableName">${cardsList}</select></p>
  <p>
    Cards to Draw (Lines x Columns): <input id="dogFightLines" type="number" min="1" style="width: 50px;" value=1> x <input id="dogFightColumns" type="number" min="1" style="width: 50px;" value=9>
  </p>  
  <p>
    Height: <input id="height" type="number" min="1" style="width: 50px" value=150>
    Width: <input id="width" type="number" min="1" style="width: 50px" value=107>
  </p>
  <br />
  <p>
    <input type="checkbox" id="reset" checked/>
    Reset Table?
  </p> 
  <p>
    <input type="checkbox" id="stackupcards"/>
    Just stack up all cards
  </p>  
  <br />  
  <p>
    <h3>Horizontal spacing between cards</h3>
    <input id="spacingx" type="range" min="0" max="100" value="20" step="5">
  </p>
  <p>
    <h3>Vertical spacing between cards (dogfight only)</h3>
    <input id="spacingy" type="range" min="0" max="100" value="100" step="5">  
  </p>
  `;
  new Dialog({
    title: `Draw Cards To Table - ${version}`,
    content: template,
    buttons: {
      ok: {
        label: "Draw",
        callback: async (html) => {
          makeTiles(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function makeTiles(html) {  
  let spacingx = html.find("#spacingx")[0].value/100;
  let spacingy = html.find("#spacingy")[0].value/100;
  let dogFightLines = html.find("#dogFightLines")[0].value;
  let dogFightColumns = html.find("#dogFightColumns")[0].value;  
  let resetTable = html.find("#reset")[0].value;
  const stackupcards = html.find("#stackupcards")[0].checked;
  let tableName = html.find("#tableName")[0].value;
  let cardsToDraw = dogFightLines*dogFightColumns;
  let height = html.find("#height")[0].value;
  let width = html.find("#width")[0].value;

  if (resetTable=='on') {
    await game.tables.find((el) => el.data.name == tableName).reset();
  }

  let cardDraws = (
    await game.tables
      .find((el) => el.data.name == tableName)
      .drawMany(cardsToDraw)
  ).results;
/*
let cardDraws = ( await game.tables.find((el) => el.data.name == 'Action Cards').drawMany(5).results );
*/

  let centerX = Math.round(game.scenes.active.data.width/3);
  let centerY = Math.round(game.scenes.active.data.height/2);
  
  let deltaX = 0;
  let deltaY = 0;
  let counter = 0;
  
  //console.log(spacingx + '/' + spacingy + ' stackupcards:' + (stackupcards!='on'));
  let tData;
  for (let y = 0; y < dogFightLines; y++) {
    deltaY = Math.round( height*y + height*spacingy*y );
    for (let x = 0; x < dogFightColumns; x++) {                
      deltaX = Math.round( width*x + width*spacingx*x );            
      if (stackupcards) {
        deltaX = 0;
        deltaY = 0;        
      }
      tData = {
        img: cardDraws[counter].data.img,
        width: parseInt(width),
        height: parseInt(height),
        x: parseInt(centerX + deltaX),
        y: parseInt(centerY + deltaY)
      };
      console.log(tData);
      await TileDocument.create(tData, {parent: canvas.scene});      
      //console.log('x:' + x + ' y:' + y + ' counter:' + counter + ' deltaX:' + deltaX + ' deltaY:' + deltaY);
      counter = counter + 1;
      //console.log('centerX: ' + centerX + ' / deltaX: ' + deltaX + ' / centerX+deltaX:' + (centerX+deltaX) ); 
    }      
  }
}