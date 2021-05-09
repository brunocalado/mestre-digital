const euclidian = false; // true=Medida Euclidiana | false=Medida Não-Euclidiana


/* Total Distance between two tokens. 
version = 0.2
Features
- Leva em conta a altura.

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Qualquer/DistanciaEntreTokens.js
icon: icons/sundries/documents/document-symbol-circle-brown.webp
*/

// ===================================
const token1 = canvas.tokens.controlled[0];
const token2 = canvas.tokens.controlled[1];
if(!token1 || !token2) {
  ui.notifications.error("Selecione dois tokens!");
} else {
  let output;
  let output_msg;
  if (euclidian) {
    output = tokenDistance(token1, token2);
    output_msg = 'euclidiana';
  } else {
    output = tokenDistanceNonEuclidian(token1, token2);
    output_msg = 'não-euclidiana';
  }
  ChatMessage.create({
    content: `<h2>Distância</h2><p>A distância ${output_msg} entre <b>${token1.name}</b> e <b>${token2.name}</b> é <b style="color: red">${output}</b>.</p>`
  })  
}

function tokenDistance(token1, token2) {  
  const gridUnits = game.scenes.entities.filter(scene => scene.active === true)[0].data.gridUnits;
  let distance = canvas.grid.measureDistance(token1, token2);
  let tmp;
  if(token1.elevation !== token2.data.elevation) {
    let h_diff = token2.data.elevation > token1.data.elevation 
      ? token2.data.elevation - token1.data.elevation 
      : token1.data.elevation - token2.data.elevation;
    tmp = Math.sqrt(Math.pow(h_diff,2) + Math.pow(distance,2));
    return Math.round(tmp) + ' ' + gridUnits;
  } else {
    return Math.round(distance) + ' ' + gridUnits;
  }
}

function tokenDistanceNonEuclidian(token1, token2) {  
  const gridUnits = game.scenes.entities.filter(scene => scene.active === true)[0].data.gridUnits;
  const ray = new Ray(token1, token2);
  const segments = [{ray}];
  let distance = canvas.grid.measureDistances(segments,{gridSpaces:true})[0]

  const heightDelta = Math.abs(token1.data.elevation - token2.data.elevation);
      
  distance = Math.max(distance, heightDelta);    
  return distance + ' ' + gridUnits;
  //ui.notifications.info(`${dist} ft apart`)  
}