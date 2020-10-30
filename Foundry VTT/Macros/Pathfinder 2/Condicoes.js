/* 
Tradução por Heriberto Estolano:
https://gist.githubusercontent.com/EstolanoBeu/ae3f484fd2e496fcd512ab6f1e95eb82/raw/96fa86e64a0ddc87d94e1daa59aaf7c1a5242e16/Aplicar%2520Condi%25C3%25A7%25C3%25B5es

Macro original:
https://gitlab.com/LiquidSonic/pf2e-module-pack

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Pathfinder%202/Condicoes.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Pathfinder%202/Condicoes.svg
*/

////// Error checking user for not having the token selected, an active combat, that the token they are targeting or selecting is in combat or not/////
if (canvas.tokens.controlled == 0) {
    ui.notifications.warn("Não há token ativo.");
    return
}
// new selection code as seen in Blackmarrows for selecting a token or target
var t = "";
if (game.user.targets.size == 0) {
    t = token
} else {
    //Select targets
    t = game.user.targets.values().next().value;
}

// Check if there is an active combat
if (!game.combat) {
    ui.notifications.warn("Não há combate ativo.");
    return
}

// Check if the target id is in the combat tracker
if (!game.combat.getCombatantByToken(t.data._id)) {
    ui.notifications.warn("Este Token não está ativo em combate.");
    return
}
///////
// List of involved Variables below.
var tokenName = t.data.name;
var targetsId = t.id;
// Declare variables for condition, rounds, value of the condition and whether they start at beginning or end of turn
var conditionType, rounds, conditionValue, turnStartEnd,
    // Persistent damage for damage type and damage value
    pDamage, pDamageType,
    //  variables for the chat buttons
    applyChanges = false,
    clearDamage = false;
