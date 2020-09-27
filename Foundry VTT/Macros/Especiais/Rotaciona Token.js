/* Select Token by Name - v1.0
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Especiais/Rotaciona%20Token.js
*/
let tokenName = 'Controller'; // Controller name | nome do controlador 
let tokenRotationStep = 45; // Rotation Step | Quantos graus o tile deve ser rotacionado

(async () => {
  let tokenPivot = canvas.tokens.children[0].children.filter(t => t.name === tokenName)[0];
  let tokenRotation = parseInt(tokenPivot.data.rotation);

  // 
  if (tokenRotation>=360) {
    await tokenPivot.update({"rotation": tokenRotationStep});
  } else {
    await tokenPivot.update({"rotation": tokenRotation+tokenRotationStep});
  }
  console.log(tokenPivot.data.rotation);
})();