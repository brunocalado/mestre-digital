const version = '1.1';

/*
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Forged%20in%20the%20Dark/BladesintheDark-XpBar.js
icon: icons/sundries/misc/lock-open-yellow.webp
*/

let tokenD;

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.warn("You must select a token!");    
} else {
  tokenD = canvas.tokens.controlled[0].actor;
  main();
}

async function main() {
  let attribute = [];
  if(tokenD.type === 'character'){
    attribute = Object.keys( game.system.model.Actor.character.attributes );
    attribute.push("class");
    attribute.push("stress");
  } else if(tokenD.type === 'ship'){
    attribute = ["crew"];
  }

  let attributeList = ``;
  attribute.map((t) => {
    attributeList += `<option value="${t}">${t}</option>`;
  });
  
  new Dialog({
    title: `XP/Stress Bar - Manager - v${version}`,
    content: `
    <h2>Bar Size</h2>
    <p>This will be the new max size.      
    </p>
    <p>      
      <input type="number" min=1 max=12 id="xpBarSize" value="6"/>
    </p><br>
    <h2>Choose Bar</h2>
    <p>    
      <select id="attribute" type="text" style="width: 100px;">
        ${attributeList}
      </select>  
    </p>    
    `,
    buttons: {
      roll: {
        label: "Change",
        callback: (html) => {
          changeActorSheetBar(html);
        }
      }, 
      cancel: {
        label: "Cancel"
      }
    }
  }).render(true)
}

async function changeActorSheetBar(html) {
  const xpBarSize = parseInt( html.find("#xpBarSize")[0].value );  
  let attribute = html.find("#attribute")[0].value;  
   
  console.log('--------------');
  console.log(xpBarSize);
  console.log(attribute);
  console.log('--------------');
  
  //attribute=''
  if (attribute==='class') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.experienceMax": xpBarSize}]);
  } else if (attribute==='crew') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.crew_experienceMax": xpBarSize}]);
  } else if (attribute==='stress') { // Stress   
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.stress.max_default": xpBarSize}]);
  } else {
    let key = "data.attributes." + attribute + ".expMax"; 
    let updated = await Actor.updateDocuments([{_id: tokenD.id, [key]: xpBarSize}]);
  }
}