///
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
  <p class="notes title">Condições -   Fonte: <span style="color: darkred">${token.name}</span> Alvo: <span style="color: darkred">${t.name}</span></p>
  <div class="form-fields buttons radios">
    <!------ Acelerado -------> 
    <input type="radio" name="Type" id="Acelerado" value="Acelerado">
    <label for="Acelerado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/quickened.png">Acelerado</label>
    
    <!------ Agarrado -------> 
    <input type="radio" name="Type" id="agarrado" value="Agarrado">
    <label for="agarrado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/grabbed.png">Agarrado</label>
    
    <!------ Assustado -------> 
    <input type="radio" name="Type" id="assustado" value="Assustado">
    <label for="assustado" onclick="toggleMessage2(true),updateRangeValue('End of Turn')"> <img src="systems/pf2e/icons/conditions/frightened.png">Assustado</label>
 
    <!------ Atordoado -------> 
    <input type="radio" name="Type" id="Atordoado" value="Atordoado">
    <label for="Atordoado" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/stunned.png">Atordoado</label>
    
     </div>
    <div class="form-fields buttons radios">

     <!------ Cego ------->
    <input type="radio" name="Type" id="cego" value="Cego" checked>
    <label for="cego" onclick="toggleMessage4(true)"><img src="systems/pf2e/icons/conditions/blinded.png">Cego</label>
   
    <!------ Confuso -------> 
    <input type="radio" name="Type" id="confuso" value="Confuso">
    <label for="confuso" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/confused.png">Confuso</label>
    
    <!------ Controlado -------> 
    <input type="radio" name="Type" id="controlado" value="Controlado">
    <label for="controlado" onclick="toggleMessage4(true)"><img src="systems/pf2e/icons/conditions/controlled.png">Controlado</label>
    
     <!------ Dano Persistente -------> 
    <input type="radio" name="Type" id="DanoPersistente" value="DanoPersistente">
    <label for="DanoPersistente" onclick="toggleMessage3(true),updateRangeValue('Start of Turn')" > <img src="systems/pf2e/icons/conditions/persistentDamage.png">D. Persist.</label>

    </div>
    <div class="form-fields buttons radios">
        
    <!------ Desajeitado -------> 
    <input type="radio" name="Type" id="desajeitado" value="Desajeitado">
    <label for="desajeitado" onclick="toggleMessage(false)"><img src="systems/pf2e/icons/conditions/clumsy.png">Desajeitado</label>
      
    <!------ Desprevenido -------> 
    <input type="radio" name="Type" id="desprevenido" value="Desprevenido">
    <label for="desprevenido" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/flatFooted.png">Desprevenido</label>

    <!------ Drenado -------> 
    <input type="radio" name="Type" id="drenado" value="Drenado">
    <label for="drenado" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/drained.png">Drenado</label>
    
    <!------ Enfraquecido ------->           
    <input type="radio" name="Type" id="enfraquecido" value="Enfraquecido">
    <label for="enfraquecido" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/enfeebled.png">Enfraquecido</label>
    
    </div>
    <div class="form-fields buttons radios">
    
    <!------ Enjoado -------> 
    <input type="radio" name="Type" id="enjoado" value="Enjoado">
    <label for="enjoado" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/sickened.png">Enjoado</label>
    
    <!------ Estupefado -------> 
    <input type="radio" name="Type" id="estupefado" value="Estupefado">
    <label for="estupefado" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/stupefied.png">Estupefado</label>

    <!------ Fascinado -------> 
    <input type="radio" name="Type" id="fascinado" value="Fascinado">
    <label for="fascinado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/fascinated.png">Fascinado</label>
  
    <!------ Fatigado -------> 
    <input type="radio" name="Type" id="fatigado" value="Fatigado">
    <label for="fatigado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/fatigued.png">Fatigado</label>
   
    </div>
    <div class="form-fields buttons radios">
        
    <!------ Fugindo -------> 
    <input type="radio" name="Type" id="fugindo" value="Fugindo">
    <label for="fugindo" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/fleeing.png">Fugindo</label>
    
    <!------ Imobilizado -------> 
    <input type="radio" name="Type" id=imobilizado value=Imobilizado>
    <label for="imobilizado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/immobilized.png">Imobilizado</label>
    
     <!------ Invisível -------> 
    <input type="radio" name="Type" id="invisível" value="Invisível">
    <label for="Invisível" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/invisible.png">Invisível</label>
        
    <!------ Lento -------> 
    <input type="radio" name="Type" id="Lento" value="Lento">
    <label for="Lento" onclick="toggleMessage(false)"> <img src="systems/pf2e/icons/conditions/slowed.png">Lento</label>
    
    </div>
    <div class="form-fields buttons radios">
     
    <!------ Ofuscado -------> 
    <input type="radio" name="Type" id="ofuscado" value="Ofuscado">
    <label for="Ofuscado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/dazzled.png">Ofuscado</label>

    <!------ Paralisado -------> 
    <input type="radio" name="Type" id="Paralisado" value="Paralisado">
    <label for="Paralisado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/paralyzed.png">Paralisado</label>

    <!------ Petrificado -------> 
    <input type="radio" name="Type" id="petrificado" value="Petrificado">
    <label for="petrificado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/petrified.png">Petrificado</label>
    
    <!------ Prostrado ------->         
    <input type="radio" name="Type" id="prostrado" value="Prostrado">
    <label for="prostrado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/prone.png">Prostrado</label>
    
    </div>
    <div class="form-fields buttons radios">
   
    <!------ Quebrado -------> 
    <input type="radio" name="Type" id=quebrado value="Quebrado">
    <label for="quebrado" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/broken.png">Qubrado</label>
    
    <!------ Restringido -------> 
    <input type="radio" name="Type" id="Restringido" value="Restringido">
    <label for="Restringido" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/restrained.png">Restringido</label>
    
    <!------ Surdo -------> 
    <input type="radio" name="Type" id=surdo value="Surdo">
    <label for="surdo" onclick="toggleMessage4(true)"> <img src="systems/pf2e/icons/conditions/deafened.png">Surdo</label>
    
    <!------ Morrendo -------> 
    <input type="radio" name="Type" id="Morrendo" value="Morrendo">
    <label for="Morrendo"> <img src="systems/pf2e/icons/spells/befuddle.jpg">Morrendo</label>
    
 
    
   
  
