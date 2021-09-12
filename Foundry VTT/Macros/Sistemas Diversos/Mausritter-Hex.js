//Generate Hex



const compendium_label = 'Tables';

(async () => {

    let hexTypeList = ['Random', 'Countryside', 'Forest', 'River', 'Human Town'];
    let selectList = "";

    hexTypeList.forEach(option => selectList += "<option value='" + option + "'>" + option + "</option>")

    let d = new Dialog({
        title: "Select Type",
        content: "<h2> Select or Roll Hex Type </h2> <select style='margin-bottom:10px;'name='stat' id='stat'> " + selectList + "</select> <br/>",
        buttons: {
            roll: {
                icon: '<i class="fas fa-check"></i>',
                label: "Roll",
                callback: (html) => hexType(html.find('[id=\"stat\"]')[0].value)
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

async function hexType(hexType) {
  let hexContents = "";
  let hexDetails = "";
  let buffer ='';
  let randomHex = ['Countryside', 'Forest', 'River', 'Human Town'];
  
  if(hexType == "Random"){
    const randomElement = 
    hexType = randomHex[Math.floor(Math.random() * randomHex.length)];
  }

  buffer = await drawFromTable("Hex - " + hexType);
  buffer = await buffer.roll(); 
  hexContents = buffer.results[0].data.text;

  buffer = await drawFromTable("Hex - Landmark Details");
  buffer = await buffer.roll(); 
  hexDetails = buffer.results[0].data.text;


  let message = "\
  <h2> "+hexType+": </h2>\
  <b> Landmark: </b>"+hexContents+"</br>\
  <b> Details: </b><i>"+hexDetails+"</i></br>";

  let chatData = {
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  

  ChatMessage.create(chatData);

}

/* Functions */
async function drawFromTable(tableName) {
  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label==compendium_label )[0].getDocuments();      
  let table = await inside.filter( p=>p.data['name']==tableName )[0];
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  return await table;
}
