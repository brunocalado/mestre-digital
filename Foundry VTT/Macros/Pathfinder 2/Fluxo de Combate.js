// Actions - Strike macro (Valdacil)
// ---------------------------------------------------------
/* ztilleto - Combat Track Strike Macro - with pf2qr usage. 
MDI - Macro to determin if you are current player and can strike, as well as count 
      up the MAP strike modifier for your current Round. 

      This Macro will Use game.user.mdiOptions for storage of information. 
      
      É um macro de ataque, estilo combat flow, ele age junto com o pf2qr, você seleciona alvo, ativa, você tem botão pra fazer os ataques, ele aplica automaticamente as penalidades pra cada ataque (Nem FG faz isso ainda), diferencia se foi crítico ou não (mesmo com pf2qr você tem que manualmente clicar), e por fim, verifica se o personagem tem Sneak Attack, se tiver, automaticamente adiciona se o alvo estiver flat footed e o jogador atacando com arma finesse.

      Ainda não tá finalizado, mas já dá pra usar. O criador diz que pretende lançar via módulo com mais coisas juntas

*/
console.log("START")
let dialog;
const rollDamageRegardles = true; //Used to set if you want Damage to be rolled even if you didn't hit.  
let isPf2qr = false;
let isPCQR = false;
let isFurnace = false; 
game.modules.forEach( mod => {if(mod.id === "furnace" && mod.active === true) return isFurnace = true})
if(!isFurnace) ui.notifications.warn("You need FURNACE module installed and active");

game.modules.forEach( mod => {if(mod.id === "pf2qr" && mod.active === true) return isPf2qr = true})
if(isPf2qr)
	isPCQR = game.settings.get("pf2qr", "PlayersCanQuickRoll")

console.log("isPf2qr " +isPf2qr)

game.user.mdiOptions = {
    lastHitStatus: -1,
    buttonPressed: false,
    combatTrackerUID: 0,
//    weaponOfChoice: "",
    strikeCounter: 0,
    currentCombatRound: 0,
    dialog: '',
    uiTop: -1, 
    uiLeft: -1,
}

function pf2qrMDI_ChatMessage(message) {
    if (game.combats.size > 0)
        if (game.user._id === game.users.entities.find(u => u.isGM)._id || game.combat.combatant.players[0].data._id === game.user._id) {

            game.user.mdiOptions.lastHitStatus = -1;
            const wasHit = message.data.content.search(/[✔️]+[\s\S]*[✔️]+[\s\S]*\bHit\b\./g)
            const wasCritMiss = message.data.content.search(/[💔]{2}[\s\S]*[💔]{2}[\s\S]*\bCritically missed\b!/g)
            const wasMiss = message.data.content.search(/[❌]+[\s\S]*[❌]+[\s\S]*\bMissed\b\./g)
            const wasCritHit = message.data.content.search(/[💥]{2}[\s\S]*[💥]{2}[\s\S]*\bCritically Hit\b!/g)

            if (wasCritHit > 0) {
                game.user.mdiOptions.lastHitStatus = 3;
            }
            if (wasHit > 0) {
                game.user.mdiOptions.lastHitStatus = 2;
            }
            if (wasMiss > 0) {
                game.user.mdiOptions.lastHitStatus = 1;
            }
            if (wasCritMiss > 0) {
                game.user.mdiOptions.lastHitStatus = 0;
            }
        }
}
//Test to see if pf2qr is available for players, skip if not. And if we have already made the hook, skip from making multiple.  
if(isPf2qr){
        let isMyHookMade = false
	if(Hooks._hooks.createChatMessage != undefined)
		isMyHookMade = Hooks._hooks.createChatMessage.find(({
			name
		}) => name === 'bound pf2qrMDI_ChatMessage')
	
	if (game.settings.get("pf2qr", "PlayersCanQuickRoll"))
		if (!isMyHookMade) Hooks.on("createChatMessage", pf2qrMDI_ChatMessage.bind(this));
}

