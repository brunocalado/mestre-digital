/* Atallho para Rolagem Simples v1.1
Features
- Roll exploding dice
- You can add the Wild Die
- Multi roll
- Target number
- Modifier
Updates: https://github.com/brunocalado/mestre-digital/blob/master/Foundry%20VTT/Macros/Savage%20Worlds/Atallho%20para%20Rolagem%20Simples.js
Bruno Calado/Felipe Figueiredo
*/

getRequirements();

function getRequirements() {
  let template = `
  <h2>Dados</h2>  
  <table style="width:100%">
  <tr>
    <td><input type="radio" id="d4" name="dice" value="d4"><label for="d4">D4</label></td>
    <td><input type="radio" id="d6" name="dice" value="d6" checked="checked><label for="d6">d6</label></td>
    <td><input type="radio" id="d8" name="dice" value="d8"><label for="d8">d8</label></td>
    <td><input type="radio" id="d10" name="dice" value="d10"><label for="d10">d10</label></td>
    <td><input type="radio" id="d12" name="dice" value="d12"><label for="d12">D12</label></td>
  </tr>
  </table>  
  </br>
  <h2>Opções</h2>
  <table style="width:100%">
  <tr>
    <td>Modificador: <input id="modificador" type="number" min="-20" max="20" style="width: 50px" value=0></td>
    <td>Número Alvo: <input id="targetnum" type="number" min="0" max="100" style="width: 50px" value=4></td>      
    <td>Repetir: <input id="repetir" type="number" min="-20" max="20" style="width: 50px" value=1></td>          
  </tr>
  </table>  
  <p>
    <input type="checkbox" id="wilddie" checked/>Carta Selvagem?
    <input type="checkbox" id="nicedice" checked/>Dados 3D?
  </p>  
  <br />
  `;
  new Dialog({
    title: "SWADE Dice",
    content: template,
    buttons: {
      ok: {
        label: "Roll!",
        callback: async (html) => {
          makeTiles(html);
        },
      }
    },
  }).render(true);
}

async function makeTiles(html) {
  const dice=html.find('input[name="dice"]:checked').val();
  let isWCard=html.find("#wilddie")[0].checked;
  let isNiceDice=html.find("#nicedice")[0].checked;
  let targetNumber=parseInt(html.find("#targetnum")[0].value);
  let repeat=parseInt(html.find("#repetir")[0].value);
  let modificador=Number(html.find("#modificador")[0].value);
  let contentText=``;
  let flavor=dice;    
    
  if (modificador) {
      let modificadorStr=String(modificador);
      if (modificador>0){
          modificadorStr='+'+modificadorStr;
      }
      flavor+=modificadorStr;      
  }

  if (isWCard){
      flavor+=` (CS)`
  }

  flavor+=' Número Alvo:'+String(targetNumber);  
  
  for(let i=1;i<=repeat;i++) {     
      contentText+=resultInfo(dice, targetNumber, modificador, isWCard, isNiceDice);
  }
  
  let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: contentText,
      flavor: flavor
  };
  ChatMessage.create(chatData, {});    
}

function resultInfo(mainDie, targetNumber, modifier=0, isWCard=true, niceDice, wilddie='d6') { 
    let mainDieResultNice=new Roll(mainDie+'x=').roll();
    let mainDieResult=mainDieResultNice.total;
    let wilddieResultNice=new Roll(wilddie+'x=').roll();
    let wilddieResult=wilddieResultNice.total;
    let textColor='grey';
    let mainDieColor='#666';
    let wilddieColor='#666';
    let tag='Falha';
    let criticalFailure=false;
    let showWildDie=false;
    let raise=false;
    let contentText=``;
    let finalMainDieResult;
    let finalWilddieResult;
    let finalResult;

    // Dice so Nice
    if (niceDice) {
      mainDieResultNice.toMessage();
      wilddieResultNice.toMessage();
    }

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
        
        if (!isWCard){
           showWildDie=true;
        }

        criticalFailure=true;
        finalMainDieResult=1;
        finalWilddieResult=1;
        finalResult=1;
   }   

   if (!criticalFailure){
    finalMainDieResult=mainDieResult+modifier;
    finalWilddieResult=0;
    finalResult=finalMainDieResult;
    
    if (isWCard){   
         finalWilddieResult=wilddieResult+modifier;
         finalResult=Math.max(finalWilddieResult,finalMainDieResult);
    }    

    if (finalMainDieResult>=targetNumber || finalWilddieResult>=targetNumber) {        
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
            
            let raiseNum=Math.floor(finalResult/4);
            let wordAmp='Ampliação';
            if (raiseNum>1){
                wordAmp='Ampliações';
            } 
            tag=raiseNum+' '+wordAmp;
            textColor='purple';
            
        } else {
            tag='Sucesso!';
            textColor='green';
        }
 
    

    }
   }

   contentText+=`<div class="dice-tooltip"><div class="dice-rolls"><ol class="dice-rolls"><li class="roll die `+mainDie+`" style="color:`+mainDieColor+`">`+finalMainDieResult+`</li>`;

    if (showWildDie){
        contentText+=`<li class="roll die `+wilddie+`" style="color:`+wilddieColor+`">`+finalWilddieResult+`</li>`
    }

    contentText+=`<li style="line-height:24px;float:left;font-size:16px;color:`+textColor+`;font-weight:bold;margin-left:10px">`+tag+`</li>`;

    contentText+=`</ol></div></div>`;


    return contentText;


}