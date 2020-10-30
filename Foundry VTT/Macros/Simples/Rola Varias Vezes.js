let bonus = 5;
let roladas = 20;
let resultado = '';

for(let i=1;i<=roladas;i++) {       
  let temproll = new Roll('1d20').roll().total;
  if (temproll==20) {
    resultado += `<p style="color:red">${i}: ${temproll} + ${bonus} = ${bonus+temproll} </p>`;
  } else if (temproll==1) {
    resultado += `<p style="color:green">${i}: ${temproll} + ${bonus} = ${bonus+temproll} </p>`;
  } else {
    resultado += `<p>${i}: ${temproll} + ${bonus} = ${bonus+temproll} </p>`;
  }
  
}


let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: resultado,
    flavor: `<h2>Resultado</h2>`
};
ChatMessage.create(chatData, {}); 

