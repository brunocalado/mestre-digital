const macroVersion = 'v0.2';
/*
Features
- 

source: 
icon:
*/

const originList = ['Arabic', 'Chinese', 'English', 'Greek', 'Indian', 'Japanese', 'Latin', 'Nigerian', 'Russian', 'Spanish' ].sort();

main();

function main() {
  const places =  ['Random'].concat(originList);
  let placesList = ``;
  const gender = ['Random', 'Female', 'Male'];
  let genderList = ``;
  const surname = places;  
  let surnameList = ``;
  let nameType = places;  
  let nameTypeList = ``;
  places.map((el) => {      
    if (el==='Random') {
      placesList += `<option value="${el}" selected>${el}</option>`;
    } else {
      placesList += `<option value="${el}">${el}</option>`;      
    }    
  });  
  nameType.map((el) => {      
    if (el==='Random') {
      nameTypeList += `<option value="${el}" selected>${el}</option>`;
    } else {
      nameTypeList += `<option value="${el}">${el}</option>`;      
    }    
  });    
  surname.map((el) => {      
    if (el==='Random') {
      surnameList += `<option value="${el}" selected>${el}</option>`;
    } else {
      surnameList += `<option value="${el}">${el}</option>`;      
    }    
  });  
  gender.map((el) => {      
    if (el==='Random') {
      genderList += `<option value="${el}" selected>${el}</option>`;
    } else {
      genderList += `<option value="${el}">${el}</option>`;      
    }    
  });
  const npcTypes = ['NPC and Patron', 'NPC', 'Patron'];
  let npcTypeList = ``;
  npcTypes.map((el) => {      
    if (el==='Random') {
      npcTypeList += `<option value="${el}" selected>${el}</option>`;
    } else {
      npcTypeList += `<option value="${el}">${el}</option>`;      
    }    
  });  
  let template = `
  <h2>Name</h2>
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center">
        <b>Source:</b> <select id="nameTypeHTMLid" style="width: 120px">${nameTypeList}</select>
      </td>
      <td style="text-align:center; vertical-align:center">
        <b>Gender:</b> <select id="genderHTMLid" style="width: 120px">${genderList}</select>
      </td>
    </tr>
    <tr>
      <td style="text-align:center; vertical-align:center">
        <b>Surname:</b> <select id="surnameHTMLid" style="width: 120px">${surnameList}</select>
      </td>
      <td style="text-align:center; vertical-align:center">
        <b>Place:</b> <select id="placesHTMLid" style="width: 120px">${placesList}</select>
      </td>
    </tr>    
  </table> 
<h2>NPC</h2>
<p> <b>Type:</b> <select id="npcTypeHTMLid" style="width: 180px; align:center">${npcTypeList}</select> </p>  

<h2>Options</h2>
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="create_actor" checked/>Create Actor? WIP</td>
    </tr>
  </table>  
`;

  new Dialog({
    title: `NPC Builder - ${macroVersion}`,
    content: template,
    buttons: {
      ok: {
        label: "Create",        
        callback: async (html) => {
          applyFormOptions(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function applyFormOptions(html) {  
  let nameType = html.find('#nameTypeHTMLid')[0].value;
  let gender = html.find('#genderHTMLid')[0].value;
  let surname = html.find('#surnameHTMLid')[0].value;
  let places = html.find('#placesHTMLid')[0].value;  
  let npcType = html.find('#npcTypeHTMLid')[0].value;    
  let npcOutput;
  
  let nameOutput = await nameGenerator(nameType, surname, gender, places);  
  if (npcType=='NPC') {
    npcOutput = [await npcCreator()];
  } else if (npcType=='Patron') {
    npcOutput = [await patronCreator()];
  } else {
    npcOutput = [await npcCreator(), await patronCreator()];
  } 
  
  chatOutput(nameOutput, npcOutput);
}

function chatOutput (nameData, profileData) {
  let message = `<h2>${nameData['name']} ${nameData['surname']}</h2>`;    
  message+=`<p><b>Place</b>: ${nameData['place']}</p>`;
  
  if (profileData.length==1) {
    if ( profileData[0]['type']=='NPC' ) {
      message+=`<h3>Personality</h3>`;    
      message+=`<p><b>Background</b>: ${profileData[0]['background']}</p>`;
      message+=`<p><b>Role</b>: ${profileData[0]['role']}</p>`;
      message+=`<p><b>Problem</b>: ${profileData[0]['problem']}</p>`;
      message+=`<p><b>Age</b>: ${profileData[0]['age']}</p>`;
      message+=`<p><b>Desire</b>: ${profileData[0]['desire']}</p>`;
      message+=`<p><b>Trait</b>: ${profileData[0]['trait']}</p>`;      
    }
    if ( profileData[0]['type']=='Patron' ) {
      message+=`<h3>Patronage</h3>`;    
      message+=`<p><b>Trustworthiness</b>: ${profileData[0]['trustworthiness']}</p>`;
      message+=`<p><b>Challenge of the Job</b>: ${profileData[0]['challenge']}</p>`;
      message+=`<p><b>Main Countervailing Force</b>: ${profileData[0]['countervailingForce']}</p>`;
      message+=`<p><b>Eagerness to Hire</b>: ${profileData[0]['eagerness']}</p>`;
      message+=`<p><b>Potential Non-Cash Rewards</b>: ${profileData[0]['nonCashRewards']}</p>`;
      message+=`<p><b>Complication</b>: ${profileData[0]['complication']}</p>`;      
    }
  } else {
      message+=`<h3>Personality</h3>`;    
      message+=`<p><b>Background</b>: ${profileData[0]['background']}</p>`;
      message+=`<p><b>Role</b>: ${profileData[0]['role']}</p>`;
      message+=`<p><b>Problem</b>: ${profileData[0]['problem']}</p>`;
      message+=`<p><b>Age</b>: ${profileData[0]['age']}</p>`;
      message+=`<p><b>Desire</b>: ${profileData[0]['desire']}</p>`;
      message+=`<p><b>Trait</b>: ${profileData[0]['trait']}</p>`;          
      
      message+=`<h3>Patronage</h3>`;    
      message+=`<p><b>Trustworthiness</b>: ${profileData[1]['trustworthiness']}</p>`;
      message+=`<p><b>Challenge of the Job</b>: ${profileData[1]['challenge']}</p>`;
      message+=`<p><b>Main Countervailing Force</b>: ${profileData[1]['countervailingForce']}</p>`;
      message+=`<p><b>Eagerness to Hire</b>: ${profileData[1]['eagerness']}</p>`;
      message+=`<p><b>Potential Non-Cash Rewards</b>: ${profileData[1]['nonCashRewards']}</p>`;
      message+=`<p><b>Complication</b>: ${profileData[1]['complication']}</p>`; 
  }

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: message
  };
  ChatMessage.create(chatData, {});
}

async function npcCreator() { 
  // table names
  const npcBackground  = 'One-Roll NPCs - Their Background';
  const npcRole        = 'One-Roll NPCs - Their Role in Society';
  const npcProblem     = 'One-Roll NPCs - Their Biggest Problem';
  const npcAge         = 'One-Roll NPCs - Age';
  const npcDesire      = 'One-Roll NPCs - Their Greatest Desire';
  const npcTrait       = 'One-Roll NPCs - Most Obvious Character Trait';
  
  let npcBackgroundOut   = await game.tables.getName(npcBackground).roll().results[0].text;
  let npcRoleOut         = await game.tables.getName(npcRole).roll().results[0].text;
  let npcProblemOut      = await game.tables.getName(npcProblem).roll().results[0].text;
  let npcAgeOut          = await game.tables.getName(npcAge).roll().results[0].text;
  let npcDesireOut       = await game.tables.getName(npcDesire).roll().results[0].text;
  let npcTraitOut        = await game.tables.getName(npcTrait).roll().results[0].text;

  return {'background': npcBackgroundOut, 'role': npcRoleOut, 'problem': npcProblemOut, 'age': npcAgeOut, 'desire': npcDesireOut, 'trait':npcTraitOut, 'type': 'NPC'};
}

async function patronCreator() { 
  // table names
  const trustworthiness     = 'One-Roll Patrons - Patron Trustworthiness';
  const challenge           = 'One-Roll Patrons - Basic Challenge of the Job';
  const countervailingForce = 'One-Roll Patrons - Main Countervailing Force';
  const eagerness           = 'One-Roll Patrons - Patron Eagerness to Hire';
  const nonCashRewards      = 'One-Roll Patrons - Potential Non-Cash Rewards';
  const complication        = 'One-Roll Patrons - Complication to the Job';
  
  let trustworthinessOut      = await game.tables.getName(trustworthiness).roll().results[0].text;
  let challengeOut            = await game.tables.getName(challenge).roll().results[0].text;
  let countervailingForceOut  = await game.tables.getName(countervailingForce).roll().results[0].text;
  let eagernessOut            = await game.tables.getName(eagerness).roll().results[0].text;
  let nonCashRewardsOut       = await game.tables.getName(nonCashRewards).roll().results[0].text;
  let complicationOut         = await game.tables.getName(complication).roll().results[0].text;

  return {'trustworthiness': trustworthinessOut, 'challenge': challengeOut, 'countervailingForce': countervailingForceOut, 'eagerness': eagernessOut, 'nonCashRewards': nonCashRewardsOut, 'complication':complicationOut, 'type': 'Patron'};
}

async function nameGenerator(nameTypePar, surnameTypePar, genderTypePar, placeTypePar) {
  // definitions  
  let data = {
    'arabic': {'female': 'Name Generator - Arabic Female', 'male': 'Name Generator - Arabic Male', 'surname': 'Name Generator - Arabic Surname', 'place': 'Name Generator - Arabic Place'},
    'chinese': {'female': 'Name Generator - Chinese Female', 'male': 'Name Generator - Chinese Male', 'surname': 'Name Generator - Chinese Surname', 'place': 'Name Generator - Chinese Place'},
    
    'english': {'female': 'Name Generator - English Female', 'male': 'Name Generator - English Male', 'surname': 'Name Generator - English Surname', 'place': 'Name Generator - English Place'},
    'greek': {'female': 'Name Generator - Greek Female', 'male': 'Name Generator - Greek Male', 'surname': 'Name Generator - Greek Surname', 'place': 'Name Generator - Greek Place'},
    'indian': {'female': 'Name Generator - Indian Female', 'male': 'Name Generator - Indian Male', 'surname': 'Name Generator - Indian Surname', 'place': 'Name Generator - Indian Place'},
    'Japanese': {'female': 'Name Generator - Japanese Female', 'male': 'Name Generator - Japanese Male', 'surname': 'Name Generator - Japanese Surname', 'place': 'Name Generator - Japanese Place'},
    'Latin': {'female': 'Name Generator - Latin Female', 'male': 'Name Generator - Latin Male', 'surname': 'Name Generator - Latin Surname', 'place': 'Name Generator - Latin Place'},
    'Nigerian': {'female': 'Name Generator - Nigerian Female', 'male': 'Name Generator - Nigerian Male', 'surname': 'Name Generator - Nigerian Surname', 'place': 'Name Generator - Nigerian Place'},
    'Russian': {'female': 'Name Generator - Russian Female', 'male': 'Name Generator - Russian Male', 'surname': 'Name Generator - Russian Surname', 'place': 'Name Generator - Russian Place'},
    'Spanish': {'female': 'Name Generator - Spanish Female', 'male': 'Name Generator - Spanish Male', 'surname': 'Name Generator - Spanish Surname', 'place': 'Name Generator - Spanish Place'}
  };
  
  // vars
  let name;  
  let place;
  let surname;  
  let nameType = nameTypePar;
  let surnameType = surnameTypePar;
  let genderType = genderTypePar;
  let placeType = placeTypePar;  
  
  if ( nameTypePar=='Random' && surnameTypePar=='Random' && placeTypePar=='Random' ) {
    nameType      = randomSelectSource(nameTypePar);    
    surnameType   = nameType;
    placeType     = nameType;
  } else if ( nameTypePar=='Random' || surnameTypePar=='Random' || placeTypePar=='Random' ) {
    if ( nameTypePar=='Random' ) {
      nameType      = randomSelectSource(nameTypePar);    
    }
    if ( surnameTypePar=='Random' ) {    
      surnameType   = randomSelectSource(surnameTypePar);
    }
    if ( placeTypePar=='Random' ) {      
      placeType     = randomSelectSource(placeTypePar);    
    }
  }
  genderType      = randomSelectSource(genderTypePar, 'Gender');
  
  name = data[nameType.toLowerCase()][genderType.toLowerCase()];
  surname = data[surnameType.toLowerCase()]['surname'];
  place = data[placeType.toLowerCase()]['place'];
  
  //out
  let nameOut     = await game.tables.getName(name).roll().results[0].text;  
  let surnameOut  = await game.tables.getName(surname).roll().results[0].text;
  let placeOut    = await game.tables.getName(place).roll().results[0].text;
  
  return { 'name': nameOut, 'surname': surnameOut, 'place': placeOut };
}

function randomSelectSource(val, type) {
  if (type=='Gender') {
    if (val='Random') {
      return ['female', 'male'][ Math.floor(Math.random() * 2) ];    
    } else {
      return val;
    }
  } else {
    if (val='Random') {
      return originList[ Math.floor(Math.random() * originList.length) ];    
    } else {
      return val;
    }
  }
}
