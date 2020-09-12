/* Verifica Ficha - 1.1
BR: Conta uso de Perícias, Vantagens, Complicações, Atributos. Verifica se vantagem tem o Estágio Atendido.
EN: Check Skills, Edges, Hidrances, Attributes. Check edge Advance requirement.
Fonte: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Verifica%20Ficha.js

Icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Savage%20Worlds/Verifica%20Ficha.svg

TODO
- attributes requirement for edge
*/

if (!actor) {
  /* get selected token */
  ui.notifications.warn(`Selecione um token!`);
} else {  
  const untrainedSkillName = ['Sem Perícia', 'Sem Pericia', 'Destreinado', 'Untrained'];  
  const rankNameNovice = ['Novice', 'Novato'];  
  const rankNameSeasoned = ['Experiente', 'Seasoned'];  
  const rankNameVeteran = ['Veteran', 'Veterano'];  
  const rankNameHeroic = ['Heroic', 'Heroico', 'Heroíco'];  
  const rankNameLegendary = ['Legendary', 'Lendario', 'Lendário'];    
  let persona = canvas.tokens.controlled[0].actor;
  let attrPerson = [];
  attrPerson['agility'] = parseInt(persona.data.data.attributes.agility.die.sides);
  attrPerson['spirit'] = parseInt(persona.data.data.attributes.spirit.die.sides);
  attrPerson['strength'] = parseInt(persona.data.data.attributes.strength.die.sides);
  attrPerson['smarts'] = parseInt(persona.data.data.attributes.smarts.die.sides);
  attrPerson['vigor'] = parseInt(persona.data.data.attributes.vigor.die.sides);
  let attpoints = 0;
  let skillpoints = 0;
  let edges = persona.items.filter((el) => el.type == "edge");
  let edgesnum = edges.length;
  let hindpoints = 0;  
  let message = `<strong style="font-size:18px">` + persona.name + `</strong>`;
  let messageEdges = ``;
  let messageEdgesNum = 0;

  Object.keys(attrPerson).forEach((key) => attpoints += (attrPerson[key] / 2) - 1);

  let skills = persona.items.filter((el) => el.type == "skill");

  for (let i = 0; i < skills.length; i++) {
    if (!untrainedSkillName.includes(skills[i].name)) {
      let skillval = parseInt(skills[i].data.data.die.sides);
      let atassoc = attrPerson[skills[i].data.data.attribute];
      skillpoints += (skillval / 2) - 1;

      if (atassoc < skillval) {
        skillpoints+=(skillval-atassoc)/2;
      }   
    }
  }

  // Edges
  // rankNameSeasoned
  // rankNameVeteran
  // rankNameHeroic
  // rankNameLegendary
  console.log( '===================================' );
  for (let i = 0; i < edges.length; i++) {
    let requirement = edges[i].data.data.requirements['value']; // edge requirement
    if ( checkArrayInString(requirement, rankNameNovice) ) {  
        console.log( '===================================' );
        console.log( 'var1: ' + persona.data.data.advances['rank'] );
        console.log( 'var2: ' + rankNameNovice );
        console.log( 'var3: ' + !checkArrayInString(persona.data.data.advances['rank'], rankNameNovice) );
        console.log( '===================================' );
      if ( !checkArrayInString(persona.data.data.advances['rank'], rankNameNovice) && !checkArrayInString(persona.data.data.advances['rank'], rankNameSeasoned) && !checkArrayInString(persona.data.data.advances['rank'], rankNameVeteran) && !checkArrayInString(persona.data.data.advances['rank'], rankNameHeroic) && !checkArrayInString(persona.data.data.advances['rank'], rankNameLegendary) ) {
        messageEdges += `<p><b>` + edges[i].data['name'] + `</b> precisa de <b>` + edges[i].data.data.requirements['value'] + `</b>, mas o personagem é apenas <b>`+ persona.data.data.advances['rank'] + `</b></p>`;        
        messageEdgesNum++;
      }
    } else if ( checkArrayInString(requirement, rankNameSeasoned) ) {  
      if (!checkArrayInString(persona.data.data.advances['rank'], rankNameSeasoned) && !checkArrayInString(persona.data.data.advances['rank'], rankNameVeteran) && !checkArrayInString(persona.data.data.advances['rank'], rankNameHeroic) && !checkArrayInString(persona.data.data.advances['rank'], rankNameLegendary) ) {
        messageEdges += `<p><b>` + edges[i].data['name'] + `</b> precisa de <b>` + edges[i].data.data.requirements['value'] + `</b>, mas o personagem é apenas <b>`+ persona.data.data.advances['rank'] + `</b></p>`;        
        messageEdgesNum++;
      }    
    } else if ( checkArrayInString(requirement, rankNameVeteran) ) {  
      if (!checkArrayInString(persona.data.data.advances['rank'], rankNameVeteran) && !checkArrayInString(persona.data.data.advances['rank'], rankNameHeroic) && !checkArrayInString(persona.data.data.advances['rank'], rankNameLegendary) ) {
        messageEdges += `<p><b>` + edges[i].data['name'] + `</b> precisa de <b>` + edges[i].data.data.requirements['value'] + `</b>, mas o personagem é apenas <b>`+ persona.data.data.advances['rank'] + `</b></p>`;        
        messageEdgesNum++;
      }   
    } else if ( checkArrayInString(requirement, rankNameHeroic) ) {  
      if (!checkArrayInString(persona.data.data.advances['rank'], rankNameHeroic) && !checkArrayInString(persona.data.data.advances['rank'], rankNameLegendary) ) {
        messageEdges += `<p><b>` + edges[i].data['name'] + `</b> precisa de <b>` + edges[i].data.data.requirements['value'] + `</b>, mas o personagem é apenas <b>`+ persona.data.data.advances['rank'] + `</b></p>`;        
        messageEdgesNum++;
      }    
    } else if ( checkArrayInString(requirement, rankNameLegendary) ) {  
      if (!checkArrayInString(persona.data.data.advances['rank'], rankNameLegendary)) {
        messageEdges += `<p><b>` + edges[i].data['name'] + `</b> precisa de <b>` + edges[i].data.data.requirements['value'] + `</b>, mas o personagem é apenas <b>`+ persona.data.data.advances['rank'] + `</b></p>`;        
        messageEdgesNum++;
      }   
    } else {
      ui.notifications.warn(`Um requisito de vantagem está errado.`);
    }
    //console.log( edges[i].data.data.requirements['value'] );
    //console.log( edges[i].data['name'] );
    //console.log(persona.data.data.advances['rank']);
  }
  console.log( '===================================' );
  
  // Hidrances
  let hinds = persona.items.filter((el) => el.type == "hindrance");

  for (let i = 0; i < hinds.length; i++) {
    if (hinds[i].data.data.major) {
      hindpoints += 2;
    } else {
      hindpoints++;
    }
  }
  
  // Output  
  message += `<p style="color:#9dab00"><strong>Atributos:</strong> ` + (attpoints - 5) + ` pontos.</p>`;
  message += `<p style="color:#008f0e"><strong>Perícias:</strong> ` + (skillpoints - 5) + ` pontos. (-5 das perícias básicas)</p>`;
  message += `<p style="color:#c70000"><strong>Vantagens:</strong> ` + edgesnum + ` ponto(s) de custo.</p>`;
  message += `<p style="color:#0011d1"><strong>Complicações:</strong> ` + hindpoints + ` ponto(s) ganho(s).</p>`;
  
  if (messageEdgesNum>0) {
    messageEdges = `<strong style="font-size:16px"> (${messageEdgesNum}) Falha(s) de Requisitos</strong>` + messageEdges;
    // console.log(messageEdges);
    message += messageEdges;   
  }

  let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: message

  };
  ChatMessage.create(chatData, {});
}

function checkArrayInString(str, substrings) {
  if (new RegExp(substrings.join("|")).test(str)) {
      console.log("Match using '" + str + "'");
      return true;
  } else {
      console.log("No match using '" + str + "'");
      return false;
  }
}