</div>
</div>

<!------ Momento da Condição -------> 
<div class="form-group">
  <p class="notes title">Momento da Condição: <span id="turnStartEnd">Início do Turno</span></p>

  <div class="form-fields buttons">
    <button type="button" class="button" onclick="updateRangeValue('Start of Turn')">Início do Turno</button>
    <button type="button" class="button" onclick="updateRangeValue('End of Turn')">Fim do Turno</button>
  </div>
</div>


<!------ Sessão do Dano Persistente -------> 
<div class="notes2" id="toggle-message3">
<div class="form-group">

<!------ Tipos de Dano Persistente -------> 
  <label>Dano Persistente:</label>
  <select id="damage_type" name="damage_type">

    <option value="bleeding">Sangrando</option>
    <option value="fire">Fogo</option>
    <option value="acid">Ácido</option>
    <option value="cold">Frio</option>
    <option value="electricity">Eletricidade</option>
    <option value="mental">Mental</option>
    <option value="poison">Veneno</option>
  </select>
</div>

<div class='form-group'>
<!------ Persistent Damage values -------> 
 <label>Dano:</label>
 <div class='form-fields'><input type="text" id="damage" value="1d4"/></div>
 </div>
</div>



<!------ Round Calculator & Condition Value -------> 
<div class="notes" id="toggle-message">
    Rodadas: <input type="number" id="rounds" style="width: 50px" value="1" />    
</div>       
<div class="notes3" id="toggle-message4">  
<center> Valor da Condição: <input type="number" id="cvalue" style="width: 50px" value="1" /></p> 
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
    title: "Aplicador de Condição",
    content: template,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: "Aplicar",
            callback: () => {
                applyChanges = true
            }
        },
        no: {
            icon: "<i class='fas fa-times'></i>",
            label: "Cancelar",
        },
        clear: {
            icon: "<i class='fas fa-skull'></i>",
            label: "Limpar",
            callback: () => clearDamage = true
        },
    },
    default: "yes",
    close: html => {

        // If apply changes is clicked
        if (applyChanges) {
            // Grab the selected conditions name
            conditionType = html.find('[name="Type"]:checked')[0].value;
            console.log(conditionType)
            let conditionName;
            // If condition is not persistent damage, attempt to add condition to the token and update the HUD
            if (conditionType != "Persistent Damage") {
                (async () => {
                    conditionType = PF2eConditionManager.getCondition(conditionType); // Get the condition found by loop.
                    conditionName = conditionType.name;
                    conditionValue = html.find("#cvalue")[0].value; // get the value found by input
                    await PF2eConditionManager.addConditionToToken(conditionType, t); // add condition to token
                    await PF2eConditionManager.updateConditionValue(t.actor.data.items.find((x) => x.name === conditionType.name)._id, t, conditionValue) // find the condition by id on tokens object list, find token and condition value and add to token.
                    // function provided by Nerull to update the HUD.
                    function updateHUD(type) {
                        let updates = [];
                        let item = t.actor.items.find(i => i.name === conditionType.name);
                        updates.push({
                            "_id": item._id,
                            "data.sources.hud": true
                        });
                        t.actor.updateEmbeddedEntity("OwnedItem", updates);
                    }
                   await updateHUD(conditionType)
                })();
            }

            // Determine whether effect is start of turn or End of Turn
            if (document.getElementById("turnStartEnd").innerHTML === "Start of Turn") {
                turnStartEnd = false;
            } else {
                turnStartEnd = true;
            }


            // Grabbing the rest of the required Variables for the alert
            rounds = parseInt(html.find("#rounds")[0].value);
            pDamage = html.find("#damage")[0].value;
            pDamageType = html.find("#damage_type")[0].value;
            let repeat = null;
            let message = "";


            // if frightened, add the repeater
            if (conditionType.name == "Frightened") {
                repeat = {
                    frequency: 1,
                    expire: 0,
                    expireAbsolute: false
                }
            }
            // if persistent damage, add the message
            if (conditionType == "Persistent Damage") {
                conditionName = "Persistent Damage";
                message = tokenName + " takes [[/r " + pDamage + "#" + pDamageType + " damage]] persistent " + pDamageType + " damage.<br/>Roll DC 15 Flat check, [[/r 1d20 #flat check vs DC 15]]"
                repeat = {
                    frequency: 1,
                    expire: 0,
                    expireAbsolute: false
                }
                addPDamage(pDamageType, t)
            }


            // take all collect inputs and established variables and input into function
            addAlert(rounds, conditionName, t, turnStartEnd, repeat, message, pDamageType)


        }

        // if clearDamage is clicked...
        if (clearDamage) {

            // Establish the condition selected, assume persistent damage type is "bleeding" or untyped.
            conditionType = html.find('[name="Type"]:checked')[0].value;
            pDamageType = html.find("#damage_type")[0].value;

            // remove the alert, remove the condition
            removeAlert(conditionType, t)

            // if the type is persistent damage, remove the icon and associated damage type
            if (conditionType == "Persistent Damage") {
                addPDamage(pDamageType, t)
            } else {
                removeCondition(conditionType, t)
            }
        }
    }
}, {
    id: 'pf2-template-creator'
}).render(true);

