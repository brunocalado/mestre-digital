//Generate Hex

/*
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/Mausritter-Weather.js
*/

const version = '1.0';
const compendium_label = 'Tables';

(async () => {

    // const summer = await drawFromTable('Weather Summer');
    // const autumn = await drawFromTable('Weather Autumn');
    // const winter = await drawFromTable('Weather Winter');
    // const spring = await drawFromTable('Weather Spring');
    
    let seasonList = ['Summer', 'Autumn', 'Winter', 'Spring'];
    let selectList = "";

    seasonList.forEach(option => selectList += "<option value='" + option + "'>" + option + "</option>")

    let d = new Dialog({
        title: "Select Season",
        content: "<h2> Season </h2> <select style='margin-bottom:10px;'name='stat' id='stat'> " + selectList + "</select> <br/>",
        buttons: {
            roll: {
                icon: '<i class="fas fa-check"></i>',
                label: "Roll",
                callback: (html) => drawFromTable('Weather '+html.find('[id=\"stat\"]')[0].value)
            },
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => { }
            }
        },
        default: "roll",
        close: () => { }
    });
    d.render(true);

})()

/* Functions */
async function drawFromTable(tableName) {
  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label==compendium_label)[0].getDocuments();      
  let table = await inside.filter( p=>p.data['name']==tableName )[0];
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  
  let weather = await table.roll(); 
  weather = weather.results[0].data.text;  
  let message = "<h2> Today's Weather: </h2><b style='font-size:120%;'>"+weather+"</br>";
  
  let chatData = {
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  

  ChatMessage.create(chatData);  
}