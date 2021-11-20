// OBRIGATÓRIO ATIVAR O MÓDULO DICE SO NICE

// CONFIGURAÇÕES
let dice = 1; // coloque a quantidade de dados que deseja usar
const volumeDoSom = 0.7;
const sorte = true; // true: ativa sorte || false: desativa a sorte
const secreto = false; // true: rolagem é secreta para o mestre || false: todos veem a rolagem
const chatImagem = 'https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp'; 
const som = 'https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/Zombie_Eating.mp3'; // coloque false para não tocar nada

// ---------------------------------------------------------------
// NÃO MEXA COM O QUE ESTÁ ABAIXO
const macroVersion = 'v1.2';
/* Terra Devastada
## Features
- dice so nice
- onde em 1D6 contam os pares como sucessos e o número 6 do dado explode!

## TESTAR
const r = new Roll('1d8').evaluate();
game.dice3d.showForRoll(r);

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Sistemas%20Diversos/TerraDevastada.webp
*/

(async () => {  
  let truedice = dice;
  let sucessos=0;
  let sucessossorte=0;
  let roll3d;
  let roll;
  let message = '';
  let explosoes=0;
  let sortedice = 1;
  let rolagens = [];
  let rolagens3D = [];
  let rolagenssorte = [];
  let rolagens3Dsorte = [];
  let chatData; 
  
  for (var i = 0; i < truedice; i++) {
    roll3d = new Roll('1d6').roll({ async : false });    
    await roll3d.toMessage(); //rola o 3d
    roll = roll3d.total;
    rolagens.push(roll);
    rolagens3D.push(roll3d);
    
    if(roll==2 || roll==4 || roll==6){
      sucessos+=1;
      if(roll==6){
        truedice+=1;
        explosoes+=1;
      }
    }    
  } // fim for

  if (sorte) {
    for (var i = 0; i<sortedice; i++) {
      roll3d = new Roll('1d6').roll({ async : false });    
      await roll3d.toMessage(); //rola o 3d
      roll = roll3d.total;
      rolagenssorte.push(roll);
      rolagens3D.push(roll3d);

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
<td><img style="vertical-align:middle" src=${chatImagem} width="32" height="32"></td>
<td><h2 style="color:Red">Terra Devastada</h2></td>
</tr>
</tbody>
</table>`;  
  message+=`<p>Você rolou ${dice} dado(s), e teve <b style="color:Blue">${explosoes}</b> explosões.</p>`;
  
  message+=`<h3>Rolagens</h3>`;
  message+=`<p>Você teve <b style="color:Red">${sucessos}</b> sucesso(s).</p>`;  
  message+=`<p style="background-color: lightgray; text-align: center;"><b>${rolagens.join()}</b></p>`;
  
  if (sorte) {
    message+=`<h3>Sorte</h3>`;
    message+=`<p>Sua <b style="color:Green">sorte</b> foi <b style="color:Red">${sucessossorte}</b> sucesso(s).</p>`;
    message+=`<p style="background-color: lightgray; text-align: center;"><b>${rolagenssorte.join()}</b></p>`;
    message+=`<h3>Total</h3>`;
    message+=`<p style="background-color: lightgray;">Seu total de sucessos é de <b style="color:Red">${sucessos+sucessossorte}</b> sucesso(s).</p>`;
  }

  if (secreto) {
    chatData = {
      content: message,
      whisper : ChatMessage.getWhisperRecipients("GM")
    };     
  } else {
    chatData = {
      content: message      
    };     
  } 
  
  if (som) {
    AudioHelper.play({src: som, volume: volumeDoSom, autoplay: true, loop: false}, true);
  }
  
  ChatMessage.create(chatData, {});  
  /*
  for (var i = 0; i<rolagens3D.length; i++) {    
    let tempChatData = {
      roll: rolagens3D[i],
      rollMode: game.settings.get("core", "rollMode"),
      content: `<p>Normal: ${rolagens3D[i].total}</p>`
    };     
    ChatMessage.create(tempChatData);  
  }

  for (var i = 0; i<rolagens3Dsorte.length; i++) {    
    let tempChatData = {
      roll: rolagens3Dsorte[i],
      rollMode: game.settings.get("core", "rollMode"),      
      content: `<p>Sorte: ${rolagens3D[i].total}</p>`
    };     
    ChatMessage.create(tempChatData);  
  }  
*/
})(); // fim async


