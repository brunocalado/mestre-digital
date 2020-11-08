// Coloque os valores aqui que podem ser apenas: -3 -2 -1 0 1 2 3
const vontade = 0;
const fortitude = -1;
const reflexos = 2;
const razao = 0;
const intuicao = 0;
const percepcao = 0;
const firmeza = 0;
const violencia = 0;
const carisma = 0;
const alma = 0;
// =============================================

const macroVersion = 'v0.1';
/* Kult Moves
## Features
- 

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/KultMoves.js
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/kult_moves_icon.png
*/

main();

function main() {  
  let template = `  
    <style type="text/css">
      div.purpleHorizon {
        border: 4px solid #ff0000;
        background-color: #000000;
        width: 100%;
        text-align: center;
        border-collapse: collapse;
      }
      .divTable.purpleHorizon .divTableCell, .divTable.purpleHorizon .divTableHead {
        border: 0px solid #550000;
        padding: 5px 2px;
      }
      .divTable.purpleHorizon .divTableBody .divTableCell {
        font-size: 13px;
        font-weight: bold;
        color: #FFFFFF;
      }
      
      .divTable{ display: table; }
      .divTableRow { display: table-row; }
      .divTableHeading { display: table-header-group;}
      .divTableCell, .divTableHead { display: table-cell;}
      .divTableHeading { display: table-header-group;}
      .divTableFoot { display: table-footer-group;}
      .divTableBody { display: table-row-group;}

      /* HIDE RADIO */
      [type=radio] { 
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      }

      /* IMAGE STYLES */
      [type=radio] + img {
      cursor: pointer;
      }

      /* CHECKED STYLES */
      [type=radio]:checked + img {
      outline: 2px solid #f00;
      }
      
      .container {
        position: relative;
        text-align: center;
        color: white;
      }
      /* Centered text */
      .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }    

      #kultcss .window-content {    
        background: #000000;
      }     
      #kultcss .dialog-button {
        height: 40px;
        background: #000000;
        color: #ffffff;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
        border: none;    
      }  
      #kultcss header {
        background: #000000;
        border-radius: 0;    
        border: none;    
        margin-bottom: 2px;
        font-size: .75rem;
      }
    </style>    
    
    <div class="divTable purpleHorizon">
    <div class="divTableBody">
    
    <div class="divTableRow">
    <div class="divTableCell"></div>
    <div class="divTableCell">      
      <label>        
        <div class="container">
          <input type="radio" id="attribute" name="attribute" value="vontade"/ checked>
          <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/001.png" width="48" height="48">
          <div class="centered">${formatAttribute(vontade)}</div>
        </div>
        Vontade
      </label>      
    </div>    
    <div class="divTableCell"></div>
    </div>
    <div class="divTableRow">
      <div class="divTableCell">      
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="fortitude"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/002.png" width="48" height="48">  
            <div class="centered">${formatAttribute(fortitude)}</div>
          </div>
          Fortitude
        </label>       
      </div>
      <div class="divTableCell"></div>
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="reflexos"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/003.png" width="48" height="48">  
            <div class="centered">${formatAttribute(reflexos)}</div>
          </div>
          Reflexos
        </label>
      </div>
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="razao"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/004.png" width="48" height="48">  
            <div class="centered">${formatAttribute(razao)}</div>
          </div>
          Razão
        </label>      
      </div>
      
      <div class="divTableCell"></div>
      
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="intuicao"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/005.png" width="48" height="48">  
            <div class="centered">${formatAttribute(intuicao)}</div>
          </div>
          Intuição
        </label>          
      </div>
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell"></div>
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="percepcao"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/006.png" width="48" height="48">  
            <div class="centered">${formatAttribute(percepcao)}</div>
          </div>
          Percepção
        </label>           
      </div>
      <div class="divTableCell"></div>
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="firmeza"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/007.png" width="48" height="48">  
            <div class="centered">${formatAttribute(firmeza)}</div>
          </div>
          Firmeza
        </label>        
      </div>
      <div class="divTableCell"></div>
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="violencia"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/008.png" width="48" height="48">  
            <div class="centered">${formatAttribute(violencia)}</div>
          </div>
          Violência
        </label>           
      </div>
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell"></div>
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="carisma"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/009.png" width="48" height="48">  
            <div class="centered">${formatAttribute(carisma)}</div>
          </div>
          Carisma
        </label>        
      </div>
      <div class="divTableCell"></div>
    </div>
    
    <div class="divTableRow">
      <div class="divTableCell"></div>
      <div class="divTableCell">
        <label>
          <div class="container">
            <input type="radio" id="attribute" name="attribute" value="alma"/>                
            <img style="vertical-align:middle" src="https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Kult/icons/010.png" width="48" height="48">  
            <div class="centered">${formatAttribute(alma)}</div>
          </div>
          Alma
        </label>      
      </div>
      <div class="divTableCell">
        <p>Modificador</p>
        <input id="modificador" type="number" min="-10" max="10" style="width: 80px; box-sizing: border-box;border: none;background-color: #ff0000;color: white; text-align: center;" value=0>
      </div>
    </div>
    
    </div>
    </div>
  `;
  
  new Dialog({
    title: `Kult - ${macroVersion}`,
    content: template,
    buttons: {
      ok: {
        label: "Rolar",
        callback: async (html) => {
          coinmanager(html);
        },
      },
      cancel: {
        label: "Cancelar",
      }
    },
    default: "ok"
  }, { id: 'kultcss'}).render(true);
}

