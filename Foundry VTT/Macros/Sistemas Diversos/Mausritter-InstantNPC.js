/* Instant NPC - v0.1

Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/Mausritter-InstantNPC.js
Icon: systems/mausritter/images/sample/Portrait_Rat.png
*/
//test stuff: console.log(canvas.tokens.controlled[0].actor);

const compendium_label = 'Tables';

(async () => {
  const Appearance = await drawFromTable('Non-player mice - Appearance');
  const Birthsign = await drawFromTable('Non-player mice - Birthsign and Disposition');
  const Quirk = await drawFromTable('Non-player mice - Quirk');
  const Social = await drawFromTable('Non-player mice - Social position and Payment for service');
  const Wants = await drawFromTable('Non-player mice - Wants');
  const Relationship = await drawFromTable('Non-player mice - Relationship');
  
  const Birthname = await drawFromTable('Mousy Names - Birthname');  
  const Matriname = await drawFromTable('Mousy Names - Matriname');
  
  const dexterity = attrRoll();
  const strength = attrRoll();
  const will = attrRoll();
  const health = healthRoll();
  
  let msg = '';
  msg += `<p><b>Social position and Payment for service: ${Social}</b></p>`;  
  msg += `<p><b>Appearance:</b> ${Appearance}</p>`;  
  msg += `<p><b>Quirk:</b> ${Quirk}</p>`;  
  msg += `<p><b>Wants:</b> ${Wants}</p>`;  
  msg += `<p><b>Relationship:</b> ${Relationship}</p>`;  
  
  //let npchp = randomHP(4,10);
  let instantNPC = await Actor.create({
    name: Birthname + " " + Matriname,
    type: "hireling",
    img: "",    
    sort: 12000,
    data: {},
    token: {},
    items: [],
    flags: {},
    data: {
      description: {
        disposition: Birthsign
      },   
      notes: msg,
      stats: {
        dexterity: {          
          max: dexterity,
          value: dexterity
        },
        strength: {          
          max: strength,
          value: strength
        },
        will: {          
          max: will,
          value: will
        }        
      },
      health: {
        max: health,
        value: health
      }        
    }
  });

  await instantNPC.sheet.render(true);
  
})()

/* Functions */
async function drawFromTable(tableName) {
  let list_compendium = await game.packs.filter(p=>p.entity=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label==compendium_label)[0].getContent();      
  const table = await inside.filter( p=>p._data['name']==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  return await table.roll().results[0].text;  
}

function treasureCoins(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;  
}

function attrRoll() {
  return new Roll('3d6kh2').roll().total;
}

function healthRoll() {
  return new Roll('1d6').roll().total;
}

function randomHP(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;  
}