function pf2qrMDI_targetChange(myUser, myToken, myTargeted) {
console.log("pf2qrMDI_targetChange(myUser, myToken, myTargeted)::BEGIN") 
    if (game.user === myUser && game.user.mdiOptions.dialog._state == 2) {
        game.user.mdiOptions.dialog.close();
        game.user.mdiOptions.uiTop = game.user.mdiOptions.dialog.position.top;
        game.user.mdiOptions.uiLeft = game.user.mdiOptions.dialog.position.left;
        renderMyStrikeDialog()
        game.user.mdiOptions.dialog.position.top = game.user.mdiOptions.uiTop;
        game.user.mdiOptions.dialog.position.left = game.user.mdiOptions.uiLeft;
        game.user.mdiOptions.dialog.render(true);
    }
console.log("pf2qrMDI_targetChange(myUser, myToken, myTargeted)::END") 

}
let isMyHookMade2 = false
if(Hooks._hooks.targetToken != undefined)
isMyHookMade2 = Hooks._hooks.targetToken.find(({
    name
}) => name === 'bound pf2qrMDI_targetChange')
if (!isMyHookMade2) Hooks.on("targetToken", pf2qrMDI_targetChange.bind(this));

if (!actor) {
    ui.notifications.warn("You must have an actor selected.");
    return
} 

if (actor.data.type != "character") {
    ui.notifications.warn("This only works with Player Characters.");
    return
}

if (!Combat.config.collection.entities.length) {
    game.user.mdiOptions.combatTrackerUID = 0;
    ui.notifications.warn("No Combat Encounter.");
    return
}
function renderMyStrikeDialog() {
console.log("renderMyStrikeDialog()::BEGIN");
    //   return new Promise((resolve, reject) => {
    let myaction = ''
    // error checking
    let targets = canvas.tokens.controlled;
    if (targets.length != 1) {
        ui.notifications.warn("You must select exactly 1 token.");
        return;
    }
    let myTarget
    if (game.user.targets.size === 1) {
        for (let target of game.user.targets) {
            myTarget = target
        }
    }

    let strikeOptions = [];
    for (let action of canvas.tokens.controlled[0].actor.data.data.actions) {
        strikeOptions.push({
            desc: `${action.name}`
        });
    }

    if (strikeOptions.length == 0) {
        ui.notifications.warn("No strikes found on this token!");
        return;
    }

    let dialogContent =
        `<div><form><table width=100%>
                   <tbody>
                      <tr>
		        <td>Actor: ${actor.data.name}</td>
                        <td>`;
    if (myTarget) dialogContent += `Target: ${myTarget.data.name}`
    dialogContent += `</td>
                      </tr>
                      <tr>
		         <td>Strike: <select id="strikeSelect">`;
    for (let i = 0; i < strikeOptions.length; i++) {
        let option = strikeOptions[i];
        if (game.user.mdiOptions.weaponOfChoice === option.desc) {
            dialogContent += `<option selected value="${i}">${option.desc}</option>`;
        } else {
            dialogContent += `<option value="${i}">${option.desc}</option>`
        };
    }
    dialogContent +=
        `</select>
                     </td>
                     <td>
                     </td>
                  </tr>
	       </tbody>
              </table>
            </form><div>
		  `;
    //		<p>Modifier: <input type="number" id="modRoll" style="width: 80px" value="0" /></p>

    // Build dialog box

    let buttons = {
        wattack: {
            //icon: "<i class='fas fa-check'></i>",
            label: "Attack!",
            callback: () => buttonPressed(myaction = "act1"),
        },
        wdmg: {
            //icon: "<i class='fas fa-check'></i>",
            label: "Damage",
            callback: () => buttonPressed(myaction = "dmg"),
        },

    }
    if (!isPCQR || game.user.targets.size < 1) {
        buttons.critdmg = {
            //icon: "<i class='fas fa-check'></i>",
            label: "CritDamage",
            callback: () => buttonPressed(myaction = "critdmg"),
        }
    }
    buttons.cancel = {
        //icon: "<i class='fas fa-times'></i>",
        label: "Cancel",
        callback: () => buttonPressed(myaction = "cancel"),
    }

    game.user.mdiOptions.dialog = new Dialog({
        title: `${token.name} Strikes`,
        content: dialogContent,
        buttons: buttons,
        default: "cancel",
        // close: () => execute(myaction, strikeSelect)
        close: html => {
            game.user.mdiOptions.uiTop = game.user.mdiOptions.dialog.position.top;
            game.user.mdiOptions.uiLeft = game.user.mdiOptions.dialog.position.left;
            //If close was called due to window close, none of the buttons was pressed and we can close. 
            if (!game.user.mdiOptions.buttonPressed || myaction === "cancel") return
            let chosenOption = strikeOptions[html.find("#strikeSelect")[0].value];
            // we clear the button have been pressed before sending it off to execution.
            game.user.mdiOptions.buttonPressed = false
            execute(myaction, chosenOption.desc);
        }
    }, {
        width: 400
    });
    //  });
}
console.log("TEST");
//Starting the Render of popup first time. 
console.log("UI top: "+game.user.mdiOptions.uiTop +" UI Left: "+game.user.mdiOptions.uiLeft)
renderMyStrikeDialog();
if(game.user.mdiOptions.uiTop >= 0) //Remember placement from dialog to dialog. 
{ 
    game.user.mdiOptions.dialog.position.top = game.user.mdiOptions.uiTop;
    game.user.mdiOptions.dialog.position.left = game.user.mdiOptions.uiLeft;
}
game.user.mdiOptions.dialog.render(true);

