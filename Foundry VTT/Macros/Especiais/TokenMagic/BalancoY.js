const variaParaCima = +0.15;  // quanto se move para cima
const variaParaBaixo = -0.15; // quanto se move para baixo
const velocidade = 5500;      // quanto maior, mais lenta a animação

// ------------------------------------------------
const params =
    [{
        filterType: "transform",
        filterId: "myTransform",
        padding: 30,
        animated:
        {
            translationY: {
                animType: "sinOscillation",
                val1: variaParaBaixo,
                val2: variaParaCima,
                loopDuration: 5500
            }           
        }
    }];

(async () => { 
  await TokenMagic.deleteFiltersOnSelected(); // Delete all filters on the selected tokens/tiles
  await TokenMagic.addUpdateFiltersOnSelected(params); //aplica
})()