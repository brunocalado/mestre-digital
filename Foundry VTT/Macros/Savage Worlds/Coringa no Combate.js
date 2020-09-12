/* Coringa no Combate v1.0
EN: Gives 1 benny to all PCs or 1 benny to all Wild Card NPCs and the GM
BR: Distribui 1 bene para os PC ou 1 bene para os NPCs carta slvagem e para o mestre.
https://gitlab.com/lipefl/foundrymacros/-/raw/master/macros/CuringaSelvagem.js

Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Coringa%20no%20Combate.svg
*/

let actualCombatants=game.combat.turns;
let checkJoker=actualCombatants.find(el=>el.flags.swade.hasJoker==true);

if (checkJoker!==undefined) { /// a joker has been drawn
  let theJoker=checkJoker.actor;
  let howMany=0;
  let gmJoker=false; ///PC - all players get a benny

  if (!theJoker.isPC){ /// NPC - GM gets a benny and each NonPC-WC
      gmJoker=true;
  } 

  for (let i=0;i<actualCombatants.length;i++) {
    let checkActor=actualCombatants[i].actor;
    let giveBenny=false;
    if (gmJoker) {
      if (!checkActor.isPC && checkActor.data.data.wildcard) { /// give npc wildcard a benny
          giveBenny=true;
      }
    } else {
      if (checkActor.isPC) { /// give pc a benny                
          giveBenny=true;
      }
    }

    if (giveBenny) {
      howMany++;
      let actualBennies=parseInt(checkActor.data.data.bennies.value);
      actualBennies++;
      checkActor.update({"data.bennies.value":actualBennies});
    }       
  }

  if(gmJoker){ /// also give gm a benny
      let gmPlayer=game.users.filter((el)=> el.isGM===true)[0];
      let actualBennies=parseInt(gmPlayer.data.flags.swade.bennies);
      actualBennies++;
      gmPlayer.update({"flags.swade.bennies":actualBennies})
  }

  let contentText='<div style="font-style:strong">Benes entregues:</div>';    
  
  if (gmJoker) {
      contentText+='<div><strong>Inimigos:</strong> '+howMany+'</div>';
      contentText+='<div><strong>Mestre:</strong> 1</div>';
  } else {
      contentText+='<p>Personagens: '+howMany+'</p>';
  }

  let chatData = {
      user: game.user._id,
      speaker: {alias:"O Curinga"},
      content: contentText
  };
  ChatMessage.create(chatData, {});

} else {
  ui.notifications.warn("Nenhum Curinga foi sacado no combate atual.");    
}    