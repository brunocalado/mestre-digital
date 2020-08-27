/* Dice Calculator for Our Last Best Hope v1.0
Features: Role Abilities, harm, threat level, fear, touchstone, asset, support. White and Black 6 account.
*/

getRequirements();

function getRequirements() {
  //How Many Cards to Draw
  let template = `  
  <h3>THREAT LEVEL</h3>
  <p>
    How many dice does the threat have?
  </p>
  <p>
    <input type="radio" id="threat_lv1" name="threat" value="1">
    <label for="threat_lv1">1</label>
    <input type="radio" id="threat_lv2" name="threat" value="2">
    <label for="threat_lv1">2</label>
    <input type="radio" id="threat_lv3" name="threat" value="3" checked="checked>
    <label for="threat_lv1">3</label>
    <input type="radio" id="threat_lv4" name="threat" value="4">
    <label for="threat_lv1">4</label>
    <input type="radio" id="threat_lv5" name="threat" value="5">
    <label for="threat_lv1">5</label>
    <input type="radio" id="threat_lv6" name="threat" value="6">
    <label for="threat_lv1">6</label>
  </p>
  <br />
  <h3>WOUNDS</h3>
  <p>
    How many wounds do you have?
  </p>
  <p>
    <input type="radio" id="wounds_0" name="wounds" value="0" checked="checked>
    <label for="wounds_0">0</label>
    <input type="radio" id="wounds_0" name="wounds" value="1">
    <label for="wounds_1">1</label>
    <input type="radio" id="wounds_0" name="wounds" value="2">
    <label for="wounds_2">2</label>
    <input type="radio" id="wounds_0" name="wounds" value="3">
    <label for="wounds_3">3</label>
    <input type="radio" id="wounds_0" name="wounds" value="4">
    <label for="wounds_4">4</label>
  </p>
  </br>
  <h3>SUPPORT</h3>
  <p>
    How many people are helping you?
  </p>
  <p>    
    <input type="radio" id="support_0" name="support" value="0">
    <label for="support_0">0</label>
    <input type="radio" id="support_1" name="support" value="1" checked="checked>
    <label for="support_1">1</label>
    <input type="radio" id="support_2" name="support" value="2">
    <label for="support_2">2</label>
    <input type="radio" id="support_3" name="support" value="3">
    <label for="support_3">3</label>
    <input type="radio" id="support_4" name="support" value="4">
    <label for="support_4">4</label>
    <input type="radio" id="support_5" name="support" value="5">
    <label for="support_5">5</label>    
  </p>
  <br />
  <h3>ROLE ABILITIES</h3>
  <p>
  (ability costs 1 Story Point for the player using it)
  </p>
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="role_scientist" checked/>Scientist?</td>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="role_soldier" checked/>
      Soldier?</td>    
    </tr>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="role_engineer" checked/>
      Engineer?</td>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="role_doctor"/>
      Doctor?</td>    
    </tr>
  </table>  
  </p>
  <br />
  <h3>EXTRA</h3>    
  <table>
    <tr>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="fear"/>Fear</td>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="touchstone"/>Touchstone</td>
      <td style="text-align:center; vertical-align:center"><input type="checkbox" id="asset"/>Asset</td>
    </tr>
  <table> 
 <br />
  `;
  new Dialog({
    title: "Roll for Humanity",
    content: template,
    buttons: {
      ok: {
        label: "Roll",
        callback: async (html) => {
          rollDice(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function rollDice(html) {  
  let msg = '';  
  let whitedice;
  let blackdice;
  let numberwhitedice = 1;
  let numberblackdice;
  let rolledWhiteSix;
  let rolledBlackSix;
  
  let threat = parseInt(html.find('input[name="threat"]:checked').val());
  let wounds = parseInt(html.find('input[name="wounds"]:checked').val());
  let support = parseInt(html.find('input[name="support"]:checked').val());

  let role_scientist = html.find("#role_scientist")[0].checked;
  let role_soldier = html.find("#role_soldier")[0].checked;
  let role_engineer = html.find("#role_engineer")[0].checked;
  let role_doctor = html.find("#role_doctor")[0].checked;

  let fear = html.find("#fear")[0].checked;
  let touchstone = html.find("#touchstone")[0].checked;
  let asset = html.find("#asset")[0].checked;
  
  //
  numberblackdice = threat;  
  numberwhitedice = numberwhitedice + support;
  
  //threat
  msg += `<h1>||| Threat (${threat}) |||</h1>`;
  msg += `<p>Support: ${support}</p>`;
  
  if (role_scientist || role_soldier || role_engineer || role_doctor) {
    let tmp = [];
    msg += `<h3>Role Ability</h3>`;
    if(role_scientist) {
      tmp.push('Scientist');      
      numberblackdice -= 1;
    }    
    if(role_soldier) {
      tmp.push('Soldier');
      numberwhitedice +=1;
    }    
    if(role_engineer) {
      tmp.push('Engineer');
      numberwhitedice +=1;
    }    
    if(role_doctor) {
      tmp.push('Doctor');
      wounds = 0;
    }
    msg += `<p>${tmp.join(', ')}</p>`;
  }
  
  if (fear || touchstone || asset) {
    let tmp = [];
    msg += `<h3>Extra</h3>`;
    if(fear) {
      tmp.push('Fear');      
      numberblackdice += 1;
    }    
    if(touchstone) {
      tmp.push('Touchstone');      
      numberwhitedice +=1;
    }    
    if(asset) {
      tmp.push('Asset');      
      numberwhitedice +=1;
    }
    msg += `<p>${tmp.join(', ')}</p>`;    
  }  
  
  ChatMessage.create({content: msg});    
  
  msg = `<h2>White Dice</h2>`;
  whitedice = new Roll(numberwhitedice + 'd6-' + wounds).roll();
  rolledWhiteSix = countSix(whitedice);
  whitedice.toMessage({flavor: msg});
  
  msg = `<h2>Black Dice</h2>`;
  blackdice = new Roll(numberblackdice + 'd6').roll();
  rolledBlackSix = countSix(blackdice);
  blackdice.toMessage({flavor: msg});  
  
  msg = `<h3>Result</h3>`;
  msg += `<p>White (${whitedice.total}) - Black (${blackdice.total}) = ${whitedice.total-blackdice.total}</p>`;
  if( rolledWhiteSix>0 && rolledBlackSix==0 ) {
    msg += `<p>You got a White 6. You can buy it for 3 Story Points. Removing the white die will result in: ${whitedice.total-6-blackdice.total}</p>`;
  }
  if( rolledBlackSix>0 && rolledWhiteSix==0 ) {
    msg += `<p>You got a Black 6. Removing the black die will result in: ${whitedice.total-(blackdice.total-6)}</p>`;
  }
  if( rolledBlackSix>0 && rolledWhiteSix>0 ) {
    msg += `<p>You got a White 6. You can buy it for 3 Story Points. Removing the white and black dice will result in: ${(whitedice.total-6)-(blackdice.total-6)}</p>`;
    msg += `<p>You got a Black 6. Removing the black die will result in: ${whitedice.total-(blackdice.total-6)}</p>`;
  }
  ChatMessage.create({content: msg});
}

function countSix(dicePool) {
  b = dicePool;
  let count = 0;
  let size = b.dice[0].rolls.length;
  for (var i = 0; i < size; i++) {
    if( b.dice[0].rolls[i].roll==6 ) {
      count+=1;
    }
  }
  return count;
}

/*
  b = new Roll('4d6').roll();
  
  b = new Roll('4d6').roll().dice[0].rolls[0].roll;
  
  b = new Roll('4d6').roll();
  let size = b.dice[0].rolls.length;
  for (var i = 0; i < size; i++) {
    console.log(b.dice[0].rolls[i].roll);
  }  
*/