function buttonPressed(myAction) {
    //canvas.tokens.controlled[0].buttonPressed = true
    game.user.mdiOptions.buttonPressed = true;
    return myAction
}

// Execute rolls
async function execute(myaction, weapon) {
    if (!(myaction === "cancel")) {
        let myweapon = (canvas.tokens.controlled[0].actor.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon);
        if (!myweapon) {
            ui.notifications.warn("You dont have that weapon.");
            return;
        }
        switch (myaction) {
            case "act1":
                attack(weapon);
                break;
            case "dmg":
                applyDamageWith(weapon);
                break;
            case "critdmg":
                applyDamageWith(weapon, true);
                break;
            default:
                return
        }
        if (game.user.mdiOptions.weaponOfChoice === weapon) {
            game.user.mdiOptions.dialog.render(true);
        } else {
            game.user.mdiOptions.weaponOfChoice = weapon;
            //	renderMyStrikeDialog().then(game.user.mdiOptions.dialog.render(true));
            await renderMyStrikeDialog();
            game.user.mdiOptions.dialog.position.top = game.user.mdiOptions.uiTop;
            game.user.mdiOptions.dialog.position.left = game.user.mdiOptions.uiLeft;
            game.user.mdiOptions.dialog.render(true);
        }
    }
console.log("renderMyStrikeDialog()::END");
}

async function attack(weapon) {
    let myWeapon = (canvas.tokens.controlled[0].actor.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon);
    const currentCombatEncounter = Combat.config.collection.find(scene => scene.data.scene === canvas.id)
    // Current Combat Track UID 
    const currentCombatUID = currentCombatEncounter.data._id;
    // The Current Active Token
    const currentTokenID = currentCombatEncounter.current.tokenId;
    const currentRound = currentCombatEncounter.current.round;
    const currentTurn = currentCombatEncounter.current.turn;
    // The full combatant Object matching the Active Combat Token
    const currentCombatant = currentCombatEncounter.data.combatants.find(combatant => combatant.tokenId == currentTokenID);

    if (currentCombatant === undefined) {
        ui.notifications.warn("Not Your Turn Yet");
        return;
    }
    // We test if the Actor we are using is actually the current Combat Actor 

    if (currentCombatant.actor == actor) {
        // This is to secure that we are in a new Combat than last time we ran
        if (!(currentCombatUID == game.user.mdiOptions.combatTrackerUID)) {
            game.user.mdiOptions.strikeCounter = 0;
            game.user.mdiOptions.currentCombatRound = currentRound;
            game.user.mdiOptions.combatTrackerUID = currentCombatUID;
        }
        // This is to reset MAP with every new Round. 
        if (currentRound != game.user.mdiOptions.currentCombatRound) {
            game.user.mdiOptions.strikeCounter = 0;
            game.user.mdiOptions.currentCombatRound = currentRound;
        }
        let currentMap = game.user.mdiOptions.strikeCounter;
        //		(actor.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon)?.variants[currentMap]?.roll(event);
        const opts = actor.getRollOptions(['all', 'damage-roll']);
        await myWeapon.variants[currentMap].roll(event, opts);

        const lastMessageID = game.messages.size;
        const lastMessage = game.messages[lastMessageID];

        //You will only be able to gain MAP2 no matter how many strikes you can make. 
        if (currentMap < 2) {
            //You have now attacked, and we increase the Strike Counter. 
            game.user.mdiOptions.strikeCounter += 1;
        }
    } else ui.notifications.warn("Not Your Turn Yet");

}

