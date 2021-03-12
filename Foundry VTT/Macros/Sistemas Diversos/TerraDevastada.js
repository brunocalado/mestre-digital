//onde em 1D6 contam os pares como sucessos e o número 6 do dado explode!

const macroVersion = 'v0.3';
/* Terra Devastada
## Features
- dice so nice

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp
*/
let dice = 1; // coloque a quantidade de dados que deseja usar

(async () => {  
  let truedice = dice;
  let sucessos=0;
  let roll3d;
  let roll;
  let message = '';
  let explosoes=0;
  
  for (var i = 0; i < truedice; i++) {
    console.log(i);
    roll3d = new Roll('1d6').roll();    
    game.dice3d.showForRoll(roll3d);      
    roll = roll3d.total;
    
    if(roll==2 || roll==4 || roll==6){
      sucessos+=1;
      if(roll==6){
        truedice+=1;
        explosoes+=1;
      }
    }
    
  } // fim for

  message+=`<h2 style="color:Red">Terra Devastada</h2>`;  
  message+=`<p>Você rolou ${dice} dado(s), e teve <b style="color:Blue">${explosoes}</b> explosões.</p>`;
  message += `<table>
<tbody>
<tr>
<td><img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp" width="32" height="32"></td>
<td><p>Você teve <b style="color:Red">${sucessos}</b> sucessos.</p></td>
</tr>
</tbody>
</table>`;

  let chatData = {
    user: game.user._id,    
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  

})(); // fim async