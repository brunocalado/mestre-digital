/* Hulk - v1.0
- Troca tamanho do Token, Tocar som, Acender luz, Trocar arte

sound: 
icon: 
source: 
*/
const imagemFormaNormal = 'macros-md/zombie_normal.png';
const imagemFormaGrande = 'macros-md/zombie_grande.png';
const somDeBravo = 'https://audio.jukehost.co.uk/milBdnL2u2GOGnIx9Dx3kt1JqsyAnfch';
const myToken = canvas.tokens.controlled[0];


if (myToken) { 
  main(); 
} else {
  ui.notifications.warn("Seleciona um token!");
}

async function main() {

  // Desliga
  if ( myToken.document.data.img==imagemFormaGrande ) {
    await myToken.document.update({
      img: imagemFormaNormal,
      light: {
        bright: 0
      },
      "height": 1, 
      "width": 1
    });
  } else { // liga
    await myToken.document.update({
      img: imagemFormaGrande,
      "height": 3, 
      "width": 3,
      light: {
        color: '#0cb300',
        bright: 3,
        animation: {
          type: 'ghost'
        }
      }      
    });

    AudioHelper.play({src: somDeBravo, volume: 0.5, autoplay: true, loop: false}, true); // Toca o som
  }

}
