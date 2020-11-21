const velocidadeX = 4400;       // quanto maior, mais lenta a animação no eixo X
const velocidadeY = 4400;       // quanto maior, mais lenta a animação no eixo Y
const variaParaEsquerdaX = +0.1;    // quanto se move para a esquerda no eixo X
const variaParaDireitaX = -0.1;   // quanto se move para a direita no eixo X
const variaParaCimaY = +0.035;  // quanto se move para cima no eixo Y
const variaParaBaixoY = -0.035; // quanto se move para baixo no eixo Y

// ------------------------------------------------
const params = [{
        filterType: "transform",
        filterId: "dodgeStance",
        padding: 50,
        animated:
        {
            translationX:
            {
                animType: "sinOscillation",
                val1: variaParaDireitaX,
                val2: variaParaEsquerdaX,
                loopDuration: velocidadeX,
            },
            translationY:
            {
                animType: "cosOscillation",
                val1: variaParaBaixoY,
                val2: variaParaCimaY,
                loopDuration: velocidadeY,
            }
        }
}];

(async () => { 
  await TokenMagic.deleteFiltersOnSelected(); // Delete all filters on the selected tokens/tiles
  await TokenMagic.addUpdateFiltersOnSelected(params); //aplica
})()
