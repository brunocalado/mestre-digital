const macroVersion = 'v0.1';
/* Token Magic GUI
Features
- 
Source: 
Icon: 
*/
//

if (canvas.tokens.controlled == 0) {
    ui.notifications.warn("Select a token!");
    //return;
}

// new selection code as seen in Blackmarrows for selecting a token or target
/*
var t = "";
if (game.user.targets.size == 0) {
    t = token;
} else {
    //Select targets
    t = game.user.targets.values().next().value;
}
*/
main();

function main() {

  let template =
      `<style>
  #pf2-template-creator header {
    border-radius: 0;
    background: linear-gradient(90deg, var(--secondary) 0%, #202b93 50%, var(--secondary) 100%);
    border: none;
    box-shadow: inset 0 0 0 1px #9f725b,inset 0 0 0 2px var(--tertiary),inset 0 0 0 3px #956d58;
    margin-bottom: 2px;
    font-size: .75rem;
  }
  #pf2-template-creator .window-content {
    border-image: url(systems/pf2e/assets/sheet/corner-box.png) 9 repeat;
    height: 600px;
  }
  #pf2-template-creator form {
    margin-bottom: 30px;
   
  }
  #pf2-template-creator .form-fields.buttons {
    justify-content: flex-start !important;
  }
  #pf2-template-creator .button {
    flex: 1 !important;
    height: 35px;
    box-shadow: inset 0 0 0 1px #1111FF,inset 0 0 0 1.5px var(--tertiary),inset 0 0 0 1px #1111FF;
    font-size: 12px;
    padding: 0;
    background: #171f69;
    color: white;
    cursor: pointer;
  }
  #pf2-template-creator .button:hover {
    box-shadow: 0 0 4px red;
  }
  #pf2-template-creator .radios input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }
  #pf2-template-creator .radios label {
    cursor: pointer;
    display: flex;
    flex: 1 !important;
    margin: 2px 1px ;
    box-shadow: inset 0 0 0 1px #1111FF,inset 0 0 0 1.5px var(--tertiary),inset 0 0 0 1px #1111FF;
    height: 35px;
    width: 100%;
    border-radius: 1px;
    font-size: 11px;
    font-family: "Signika", sans-serif;
    justify-content: left;
    align-items: center;
    background: #171f69;
    color: white;
  }
  #pf2-template-creator img{
  width: 25px;
  margin-right: 5px;
    align-items:left;
  }
  }
  #pf2-template-creator .radios label i {
    margin-right: 5px;
    color: white;
    background: #171f69;
  }
  #pf2-template-creator .radios label:hover {
    box-shadow: 0 0 8px red;
  }
  #pf2-template-creator .radios input[type="radio"]:checked + label {
    background: rgba(0, 0, 0, 0.2);
  }
  #pf2-template-creator .dialog-button {
    height: 50px;
    background: #171f69;
    color: white;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
  }
  #pf2-template-creator .notes {
    float: left;
    color: black !important;
    flex: 0 0 100% !important;
    font-size: 12px !important;
    line-height: 16px !important;
    margin: 10px 0 5px 0 !important;
    width:140px;
  position:relative;
  left:30px;
  }
  #pf2-template-creator .notes2 {
    color: black !important;
    flex: 0 0 100% !important;
    font-size: 12px !important;
    line-height: 16px !important;
    margin: 10px 0 5px 0 !important;
    display: none;
  }
  #pf2-template-creator .notes3 {
    float: left;
    color: black !important;
    flex: 0 0 100% !important;
    font-size: 12px !important;
    line-height: 16px !important;
    margin: 10px 0 5px 0 !important;
    width:140px;
  position:relative;
  left:30px;
    display: none;
  }
  #pf2-template-creator .notes.title {
    border-bottom: 1px solid #f7d488;
    font-size: 14px !important;
    font-weight: bold;
    margin: 20px 0 10px 0 !important;

  }

  </style>
  
  <form>
  <div class="form-group">
    <p class="notes title">Conditions -   Source: <span style="color: darkred">{token.name}</span> Target: <span style="color: darkred">{t.name}</span></p>
    <div class="form-fields buttons radios">
      <!------ effect 1 ------->
      <input type="radio" name="Type" id="effect001" value="Blinded" checked>
      <label for="blinded" onclick="toggleMessage4(true)"><img src="systems/pf2e/icons/conditions/blinded.png">Blinded</label>
      
      <!------ Broken -------> 
      <input type="radio" name="Type" id=broken value="Broken">
      <label for="broken" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/broken.png">Broken</label>

      <!------ confused -------> 
      <input type="radio" name="Type" id="confused" value="Confused">
      <label for="confused" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/confused.png">Confused</label>

      <!------ clumsy -------> 
      <input type="radio" name="Type" id="clumsy" value="Clumsy">
      <label for="clumsy" onclick="toggleMessage(false)"><img src="systems/pf2e/icons/conditions/clumsy.png">Clumsy</label>
      
      </div>
      <div class="form-fields buttons radios">


  </div>
  </div>

  <!------ Condition Timing Section -------> 
  <div class="form-group">
    <p class="notes title">Condition Timing: <span id="turnStartEnd">Start of Turn</span></p>

    <div class="form-fields buttons">
      <button type="button" class="button" onclick="updateRangeValue('Start of Turn')">Start of Turn</button>
      <button type="button" class="button" onclick="updateRangeValue('End of Turn')">End of Turn</button>
    </div>
  </div>


  <!------ Persistent Damage Section -------> 
  <div class="notes2" id="toggle-message3">
  <div class="form-group">

  <!------ Persistent Damage types -------> 
    <label>Persistent Damage:</label>
    <select id="damage_type" name="damage_type">

      <option value="bleeding">Bleeding</option>
      <option value="fire">Fire</option>
      <option value="acid">Acid</option>
      <option value="cold">Cold</option>
      <option value="electricity">Electricity</option>
      <option value="mental">Mental</option>
      <option value="poison">Poison</option>
    </select>
  </div>

  <div class='form-group'>
  <!------ Persistent Damage values -------> 
   <label>Damage:</label>
   <div class='form-fields'><input type="text" id="damage" value="1d4"/></div>
   </div>
  </div>



  <!------ Round Calculator & Condition Value -------> 
  <div class="notes" id="toggle-message">
      Rounds: <input type="number" id="rounds" style="width: 50px" value="1"  min="1" max="10"/>    
  </div>       
  <div class="notes3" id="toggle-message4">  
  <center> Condition Value: <input type="number" id="cvalue" style="width: 50px" value="1" min="1" max="10"/></p> 
  </div>
  </form>

  <!------ Javascript Section -------> 
  <script>

  function toggleMessage (isVisible) {
    document.getElementById("toggle-message").style.display = isVisible ? "none" : "block"

    document.getElementById("toggle-message3").style.display = isVisible ? "block" : "none"
    document.getElementById("toggle-message4").style.display = isVisible ? "none" : "block"
  }
  function toggleMessage2 (isVisible) {
    document.getElementById("toggle-message").style.display = isVisible ? "none" : "block"
    document.getElementById("toggle-message4").style.display = isVisible ? "block" : "none"
    document.getElementById("toggle-message3").style.display = isVisible ? "none" : "block"
  }
  function toggleMessage3 (isVisible) {
     document.getElementById("toggle-message").style.display = isVisible ? "block" : "none"

    document.getElementById("toggle-message3").style.display = isVisible ? "block" : "none"
  }
  function toggleMessage4 (isVisible) {
     document.getElementById("toggle-message").style.display = isVisible ? "block" : "none"

    document.getElementById("toggle-message3").style.display = isVisible ? "none" : "block"
    document.getElementById("toggle-message4").style.display = isVisible ? "none" : "block"
  }
  function updateRadiusValue(val) {
    document.getElementById("radius").value = val

  }
  function updateRangeValue(val) {
    document.getElementById("turnStartEnd").innerHTML = val

  }
  </script>`;

  new Dialog({
    title: `Token Magic - ${macroVersion}`,
    content: template,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: "Apply",
            callback: () => {
                applyChanges = true
            }
        },
        no: {
            icon: "<i class='fas fa-times'></i>",
            label: "Cancel",
        },
        clear: {
            icon: "<i class='fas fa-skull'></i>",
            label: "Clear",
            callback: () => clearDamage = true
        }
    },
    default: "yes",
    close: html => {
    }
  }, { id: 'pf2-template-creator'} ).render(true);  
}

// ==============================
// Main
// ==============================


// ==============================
// Common Functions 
// ==============================
