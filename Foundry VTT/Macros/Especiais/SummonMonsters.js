/*
TODO
- Read folder in actor 
- Read compendium with sequencer macros
*/

const summonName = 'Skeleton';
const compendiumName = 'Animations';
const summonsFolder = 'Summons';
const version = 'v1.0';

main();

async function main() {

  let actors = game.actors.filter(e => e.data.folder === game.folders.getName(summonsFolder).id);
  let actorsList = ``;
  for (let i = 0; i < actors.length; i++) {
    var actorName = actors[i].name;
    actorsList += `<option value="${actorName}">${actorName}</option>`;
  }

  let pack = game.packs.get(compendiumName);
  let macro = ( await pack.getDocuments() ).find(i => (i.data.name==macroName) );
  await macro.execute();    
  
  new Dialog({
    title: `Summon - ${version}`,
    content: `
    <h2>Actor</h2>
    <p>
      <select id="actorsID" type="text" style="width: 100%; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
        ${actorsList}
      </select>      
    </p>
    <br>
    <h2>Animation</h2>
    <p>
      <select id="animationID" type="text" style="width: 100%; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
        
      </select>      
    </p>
    <br>    
    <h2>Folder Path</h2>
    <p>
      <input type="text" id="folderName" value='Summons'/>
    </p>
    <br>
  `,
    buttons: {
      roll: {
        label: "Create",
        callback: (html) => {
          summon(html);
        }
      }, 
      cancel: {
        label: "Cancel"
      }
    }
  }).render(true)
}

async function summon() {
  let spirit = await warpgate.spawn(summonName, { token: {"alpha": 0 }});

  const spiritToken = canvas.tokens.get(spirit[0]);

  new Sequence()
    .effect("modules/jb2a_patreon/Library/Generic/Impact/Impact_11_Regular_Green_400x400.webm")
      .atLocation(spiritToken)
      .scale(0.5)
    .wait(100)
    .animation()
      .on(spiritToken)
      .opacity(1.0)
    .play()

}

async function macroRun(macroName, val,  compendiumName='world.animations') {  
  let pack = game.packs.get(compendiumName);
  let macro = ( await pack.getDocuments() ).find(i => (i.data.name==macroName) );
  await macro.setFlag("world", "dynamicSummonAnimation1", val);
  await macro.execute();    
}

async function getMacroFrag(macroName, val,  compendiumName='world.animations') {  
  let pack = game.packs.get(compendiumName);
  let macro = ( await pack.getDocuments() ).find(i => (i.data.name==macroName) );
  const output = await macro.getFlag("world", "dynamicSummonAnimation1");
  return output;
}