async function coinmanager(html){
  const attribute = html.find('input[name="attribute"]:checked').val();  
  const modificador = parseInt( html.find("#modificador")[0].value );    
  let dice;

  
  console.log('-------------------------');
  console.log(attribute);
  console.log(modificador);
  console.log('-------------------------');
  
  // realiza rolagem
  dice = diceRoll(attribute, modificador);  
  
  // envia mensagem para o chat
  chatMessage(dice, attribute);
}

function diceRoll(attribute, modificador) {
  let value = {'vontade': vontade, 'fortitude': fortitude, 'reflexos': reflexos, 'razao': razao, 'intuicao': intuicao, 'percepcao': percepcao, 'firmeza': firmeza, 'violencia': violencia, 'carisma': carisma, 'alma': alma};    

  return new Roll('2d10+' + value[attribute] + '+' + modificador).roll();
}

function chatMessage(dice, attribute) {
  let message = `<h2></h2>`;  
  
  message += resultados(dice, attribute);
  
  dice.toMessage({flavor: message});                  
}

function resultados(dice, attribute) {
  let total = dice.total;
  let msg = ``;
  if (attribute=='carisma') {
    msg+=`<h2>Influenciar Alguém</h2>`
   if (total>=15) {
     msg+=`<h3><b>Influenciar um PNJ</b></h3><p>Ele faz o que você pede</p>`;
     msg+=`<h3><b>Influenciar outro PJ</b></h3><p>Ambas as opções abaixo.</p>     
     <ul>
     <li>Ele está motivado a fazer o que você pediu, e recebe +1 em sua próxima jogada, se ele fizer isto.</li>
     <li>Ele se preocupa com as consequências de não fazer o que você pediu, e recebe –1 de Estabilidade se ele não fizer isto.</li>
     </ul>
     `;
   } else if (total>=10 && total<=14) {
     msg+=`<h3>Influenciar um PNJ</h3><p>Ele faz o que você pede, mas a MJ escolhe uma:</p>`;
     msg+=`
     <ul>
     <li>Ele exige uma compensação melhor.</li>
     <li>Complicações vão surgir no futuro.</li>
     <li>Ele cede neste momento, mas vai mudar de ideia e se arrepender disso depois.</li>
     </ul>`;
     msg+=`<h3>Influenciar outro PJ</h3><p>Somente uma opção abaixo.</p>     
     <ul>
     <li>Ele está motivado a fazer o que você pediu, e recebe +1 em sua próxima jogada, se ele fizer isto.</li>
     <li>Ele se preocupa com as consequências de não fazer o que você pediu, e recebe –1 de Estabilidade se ele não fizer isto.</li>
     </ul>
     `;
   } else {
     msg+=`<h3>Influenciar um PNJ</h3><p>Sua tentativa tem repercussões não planejadas. A MJ faz um Movimento.</p>`;
     msg+=`<h3>Influenciar outro PJ</h3><p>O personagem recebe +1 em sua próxima rolagem contra você. A MJ faz um Movimento</p>`;
   }     
  }
  if (attribute=='reflexos') {
    msg+=`<h2>Evitar Dano</h2>`
   if (total>=15) {
     msg+=`<p>Você sai completamente ileso.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você evita o pior, mas a MJ decide se você acaba em uma situação ruim, perde algo ou sofre Dano parcial.</p>`;
   } else {
     msg+=`<p>Você foi muito lento para reagir ou você tomou uma decisão errada. Talvez você não tenha evitado nenhum Dano, ou acabou em uma posição ainda pior do que antes. A MJ faz um Movimento.</p>`;
   }     
  }  
  if (attribute=='fortitude') {
    msg+=`<h2>Evitar Dano</h2>`
   if (total>=15) {
     msg+=`<p>Você engole a dor e segue em frente.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você ainda está de pé, mas a MJ escolhe uma condição:</p>     
     <ul>
     <li>A lesão te deixa desnorteada.</li>
     <li>Você perde alguma coisa.</li>
     <li>Você recebe um Ferimento Grave.</li>     
     </ul>
     `;     
   } else {
     msg+=`<p>A lesão é grande demais. Você escolhe se você:</p>     
     <ul>
     <li>É nocauteada (a MJ também pode escolher infligir um Ferimento Grave).</li>
     <li>Recebe um Ferimento Crítico, mas ainda continua agindo (se você já possuir um Ferimento Crítico você não pode escolher essa opção novamente).</li>
     <li>Morre.</li>     
     </ul>
     `;
   }     
  }  
  if (attribute=='vontade') {
    msg+=`<h2>Manter o Controle</h2>`
   if (total>=15) {
     msg+=`<p>Você cerra os dentes e segue em frente.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>O esforço para resistir causa uma condição, que permanece com você até que tenha um tempo para se recuperar. Você recebe −1 em situações em que esta condição seria um obstáculo para você. Escolha uma:</p>     
     <ul>
     <li>Você fica irritada (–1 de Estabilidade).</li>
     <li>Você fica triste (–1 de Estabilidade).</li>
     <li>Você fica assustada (–1 de Estabilidade).</li>     
     <li>Você fica cheia de culpa (–1 de Estabilidade).</li>     
     <li>Você fica obcecada (+1 de Relação para o que causou esta condição).</li>     
     <li>Você fica distraída (–2 em situações em que essa condição te limitar).</li>     
     <li>Você será assombrada por esta experiência mais tarde.</li>     
     </ul>
     `;     
   } else {
     msg+=`<p>A tensão é demais para a sua mente suportar. A MJ escolhe a sua reação: encolher-se impotente na presença da ameaça, entrar em pânico sem controle de suas ações, sofrer trauma emocional (–2 de Estabilidade), ou sofrer um trauma que muda sua vida (−4 de Estabilidade).</p>`;
   }     
  }

  if (attribute=='firmeza') {
    msg+=`<h2>Agir sob Pressão</h2>`
   if (total>=15) {
     msg+=`<p>Você faz o que pretendia.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você consegue fazer, mas hesita, fica atrasado ou precisa lidar com uma complicação — a MJ revela uma consequência inesperada, um preço alto, ou uma escolha difícil.`;
   } else {
     msg+=`<p>Há graves conseqüências, você comete um erro, ou fica exposto ao perigo. A MJ faz um Movimento.</p>`;
   }     
  }
  
  if (attribute=='violencia') {
    msg+=`<h2>Engajar em Combate</h2>`
   if (total>=15) {
     msg+=`<p>Você inflige dano em seu oponente e evita contra-ataques.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você inflige dano, mas com um custo. A MJ escolhe um destes:</p>
     <ul>
       <li>Você está sujeito a um contra-ataque.</li>
       <li>Você causa menos dano do o que pretendido.</li>
       <li>Você perde algo importante.</li>
       <li>Você gasta toda a sua munição.</li>
       <li>Você é confrontado por uma nova ameaça.</li>
       <li>Você estará em apuros mais tarde.</li>
     </ul>     
     `;
   } else {
     msg+=`<p>Seu ataque não ocorre como planejado. Você pode ter ficado sujeito ao azar, errado seu alvo ou pago um preço alto pelo seu ataque. A MJ faz um Movimento.</p>`;
   }     
  }
  
  if (attribute=='alma') {
    msg+=`<h2>Ver Através da Ilusão</h2>`
   if (total>=15) {
     msg+=`<p>Você vê as coisas como elas realmente são.</p>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você vê a Realidade, mas você também afeta a Ilusão. A MJ escolhe um:</p>
     <ul>
       <li>Alguma coisa percebe você.</li>
       <li>A Ilusão é rasgada ao seu redor.</li>
     </ul>`;
   } else {
     msg+=`<p>A MJ explica o que você vê e faz um Movimento.</p>`;
   }     
  }
  
  if (attribute=='intuicao') {
    msg+=`<h2>Ler uma Pessoa</h2>`
   if (total>=15) {
     msg+=`<p>Você pode fazer duas perguntas.</p>
     <ul>
       <li>Você está mentindo?</li>
       <li>Como você se sente agora?</li>
       <li>O que você pretende fazer?</li>
       <li>O que você gostaria que eu fizesse?</li>
       <li>Como eu poderia fazer você [...]?</li>
     </ul>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você pode fazer uma pergunta.</p>
     <ul>
       <li>Você está mentindo?</li>
       <li>Como você se sente agora?</li>
       <li>O que você pretende fazer?</li>
       <li>O que você gostaria que eu fizesse?</li>
       <li>Como eu poderia fazer você [...]?</li>
     </ul>`;
   } else {
     msg+=`<p>Você acidentalmente revela suas intenções reais para a pessoa você está tentando ler. Diga à MJ/jogador quais são essas intenções. A MJ faz um Movimento.</p>`;
   }     
  }
  
  if (attribute=='percepcao') {
    msg+=`<h2>Observar uma Situação</h2>`
   if (total>=15) {
     msg+=`<p>Faça duas perguntas.</p>
     <ul>
       <li>Qual é a melhor forma de lidar com isso?</li>
       <li>Qual é a maior ameaça no momento?</li>
       <li>O que eu posso usar a meu favor?</li>
       <li>Em que eu preciso prestar atenção?</li>
       <li>O que está sendo escondido de mim?</li>
       <li>O que parece ser estranho sobre isso?</li>
     </ul>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Faça uma pergunta.</p>
     <ul>
       <li>Qual é a melhor forma de lidar com isso?</li>
       <li>Qual é a maior ameaça no momento?</li>
       <li>O que eu posso usar a meu favor?</li>
       <li>Em que eu preciso prestar atenção?</li>
       <li>O que está sendo escondido de mim?</li>
       <li>O que parece ser estranho sobre isso?</li>
     </ul>`;
   } else {
     msg+=`<p>Você pode fazer uma pergunta mesmo assim, mas você não ganha nenhum bônus por isso, e perde alguma coisa, atrai atenção indesejada ou se expõe ao perigo. A MJ faz um Movimento.</p>`;
   }     
  }
  
  if (attribute=='razao') {
    msg+=`<h2>Investigar</h2>`
   if (total>=15) {
     msg+=`<p>Faça duas perguntas.</p>
     <ul>
       <li>Como posso saber mais sobre o que estou investigando?</li>
       <li>O que meu instinto diz sobre o que estou investigando?</li>
       <li>Há algo estranho sobre o que estou investigando?</li>
     </ul>`;
   } else if (total>=10 && total<=14) {
     msg+=`<p>Você pode fazer uma pergunta. A informação tem um custo, determinado pela MJ, como precisar de alguém ou alguma coisa para obter respostas, expor-se ao perigo, ou precisar gastar tempo ou recursos extras. Você fará o que for necessário?</p>
     <ul>
       <li>Como posso saber mais sobre o que estou investigando?</li>
       <li>O que meu instinto diz sobre o que estou investigando?</li>
       <li>Há algo estranho sobre o que estou investigando?</li>
     </ul>`;
   } else {
     msg+=`<p>Você pode obter alguma informação mesmo assim, mas você vai pagar um preço por isso. Você pode ficar exposto a perigos ou custos. A MJ faz um Movimento.</p>`;
   }     
  }

  return msg;
}

function formatAttribute(val) {
  if (val==3) {
    return '+3';
  } else if (val==2) {
    return '+2';
  } else if (val==1) {
    return '+1';
  } else {
    return val;
  }
}
