//onde em 1D6 contam os pares como sucessos e o número 6 do dado explode!

const macroVersion = 'v0.5';
/* Terra Devastada
## Features
- dice so nice

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp
*/
let dice = 1; // coloque a quantidade de dados que deseja usar
const sorte = true;

(async () => {  
  let truedice = dice;
  let sucessos=0;
  let sucessossorte=0;
  let roll3d;
  let roll;
  let message = '';
  let explosoes=0;
  let sortedice = 1;
  
  for (var i = 0; i < truedice; i++) {
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

  if (sorte) {
    for (var i = 0; i <sortedice; i++) {      
      roll3d = new Roll('1d6').roll();    
      game.dice3d.showForRoll(roll3d);      
      roll = roll3d.total;
      
      if(roll==6){
        sucessossorte+=1;
        if(roll==6){
          sortedice+=1;          
        }
      }    
    } // fim for
  }

  message += `<table>
<tbody>
<tr>
<td><img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp" width="32" height="32"></td>
<td><h2 style="color:Red">Terra Devastada</h2></td>
</tr>
</tbody>
</table>`;  
  message+=`<p>Você rolou ${dice} dado(s), e teve <b style="color:Blue">${explosoes}</b> explosões.</p>`;
  message+=`<p>Você teve <b style="color:Red">${sucessos}</b> sucesso(s).</p>`;
  if (sorte) {
    message+=`<p>Sua <b style="color:Green">sorte</b> foi <b style="color:Red">${sucessossorte}</b> sucesso(s).</p>`;
    message+=`<p style="background-color: lightgray;">Seu total de sucessos é de <b style="color:Red">${sucessos+sucessossorte}</b> sucesso(s).</p>`;
  }
  
  let chatData = {
    user: game.user._id,    
    content: message,
    whisper : ChatMessage.getWhisperRecipients("GM")
  };  
  ChatMessage.create(chatData, {});  

})(); // fim async