//// Alert Data Section ///
function addAlert(rounds, name, t, turnStartEnd, repeat, message) {
  
    let turnId

if (conditionType.name == "Frightened" || "Persistent Damage") { 
turnId = game.combat.getCombatantByToken(t.data._id)._id }
else {
turnId = game.combat.getCombatantByToken(token.data._id)._id
}
    const combatData = game.combat.data;

/// Remove Statuscheck for Persistent Damage
let StatusCheck = "StatusCheck";
let pFlag = false;
if (name == "Persistent Damage")
{
pFlag = true
rounds = 0;
}


    const alertData = {
        combatId: combatData._id,
        name: name,
        createdRound: combatData.round,
        turnId: turnId,
        round: rounds,
        args: [conditionType.name, t.id, "delete",pFlag, pDamage],
        macro: StatusCheck,
        repeating: repeat,
        roundAbsolute: false,
        userId: game.userId,
        message: message,
        endOfTurn: turnStartEnd,
        targetId: targetsId,
        pDamageType: pDamageType,
        recipientIds: []
    }
    TurnAlert.create(alertData);
}


///Clear Persistent Damage Function ///
function removeAlert(conditionType, t) {
    if (TurnAlert.find(c => c.name === conditionType && c.pDamageType === pDamageType)) {
        let alert = TurnAlert.find(c => c.name === conditionType && c.pDamageType === pDamageType);
        TurnAlert.delete(alert.combatId, alert.id);
    }
}

function addPDamage(pDamageType, t) {
    var toggle = pDamageType;
    switch (toggle) {
          case "bleeding": t.toggleEffect("systems/pf2e/icons/spells/blade-barrier.jpg");
          break;
          case 'fire': t.toggleEffect("systems/pf2e/icons/spells/flaming-sphere.jpg")
          break;
          case 'acid': t.toggleEffect("systems/pf2e/icons/spells/blister.jpg")
          break;
          case 'cold': t.toggleEffect("systems/pf2e/icons/spells/chilling-spray.jpg")
          break;
          case 'electricity': t.toggleEffect("systems/pf2e/icons/spells/chain-lightning.jpg")
          break;
          case 'mental': t.toggleEffect("systems/pf2e/icons/spells/modify-memory.jpg")
          break;
          case 'poison': t.toggleEffect("systems/pf2e/icons/spells/acidic-burst.jpg")
          break;
      }
              
}

function removeCondition(conditionType, t) {
    if (t.actor.data.items.find(i => i.name === conditionType)) {
        let delCondition = t.actor.data.items.find(i => i.name === conditionType);
        PF2eConditionManager.removeConditionFromToken(delCondition._id, t)
    } else {
        ui.notifications.warn("Condição não encontrada");
    }
    return;
}