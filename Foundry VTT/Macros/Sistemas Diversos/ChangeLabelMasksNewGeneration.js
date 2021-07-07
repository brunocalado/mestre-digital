const version = 'v1.0';
const chatimage = "icons/commodities/treasure/mask-jeweled-gold.webp";

/* Label Changer
IMPORTANT
- 

TODO
- 
source: 
icon: 
*/


// Requires at least 1 target
let tokenD;

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.error("You must select a token!");    
} else {
  tokenD=canvas.tokens.controlled[0];
  main();
}

function getStats(labelType) {
  switch (labelType) {
    case 'danger': return [tokenD.actor.data.data.stats.danger.label, token.actor.data.data.stats.danger.value];
    case 'freak': return [tokenD.actor.data.data.stats.freak.label, token.actor.data.data.stats.freak.value];
    case 'savior': return [tokenD.actor.data.data.stats.savior.label, token.actor.data.data.stats.savior.value];
    case 'superior': return [tokenD.actor.data.data.stats.superior.label, token.actor.data.data.stats.superior.value];
    case 'mundane': return [tokenD.actor.data.data.stats.mundane.label, token.actor.data.data.stats.mundane.value];
    default: ui.notifications.error("666!");    
  }  
}

function main() {  
  let labelList = ``;
  labelList += `<option value="danger">Danger</option>`;
  labelList += `<option value="freak">Freak</option>`;
  labelList += `<option value="savior">Savior</option>`;
  labelList += `<option value="superior">Superior</option>`;
  labelList += `<option value="mundane">Mundane</option>`;  

  let currentLabelList = ``;
  currentLabelList += `<li>Danger: ${getStats('danger')[1]}</li>`;  
  currentLabelList += `<li>Freak: ${getStats('freak')[1]}</li>`;
  currentLabelList += `<li>Savior: ${getStats('savior')[1]}</li>`;
  currentLabelList += `<li>Superior: ${getStats('superior')[1]}</li>`;
  currentLabelList += `<li>Mundane: ${getStats('mundane')[1]}</li>`;  
  
  let template = `  
    <style type="text/css">
      div.purpleHorizon {
        border: 4px solid #ff0000;
        background-color: #000000;
        width: 100%;
        text-align: center;
        border-collapse: collapse;
      }
      .divTable.purpleHorizon .divTableCell, .divTable.purpleHorizon .divTableHead {
        border: 0px solid #550000;
        padding: 5px 2px;
      }
      .divTable.purpleHorizon .divTableBody .divTableCell {
        font-size: 13px;
        font-weight: bold;
        color: #FFFFFF;
      }
      
      .divTable{ display: table; }
      .divTableRow { display: table-row; }
      .divTableHeading { display: table-header-group;}
      .divTableCell, .divTableHead { display: table-cell;}
      .divTableHeading { display: table-header-group;}
      .divTableFoot { display: table-footer-group;}
      .divTableBody { display: table-row-group;}

      /* HIDE RADIO */
      [type=radio] { 
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      }

      /* IMAGE STYLES */
      [type=radio] + img {
      cursor: pointer;
      }

      /* CHECKED STYLES */
      [type=radio]:checked + img {
      outline: 4px solid #f00;
      }
      
      .container {
        position: relative;
        text-align: center;
        color: white;
      }
      /* Centered text */
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
      }    

      #kultcss .window-content {    
        background: #000000;
      }     
      #kultcss .dialog-button {
        height: 40px;
        background: #000000;
        color: #ffffff;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        border: none;    
      }  
      #kultcss header {
        background: #000000;
        border-radius: 0;    
        border: none;    
        margin-bottom: 2px;
        font-size: .75rem;
      }
    </style>    
    
    <h2 style="color: #FFFFFF;">Current Labels</h2>
    <ul style="color: #FFFFFF;">
      ${currentLabelList}
    </ul>
    
    <h2 style="color: #FFFFFF;">Set up the change</h2>
    <div class="divTable purpleHorizon">
    <div class="divTableBody">
        
    <div class="divTableRow">
    <div class="divTableCell">
        <p>Which label will go up?</p>
        <select id="labelup" type="text" style="width: 100px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
          ${labelList}
        </select>      
    </div>
    <div class="divTableCell">
        <p>Which label will go down?</p>
        <select id="labeldown" type="text" style="width: 100px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;">
          ${labelList}
        </select>      
    </div>     
    </div>
   
    </div>
    </div>
    
  `;
  
  new Dialog({
    title: `Label Changer - ${version}`,
    content: template,
    buttons: {
      ok: {
        label: "Change!",
        callback: async (html) => {
          changeLabel(html);
        },
      },
      cancel: {
        label: "Cancel",
      }
    },
    default: "ok"
  }, { id: 'kultcss'}).render(true);
}

async function changeLabel(html) {
  const labelup = html.find("#labelup")[0].value;    
  const labeldown = html.find("#labeldown")[0].value;    
  let message=``;
  
  message += `<h2>Label Changer</h2>`;  

  if ( (getStats(labelup)[1]+1)>3 || (getStats(labeldown)[1]-1)>3 ) {
    message += `<p>No shift at all occurs. Instead, you mark a <b style="color:blue">condition</b>!.</p>`;
  } else {
    message += `<p><b style="color:darkred">${labelup}</b> will go up and  <b style="color:red">${labeldown}</b> will go down.</p>`;
    await updateLabel(labelup, 1);
    await updateLabel(labeldown, -1);
  }

  // send message1
  let chatData = {
    content: message
  };  
  ChatMessage.create(chatData, {});  
}

async function updateLabel(labelName, val) { // +1 or -1
  let character = game.actors.contents.filter((t) => t.data.type === "character").filter((v) => v.id === tokenD.actor.id)[0];

  let currentLabelValue = getStats(labelName)[1];
  let newValue = val + currentLabelValue;
  
  console.log(labelName);
  
  switch (labelName) {
    case 'danger': await character.update({['data.stats.danger.value']: newValue}); break;
    case 'freak': await character.update({['data.stats.freak.value']: newValue}); break;
    case 'savior': await character.update({['data.stats.savior.value']: newValue}); break;
    case 'superior': await character.update({['data.stats.superior.value']: newValue}); break;
    case 'mundane': await character.update({['data.stats.mundane.value']: newValue}); break;
    default: ui.notifications.error("666!");    
  }  
  
}