async function applyDamageWith(weapon, crit = false) {
console.log("applyDamageWith(weapon, crit = false)::BEGIN")	
console.log(((!isPf2qr) +" || "+ rollDamageRegardles +" || "+ game.user.mdiOptions.lastHitStatus >= 2 +" || "+ game.user.targets.size === 0))
    if (!isPf2qr || rollDamageRegardles || game.user.mdiOptions.lastHitStatus >= 2 || game.user.targets.size === 0) {
        let myTarget
        let result
        let currentEvent = event;
        for (let target of game.user.targets) {
            myTarget = target
        }
        if (game.user.targets.size > 0) {
            const isFlatFooted = await hasStatusEffect(myTarget, 'flatFooted');
            if (isFlatFooted)
                await applySneakAttack()
            result = toggleDamageModifier(isFlatFooted);
            const opts = await actor.getRollOptions(['all', 'damage-roll'])

        }
        let myweapon = (canvas.tokens.controlled[0].actor.data.data.actions ?? []).filter(action => action.type === 'strike').find(strike => strike.name === weapon);
        if (crit || game.user.mdiOptions.lastHitStatus === 3) {
            await myweapon.critical(currentEvent, result) //event
        } else {
            await myweapon.damage(currentEvent, result) //event
        }
    } else ui.notifications.warn("You didn't hit, so no damage");

    // The Hit has been avaluated in regards to Damage. 
    game.user.mdiOptions.lastHitStatus = -1

console.log("applyDamageWith(weapon, crit = false)::END")
    return

}

function toggleDamageModifier(isFlatFooted) {
    const opts = actor.getRollOptions(['all', 'damage-roll'])
    const returnOpts = [];
    if (game.user.targets.size === 1) {
        const toggleFlatfooted = opts.find(element => element === "flatFooted");
        if (isFlatFooted) {
            if (toggleFlatfooted === undefined) {
                actor.toggleRollOption('damage-roll', 'flatFooted');
            }
            returnOpts.push('flatFooted')
        } else {
            if (toggleFlatfooted) {
                actor.toggleRollOption('damage-roll', 'flatFooted');
            }
        }

    }
    return returnOpts
}

async function applySneakAttack() {
    const actorDicePool = Math.floor(((actor.data.data.details.level.value + 1) / 6) + 1);
    const actorHasSneakAttack = actor.data.items.find(({
        name
    }) => name === "Sneak Attack") != undefined;
    await actor.removeDamageDice('damage', 'Sneak Attack');
    if (actorHasSneakAttack) {
        await actor.addDamageDice({
            selector: 'damage',
            name: 'Sneak Attack',
            diceNumber: actorDicePool,
            dieSize: 'd6',
            category: 'precision',
            options: {
                any: ['agile', 'finesse', 'ranged'],
                all: ['flatFooted']
            }
        });
    }
}

function hasStatusEffect(targetActor, targetStatus) {
console.log("hasStatusEffect(targetActor, targetStatus)::BEGIN")
    return new Promise((resolve, reject) => {
        const result = targetActor.actor.data.data.statusEffects.find(({
            status
        }) => status === targetStatus);
        if (result != undefined) {
            resolve(true)
        } else resolve(false)
    })
console.log("hasStatusEffect(targetActor, targetStatus)::END")
}