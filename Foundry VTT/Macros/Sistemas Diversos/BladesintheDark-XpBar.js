const version = '1.0';

/*
source:
icon: icons/sundries/misc/lock-open-yellow.webp
*/

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.warn("You must select a token!");    
} else {
  main();
}

async function main() {
  let attribute = ['Insight', 'Prowess', 'Resolve', 'Class'];

  let attributeList = ``;
  attribute.map((t) => {
    attributeList += `<option value="${t}">${t}</option>`;
  });
  
  new Dialog({
    title: `XP Bar - Manager - v${version}`,
    content: `
    <h2>XP Bar Size</h2>
    <p>      
      <input type="number" min=-5 max=+5 id="xpBarSize" value="1"/>
    </p><br>
    <h2>Choose the Experience Bar</h2>
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
  const xpBarSize = parseInt( html.find("#xpBarSize")[0].value );  
  let attribute = html.find("#attribute")[0].value;  
 
  let tokenD = canvas.tokens.controlled[0].actor;
  
  //attribute=''
  if (attribute=='Insight') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.attributes.insight.expMax": xpBarSize}]);
  } else if (attribute=='Prowess') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.attributes.prowess.expMax": xpBarSize}]);
  } else if (attribute=='Resolve') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.attributes.resolve.expMax": xpBarSize}]);
  } else if (attribute=='Class') {
    let updated = await Actor.updateDocuments([{_id: tokenD.id, "data.experienceMax": xpBarSize}]);
  }

}
