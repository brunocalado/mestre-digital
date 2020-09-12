/* Ataque Automatizado v1.1

Fonte: https://gitlab.com/lipefl/foundrymacros/-/blob/master/macros/Atacar.js
Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Ataque%20Automatizado.svg
*/


var tokenActor=canvas.tokens.controlled[0];
if (tokenActor===undefined){
    ui.notifications.warn("Nenhum token selecionado como atacante.");    
} else if (canvas.tokens.controlled.length>1) {
    ui.notifications.warn("Há mais de um token selecionado como atacante."); 
} else {
var tokenTarget=Array.from(game.user.targets)[0];
var currentTarget=false;
if (tokenTarget!==undefined && Array.from(game.user.targets).length==1){
    var currentTarget = tokenTarget.actor;
}
var theJoker=false;
let activeCombat=game.combats.find(el=>el.data.active===true);

if (activeCombat && activeCombat.turns.find(i=>i.tokenId==tokenActor.id)!==undefined){
   // theJoker=game.combats.active.turns.find(i=>i.tokenId===tokenActor.id).flags.swade.hasJoker

   if (activeCombat.turns.find(i=>i.tokenId==tokenActor.id).flags.swade){
    theJoker=activeCombat.turns.find(i=>i.tokenId==tokenActor.id).flags.swade.hasJoker; /// returns true if has the Joker;

    if (theJoker!==true){
        theJoker=false;
    }
}
}


var cdt=false;
var countShots=false;
var stopAttack=false;

var changeDamage=false;
var rerrolling=false;


var currentActor = tokenActor.actor;
var currentWeapon;
var raise=false;
var sitMod=0;
var dmgMod=0;
var changeSkill=false;
var manouver=false;
var useArcaneSkill=false;
var actorShaken=false;


let template=``;

if (!currentTarget){
    let motiveNoTarget=`Nenhum alvo selecionado`
    if (Array.from(game.user.targets).length>1){
        motiveNoTarget=`Mais de um alvo selecionado`;
    }
    template+=`<div style="background:red;color:white;padding:3px">`+motiveNoTarget+`. O acerto/dano não será automático.</div>`;

}

if (theJoker){
    template+=`<div style="background:#00b0ff;color:white;padding:3px">Você sacou um Curinga. Bônus serão aplicados automaticamente.</div>`;
}

if (currentActor.data.data.status.isShaken){
    template+=`<div style="background:#00b0ff;color:white;padding:3px">O Atacante está Abalado. Uma tentativa de sair do Abalado será feita antes do ataque.</div>`;
    actorShaken=true;
}

template+=`<p>Arma: <select id="arma">`;

let cdtMax=1;
//let useShotgun=false;
let weapons = currentActor.items.filter((el) => el.type == "weapon" && el.data.data.equipped);
for (const weapon of weapons){
    let useSkill='Lutar';
    if (weapon.data.data.range){
        useSkill='Atirar';
    }

    let shotsTxt=``;
   if (parseInt(weapon.data.data.shots)>0){
    shotsTxt=` | `+weapon.data.data.currentShots+`/`+weapon.data.data.shots+' tiros';
   }

    template+=`<option value="`+weapon._id+`">`+weapon.name+` (`+useSkill+`) | Dano: `+weapon.data.data.damage.replace('@str','For')+shotsTxt+`</option>`;

    if (weapon.data.data.rof>cdtMax){ /// max rof
        cdtMax=weapon.data.data.rof;
    }

   /*  if (weapon.data.data.damage=='1-3d6'){// shotgun
        useShotgun=true;
    }  */

}


var arcanes=['Ciência Estranha','Conjurar','Fé','Psiônicos','Foco'];

let powers=currentActor.items.filter((el) => el.type == "power" && el.data.data.equipped);

for (const power of powers){/// only Bolt

    if (!useArcaneSkill){
        useArcaneSkill=currentActor.items.filter((el) => el.type == "skill" && arcanes.includes(el.name))[0];
        if (useArcaneSkill===undefined){
            useArcaneSkill='Sem Perícia';
        } else {
            useArcaneSkill=useArcaneSkill.name
        }
    }

    template+=`<option value="`+power._id+`">`+power.name+` (`+useArcaneSkill+`) | Dano: `+power.data.data.damage+`</option>`;

} 

template+=`</select></p>`;


template+='<p>Mod. Ataque <input type="text" id="mod_adc" style="width:50px" value="" /> Dano <input type="text" id="mod_dmg" style="width:50px" value="" /></p>';

template+=`<p>Alterar Dano: <input type="text" value="" style="width:100px" id="alterdmg" /></p>`;

template+=`<p>Rolagem: <select id="mudarRolagem"><option value="">Padrão</option><option value="Atletismo">Usar Atletismo</option><option value="Atirar">Usar Atirar</option><option value="Lutar">Usar Lutar</option>`;

if (useArcaneSkill){
    for (const arcane of arcanes){
        if (arcane!=useArcaneSkill){
            template+=`<option value="`+arcane+`">`+arcane+`</option>`;
        }
        
    }
    
}

if (currentTarget){
    template+=`<option value="onlydmg">Somente Dano</option><option value="onlydmg_raise">Somente Dano (com ampliação)</option>`;
}

if (currentActor.items.filter((el) => el.type == "edge" && el.name=='Frenesi')[0]){
    template+=`<option value="frenesi">Frenesi (Lutar)</option>`;
}

if (currentActor.items.filter((el) => el.type == "edge" && el.name=='Disparo Duplo')[0]){
    template+=`<option value="duplo">Disparo Duplo (Atirar)</option>`;
}


template+=`<option value="r3b">Rajada de 3 Balas (Atirar)</option>`

if (cdtMax>1){
    for (let i=2;i<=cdtMax;i++){
        template+=`<option value="cdt_`+i+`">Cdt `+i+` (Atirar-2)</option>`;
    }
}


/* if (useShotgun){
template+=`<option value="escop_1d6">Escopeta (1d6)</option><option value="escop_2d6">Escopeta (2d6)</option><option value="escop_1d6">Escopeta (3d6)</option>`;
} */

template+=`</select></p>`;





let dialogTitle=currentActor.name+' ataca';

if (currentTarget){
    dialogTitle+=' '+currentTarget.name;
}

new Dialog({
    title: dialogTitle,
    content: template,
    buttons: {
        ok: {
            label: `Atacar`,
            callback: function (html) {
                applyFormOptions(html);
            },
        }
    },
}).render(true);

/* function talkingToken(htmlMessage,target=false){
    if (tokenTalk){
        let tokenObj=tokenActor;
        if (target){
            tokenObj=tokenTarget;
        }
    let bub=new ChatBubbles().say(tokenObj,htmlMessage); 
    }
} */

function addEventListenerOnHtmlElement(element, event, func){
    console.log(element);
    // Use Hook to add event to chat message html element
    Hooks.once("renderChatMessage", (chatItem, html) => { 
        html[0].querySelector(element).addEventListener(event, func);
    });
} // end addEventListenerOnHtmlElement

function applyFormOptions(html){

    let weapon=html.find("#arma")[0].value;
    sitMod=Number(html.find("#mod_adc")[0].value);
    dmgMod=Number(html.find("#mod_dmg")[0].value);
    let changeRoll=html.find('#mudarRolagem')[0].value;
   // let parcana=html.find('#parcana')[0].value;
    let goToDamage=false;
    changeDamage=html.find('#alterdmg')[0].value;

    let combatSkills=['Atirar','Atletismo','Lutar'];
    

    if (combatSkills.includes(changeRoll)){
        changeSkill=changeRoll;
        
    } else 
    if (changeRoll=='onlydmg' || changeRoll=='onlydmg_raise'){
        if (changeRoll=='onlydmg_raise'){
            raise=true;
        }

        goToDamage=true;
        
    } else 
    if (changeRoll=='frenesi' || changeRoll.startsWith('cdt_')){
        cdt=2;
        changeSkill='Atirar';
        if (changeRoll=='frenesi'){
            changeSkill='Lutar';
        } else {
           cdt=parseInt(changeRoll.charAt(4));
        }
        
    } else if (changeRoll=='duplo' || changeRoll=='r3b'){
        manouver=changeRoll;
        changeSkill='Atirar';
    } /* else if (changeRoll.startsWith('escop_')){
        let escopRoll=changeRoll.split('_');
        changeDamage=escopRoll[1];
    } */
   
    

    currentWeapon=currentActor.items.filter((el) => el.id == weapon)[0];

    if (useArcaneSkill && currentWeapon.type=="power"){
        changeSkill=useArcaneSkill;

        if (arcanes.includes(changeRoll)){
            changeSkill=changeRoll;
        }
    }

    let weaponShots=currentWeapon.data.data.shots;
    if (parseInt(weaponShots)>0) {
        countShots=true;
    }

    

    if (!goToDamage){
        if (actorShaken){
            checkForShaken();
        }
        if (!stopAttack){
            doAttack();
        }
       
    } else {
        doDamage();
    }

}


function checkForShaken(){
    let spiritDie=currentActor.data.data.attributes.spirit.die.sides;
    let spiritModifier=currentActor.data.data.attributes.spirit.die.modifier;
    let usemod=0;
    let tag;
    let textColor;
    let mainDieColor;
    let wilddieColor;
    let modsList=[];
    let showBeneButton=false;
    let useActor=currentActor;
    let contentText=``;
    let wildDice='6';
    
    if (parseInt(spiritModifier)){
        let addplus='';
        if (parseInt(spiritModifier)>0){
            addplus='+';
        }
        modsList.push('Espírito: '+addplus+spiritModifier);
        usemod=usemod+parseInt(spiritModifier);
    }

    if (useActor.data.data.status.isDistracted){
        modsList.push('Distraído: -2');
        usemod=usemod-2;
    }

    if (parseInt(useActor.data.data.wounds.value)){
        let woundsmod=parseInt(useActor.data.data.wounds.value)-parseInt(useActor.data.data.wounds.ignored);
        if (woundsmod>0){
        modsList.push('Ferimentos: -'+woundsmod);
        usemod=usemod-parseInt(woundsmod);
        }
    }

    if (parseInt(useActor.data.data.fatigue.value)){
        modsList.push('Fadiga: -'+useActor.data.data.fatigue.value)
        usemod=usemod-parseInt(useActor.data.data.fatigue.value);
    }

    if (theJoker){
        modsList.push('Curinga: +2');
        usemod=usemod+2;
    }


    let wilddieResult=0;
    let isWCard=currentActor.data.data.wildcard;
    if (isWCard){
        wildDice=currentActor.data.data.attributes.spirit["wild-die"].sides;
        wilddieResult=new Roll('1d'+wildDice+'x=').roll().total+usemod;
    } 

    let mainDieResult=new Roll('1d'+spiritDie+'x=').roll().total+usemod;


    if (Math.max(mainDieResult,wilddieResult)<4){
        /// interrompe ataque
        tag='Falha';
        textColor='#666';
        mainDieColor='#666';
        wilddieColor='#666';

        stopAttack=true; /// offer benny

        

    } else {
        tag='Sucesso';
        textColor='green';
        if (mainDieResult>=4){
            mainDieColor='green';
        }

        if (wilddieResult>=4){
            wilddieColor='green';
        }
    }

    
    contentText+=`<div class="dice-tooltip"><div class="dice-rolls"><ol class="dice-rolls"><li class="roll die d`+spiritDie+`" style="color:`+mainDieColor+`">`+mainDieResult+`</li>`;

    if (wilddieResult){
        contentText+=`<li class="roll die d`+wildDice+`" style="color:`+wilddieColor+`">`+wilddieResult+`</li>`
    }

    contentText+=`<li style="line-height:24px;float:left;font-size:16px;color:`+textColor+`;font-weight:bold;margin-left:10px">`+tag+`</li>`;

    contentText+=`</ol></div></div>`;

    contentText+=`<div>`;
    if (tag=='Sucesso'){
        contentText+=`<p>`+currentActor.name+` saiu do Abalado!</p>`;
        useActor.update({"data.status.isShaken":false});
    } else {
        showBeneButton=true;
        contentText+=`<p>`+currentActor.name+` permanece abalado e só pode usar ações livres.</p>`;
        contentText+='<button style="background:#0277bd;color:white" id="beneRemoveShaken">Usar Bene</button>';
    }

    contentText+='</div>';

    let modsListPrint='';
    if (modsList.length>0){
        let modsnumber=String(usemod);
        if (modsnumber>0){
            modsnumber='+'+modsnumber;
        }
        modsListPrint=`<br>Mods (`+modsnumber+`): `+modsList.join(', ');
    }

    let flavorText='rola para sair do Abalado.'+modsListPrint;

    displayOnChat(currentActor.name,contentText,flavorText);

    if (showBeneButton){
        addEventListenerOnHtmlElement("#beneRemoveShaken", 'click', (e) => { 
           
    
            useBenny('shaken');        
           
        }); 
    }

}


function manageShots(shotsUsed,recharge=false){
   
        let weaponShots=currentWeapon.data.data.currentShots;
        let weaponShotsCounter;
       // let maxShots;
        let shotsLeft=weaponShots-shotsUsed;
        

        

        if (recharge){
            shotsLeft=currentWeapon.data.data.shots;
            displayOnChat(currentActor.name,'<strong>'+currentWeapon.name+'</strong> recarregada com '+shotsLeft+' tiros.');

        }

        if (shotsLeft<0){
           
            displayOnChat(currentActor.name,'<strong>'+currentWeapon.name+'</strong> não tem munição suficiente <button id="rechargeWeapon" style="background:#ffc107;margin-top:5px">Recarregar</button>');
            stopAttack=true;

            addEventListenerOnHtmlElement("#rechargeWeapon", 'click', (e) => { 
       

                manageShots(0,true);        
               
            }); 
        } else {

       // weaponShotsCounter=shotsLeft+'/'+maxShots;



        currentWeapon.update({"data.currentShots":shotsLeft});

        }
    
    

}


function doAttack(){
    let useActor=currentActor;
    let useTarget=currentTarget;
    let weapon=currentWeapon;
    let useSkill='Lutar';
    let modsList=[];
    let usemod=0;    
  //  let raiseStr=0;
    let isWCard=useActor.data.data.wildcard;
    let wilddie;
    let mainDieColor='#333';

    if (cdt){
        useTarget=false; // remove target if using cdt
    }

    if (changeSkill){
        useSkill=changeSkill;
    } else 
    if (weapon.data.data.range){ /// ranged
        useSkill='Atirar';
    } 

    if (useSkill=='Atirar' && countShots){
        let useShots=1;
        if (manouver){
            if (manouver=='duplo'){
                useShots=2;
            } else if (manouver=='r3b'){
                useShots=3;
            }

        }

    if (cdt){
        if (cdt==2){
            useShots=5;
        } else 
        if (cdt==3){
            useShots=10;
        } else 
        if (cdt==4){
            useShots=20;
        } else 
        if (cdt==5){
            useShots=40;
        } else 
        if (cdt==6){
            useShots=50;
        }
    }
        manageShots(useShots);
    }

    if (!stopAttack){ /// check for shots and other warns
    let itemSkill=useActor.items.filter((el) => el.type == "skill" && el.name== useSkill)[0];

    let mainDie='4';
    let skillmod='-2'; 
    let wilddie='6';

    if (itemSkill!==undefined){        
        mainDie=itemSkill.data.data.die.sides;
        skillmod=itemSkill.data.data.die.modifier;
        if (isWCard){
            wilddie=itemSkill.data.data["wild-die"].sides;
        }
    } 
    

    

    if (parseInt(skillmod)){
        modsList.push('Perícia: '+skillmod);
        usemod=usemod+parseInt(skillmod);
    }

    if (useActor.data.data.status.isDistracted){
        modsList.push('Distraído: -2');
        usemod=usemod-2;
    }

    if (parseInt(useActor.data.data.wounds.value)){
        modsList.push('Ferimentos: -'+useActor.data.data.wounds.value)
        usemod=usemod-parseInt(useActor.data.data.wounds.value);
    }

    if (parseInt(useActor.data.data.fatigue.value)){
        modsList.push('Fadiga: -'+useActor.data.data.fatigue.value)
        usemod=usemod-parseInt(useActor.data.data.fatigue.value);
    }

    if (theJoker){
        modsList.push('Curinga: +2');
        usemod=usemod+2;
    }

    if (useTarget && useTarget.data.data.status.isVulnerable){
        modsList.push('Alvo Vulnerável: +2');
        usemod=usemod+2;
    }

    if (cdt && changeSkill=='Atirar'){
        modsList.push('Recuo: -2');
        usemod=usemod-2;
    }

    if (manouver=='duplo'){
        modsList.push('Disparo Duplo: +1');
        usemod=usemod+1;
    }

    if (manouver=='r3b'){
        modsList.push('Rajada de 3 Balas: +2');
        usemod=usemod+2;
    }

    
 
    if (sitMod){
        let sitModStr=string(sitMod);
        if (sitMod>0){
            sitModStr='+'+sitModStr;
        }
        modsList.push('Adicional: '+sitModStr);
        usemod=usemod+sitMod;
    }



    let mainDieResult=new Roll('1d'+mainDie+'x=').roll().total;
    
    let wilddieResult;
    if (isWCard){
    wilddieResult=new Roll('1d'+wilddie+'x=').roll().total;
    } else {
        wilddieResult=new Roll('1d6').roll().total; // check for critical failure
    }
    
    let rerollButton=`<li style="line-height:24px;float:right;font-size:16px"><button style="background:#CCC;" id="reRollButton">Rerrolar</button></li>`;
    let weaponDamage=weapon.data.data.damage;
    if (changeDamage){
        weaponDamage=changeDamage;
    }
    
    let damageButton=`<button style="background:green;color:white" id="rollDamageButton">Rolar Dano (`+weaponDamage.replace('@str','For')+`)</button>`;
    let showDamageButton=true;
    let showRerollButton=true;
    let tag='';
    let textColor='grey';
    let finalMainDieResult=mainDieResult+usemod;
    let showWildDie=false;
    let wilddieColor='#333';
    let finalWilddieResult=0;
    let criticalFailure=false;
    if (isWCard){
        finalWilddieResult=wilddieResult+usemod;
    }

    raise=false; /// reset raise in case of reroll

    if (mainDieResult==1){
        mainDieColor='red';
    }

    if (wilddieResult==1){
        wilddieColor='red';
    }

    
    if (isWCard){
        showWildDie=true;
    }

    if (mainDieResult==1 && wilddieResult==1){
        tag='Falha Crítica!';
        textColor='red';
        showRerollButton=false;
        showDamageButton=false;
        if (!isWCard){
           showWildDie=true;
        }

        criticalFailure=true;

   }
    
    if (useTarget && !criticalFailure){
    let targetNumber=4;
    if (useSkill=='Lutar'){
        targetNumber=parseInt(useTarget.data.data.stats.parry.value)+parseInt(useTarget.data.data.stats.parry.modifier);
    }
    
    
    tag='Falha';
    
    mainDieColor='#666';
    wilddieColor='#666';
    showDamageButton=false;
  
    

    
    if (finalMainDieResult>=targetNumber || finalWilddieResult>=targetNumber){

        showDamageButton=true;
        
        let targetNumberRaise=targetNumber+4
        
        if (finalMainDieResult>=targetNumber){
            mainDieColor='green';
            if (finalMainDieResult>=targetNumberRaise){
                raise=true;
                mainDieColor='purple';
            }
        }

        if (finalWilddieResult>=targetNumber){
            wilddieColor='green';
            if (finalWilddieResult>=targetNumberRaise){
                raise=true;
                wilddieColor='purple';
            }
        }
        
        if (raise){
        //    raiseStr=1;
            tag='Ampliação!';
            textColor='purple';
            
        } else {
            tag='Acerto!';
            textColor='green';
        }
 
    

}
    }

    let diceTemplate=`<div class="dice-tooltip"><div class="dice-rolls"><ol class="dice-rolls"><li class="roll die d`+mainDie+`" style="color:`+mainDieColor+`">`+finalMainDieResult+`</li>`;

   
        if (cdt){
            let extraDieResult=[]
            for (let i=1;i<cdt;i++){
                let extraDieRoll= new Roll('1d'+mainDie+'x=').roll().total;
                extraDieRoll=extraDieRoll+usemod;
                diceTemplate+=`<li class="roll die d`+mainDie+`" style="color:#333">`+extraDieRoll+`</li>`;      
            }
        }
    

    if (showWildDie){
    diceTemplate+=`<li class="roll die d`+wilddie+`" style="color:`+wilddieColor+`">`+finalWilddieResult+`</li>`;
    }
    if (tag){
        diceTemplate+=`<li style="line-height:24px;float:left;font-size:16px;margin-left:10px;color:`+textColor+`;font-weight:bold">`+tag+`</li>`;
    }
    
    if (showRerollButton){
        diceTemplate+=rerollButton
    }
    diceTemplate+=`</ol></div></div>`
    if (showDamageButton){
        diceTemplate+=damageButton;
    }
    

    let modsListPrint='';
    if (modsList.length>0){
       let modsnumber=String(usemod);
        if (modsnumber>0){
            modsnumber='+'+modsnumber;
        }
        modsListPrint=`<br>Mods (`+modsnumber+`): `+modsList.join(', ');
    }

    let targetName='';
    if (useTarget){
        targetName=currentTarget.name;
    }

    let rerollTxt='';
    if (rerrolling){
        rerollTxt='<br/>Rerrolagem com uso de 1 Bene.';
        rerrolling=false;
    }

    displayOnChat(currentActor.name,diceTemplate,'ataca '+targetName+' com '+weapon.name+' ('+useSkill+')'+modsListPrint+rerollTxt);

    
   

if (showRerollButton){
    addEventListenerOnHtmlElement("#reRollButton", 'click', (e) => { 
       

        useBenny('attack');        
       
    }); 
}

    if (showDamageButton){
    addEventListenerOnHtmlElement("#rollDamageButton", 'click', (e) => { 
    
        doDamage();   
    }); 
}

    }
}

function displayOnChat(aliasName,contentText,flavorText=''){

    let chatData = {
        user: game.user._id,
        speaker: {alias:aliasName},
        content: contentText,
    flavor: flavorText
    };
    ChatMessage.create(chatData, {});

}

function doDamage(){
    let useActor=currentActor;
    let useTarget=currentTarget;
    let weapon=currentWeapon;
    let weaponDamageDice=weapon.data.data.damage;
    if (changeDamage){
        weaponDamageDice=changeDamage;
    }
    let weaponDamage=makeDamageFormula(weaponDamageDice);
    let modsList=[];
    let woundsNum;
    

    if (raise){
        weaponDamage+='+1d6x=';
    }

    let rollData=new Roll(weaponDamage).roll();
    let damageTotal=rollData.total;

    if (dmgMod){
        damageTotal=damageTotal+dmgMod;
        dmgModStr=string(dmgMod);
        if (dmgMod>0){
            dmgModStr='+'.dmgModStr;
        }
        modsList.push('Adicional: '+dmgMod);
    }


    /// mods extras
    if (theJoker){
        modsList.push('Curinga: +2');
        damageTotal=damageTotal+2;
    }

    if (manouver=='duplo'){
        modsList.push('Disparo Duplo: +1');
        damageTotal=damageTotal+1;
    }

    if (manouver=='r3b'){
        modsList.push('Rajada de 3 Balas: +2');
        damageTotal=damageTotal+2;
    }

    let damageModStr='';

    let dieSumResult=0;

    let template=`<div class="dice-tooltip"><div class="dice-rolls"><ol class="dice-rolls">`;

    for (let i=0;i<rollData.dice.length;i++){
        for (let j=0;j<rollData.dice[i].rolls.length;j++){
            let diceResult=rollData.dice[i].rolls[j].roll;
            while(rollData.dice[i].rolls[j].exploded){
                j++;
                diceResult+=rollData.dice[i].rolls[j].roll;
                
            }
            template+=`<li class="roll die d`+rollData.dice[i].faces+`" style="color:#333">`+diceResult+`</li>`;
        }
        
        dieSumResult+=rollData.dice[i].total;
    }

    let damageMod=damageTotal-dieSumResult;

    if (damageMod>0){
        damageModStr=`+`+damageMod;
    }

    template+=`<li style="line-height:24px;float:left;font-size:16px;color:#333;font-weight:bold">`+damageModStr+`=<span style="margin-left:5px;color:red">`+damageTotal+`</span></li><li style="line-height:24px;float:right;font-size:16px"><button style="background:#CCC;" id="reRollDamageButton">Rerrolar</button></li>`;


    template+=`</ol></div></div>`;

    let applyDamageButton='';

    if (useTarget){
    let armor=parseInt(useTarget.data.data.stats.toughness.armor); /// modify using AP
    if (parseInt(weapon.data.data.ap)){
        armor=armor-parseInt(weapon.data.data.ap);
        if (armor<0){
            armor=0;
        }
        modsList.push('PA: '+weapon.data.data.ap);
    }

    let targetNumber=parseInt(useTarget.data.data.stats.toughness.value)+parseInt(useTarget.data.data.stats.toughness.modifier)+armor;

    let tag=`Nenhum Dano`;
    let colortag='#666';
    
    

  

    if (damageTotal>=targetNumber){ /// calculate success/raises
        applyDamageButton=`<button id="applyDamage" style="background:red;color:white">Aplicar Dano</button>`;
        let damageAmount=damageTotal-targetNumber
        let raises=Math.floor(damageAmount/4);
        woundsNum=raises;

       

        if (raises==0){ /// success=shaken
             tag=`Abalado` 
             colortag='#0d47a1';
        } else {
            let plural=``;
            if (raises>1){
                plural=`s`;
            }
            tag=raises+` Ferimento`+plural+` + Abalado`;

            if (raises==1){
                colortag='#f44336'
            } else if (raises==2){
                colortag='#b71c1c';
            } else if (raises==3){
                colortag='#9c27b0';
            } else {
                colortag='#4a148c';
            }
            
        }

        
    }


    template+=`<div style="color:`+colortag+`;font-weight:bold;text-align:center;line-height:24px;font-size:16px;">`+tag+`</div>`;

    template+=applyDamageButton;
}

    let modsListPrint='';
    if (modsList.length>0){       
        modsListPrint=`<br>Mods: `+modsList.join(', ');
    }

    let targetName='';
    if (useTarget){
        targetName=`em `+useTarget.name;
    }

    let weaponDamageStr=weapon.data.data.damage.replace('@str','For');

    let rerollTxt='';
    if (rerrolling){
        rerollTxt='<br/>Rerrolagem com uso de 1 Bene.';
        rerrolling=false;
    }

    displayOnChat(useActor.name,template,`Dano `+targetName+` com `+weapon.name+` (`+weaponDamageStr+`)`+modsListPrint+rerollTxt);

    
    addEventListenerOnHtmlElement("#reRollDamageButton", 'click', (e) => { 
       

        useBenny('damage');        
       
    }); 
    if (applyDamageButton){
    addEventListenerOnHtmlElement("#applyDamage", 'click', (e) => { 
       
       
        applyDamage(woundsNum,e.target);        
       
    });
    }

}

function applyDamage(wounds,buttonObj){
    let useTarget=currentTarget;
    let actualWounds=useTarget.data.data.wounds.value;
    let maxWounds=useTarget.data.data.wounds.max;
    let shakenStat=useTarget.data.data.status.isShaken;
    let isWCard=useTarget.data.data.wildcard;
    let isDefeated=false;
    

    if (!wounds && shakenStat){ /// shaken + shaken = 1 wound
        
            wounds=1;
        
    }

    if (!isWCard){
        if (wounds>0) {
            tokenTarget.toggleOverlay(CONFIG.controlIcons.defeated); /// mark as defeated
            isDefeated=true;            

        }
        
    } else {
        let newWounds=actualWounds+wounds;


        if (newWounds>maxWounds){
            newWounds=maxWounds;
            tokenTarget.toggleOverlay(CONFIG.controlIcons.defeated); /// mark as defeated
            isDefeated=true;
        }
    
        useTarget.update({"data.wounds.value":newWounds});
    }   
    
    if (!isDefeated){
    useTarget.update({"data.status.isShaken":true});
    } else {
        if (shakenStat){ /// if defeated, removes shaken if shaken
            useTarget.update({"data.status.isShaken":false});
        }
    }
   

    buttonObj.innerText='Dano Aplicado';
    buttonObj.disabled=true;
    buttonObj.style.background='#CCC';
    buttonObj.style.color='red';

    /// currentTarget.toggleOverlay(CONFIG.controlIcons.defeated) /// mark defeated
    
}

function makeDamageFormula(weaponDamage){
    let regexStr = /[@]str/g;
            weaponDamage = weaponDamage.replace(regexStr, "1d" + currentActor.data.data.attributes.strength.die.sides);

            let regexDiceExplode = /d[0-9]{1,2}/g;
            weaponDamage = weaponDamage.replace(regexDiceExplode, "$&x=");

return weaponDamage;
           

}

function useBenny(reason){
    let useActor=currentActor;
    let actualBennies;
    let gmPlayer;
    let useGMBene=false;
   

   
    
    let dialogMotive;
    if (reason=='attack'){
        dialogMotive='rerrolar o ataque';
    } else if (reason=='damage') {
        dialogMotive='rerrolar o dano';
    } else if (reason=='shaken'){
        dialogMotive='sair do Abalado'
    }

    if (useActor.data.data.wildcard){
        actualBennies=parseInt(useActor.data.data.bennies.value);
        if (!useActor.isPC && actualBennies<=0){
            useGMBene=true; /// uses gm benny if it's an enemy WC and has no bennies.
        }
    } else {
        useGMBene=true;
    }

    if (useGMBene){
        gmPlayer=game.users.filter((el)=> el.isGM===true)[0];
        actualBennies=parseInt(gmPlayer.data.flags.swade.bennies);
    }

    let dialogStart='O personagem tem ';
    if (useGMBene){
        dialogStart=`O personagem não tem benes.<br> O GM tem `;
    }


let dialogTemplate='<p>'+dialogStart+actualBennies+' Benes.</p><p>Deseja gastar 1 Bene para '+dialogMotive+'?';

    if (actualBennies>0){
        new Dialog({
            title: 'Confirmação de uso de Bene',
            content: dialogTemplate,
            buttons: {
                'ok': {
                    label: `Gastar 1 Bene`,
                    callback: function () {
                        actualBennies=actualBennies-1;
                        let whoIs;
                        if (!useGMBene){
                            useActor.update({"data.bennies.value":actualBennies});    
                            whoIs=useActor.name;                       
                        } else {
                            gmPlayer.update({"flags.swade.bennies":actualBennies});   
                            whoIs='Mestre';                         
                        }

                        let motive='rerrolar';
                        if (reason=='shaken'){
                            motive='remover estado Abalado.';                        }

                        
                   //     displayOnChat(whoIs,'Gasta 1 Bene para '+motive+'.');
                        
                        if (reason=='attack' || reason=='shaken'){
                            if (reason=='shaken'){
                                stopAttack=false;
                                useActor.update({"data.status.isShaken":false});
                               // displayOnChat(useActor.name,'Gasta um bene e sai do estado Abalado.');
                            } else { //reason==attack
                               
                                countShots=false;
                                rerrolling=true;
                            }
                            
                            doAttack();
                        } else {
                           rerrolling=true;
                            doDamage();

                        }
                        
                    },
                },
                'cancel': {
                    label: `Cancelar`,
                    callback:function(){
                        return false;
                    }
                }
            }
        }).render(true);
    } else {
        new Dialog({
            title: 'Sem Benes',
            content: '<p>Você não tem Benes para rerrolar.</p>',
            buttons: {
            'ok': {
                label: 'Ok',
                callback: function(){
                    return false;
                }
            }
        }
        }).render(true);
    }
}

}
