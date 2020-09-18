/* Falar Difícil - v1.1
icon: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/Falar%20Dificil.svg
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Dungeon%20World/Falar%20Dificil.js
*/

// Settings
const moveName = 'Spout Lore'; // Falar Difícil
const result10 = 'The GM will tell you something interesting and useful about the subject relevant to your situation.'; // '<p><strong>10+:</strong> O MJ lhe dirá alguma coisa interessante e útil a respeito do assunto.</p><p>O MJ pode lhe perguntar “Como você sabia disso?”. Diga a verdade!</p>';
const result79 = 'The GM will only tell you something interesting—it’s on you to make it useful. The GM might ask you “How do you know this?” Tell them the truth, now.'; // '<p><strong>7-9:</strong> O MJ lhe dirá apenas alguma coisa interessante, e caberá a você torná-la útil.</p><p>O MJ pode lhe perguntar “Como você sabia disso?”. Diga a verdade!</p>';
const result6 = 'You failed!'; // "<p><strong>6-:</strong> Falha! <strong>Marcou XP.</strong></p>";
'When you consult your accumulated knowledge about something, roll+Int.'
const summary = 'When you consult your accumulated knowledge about something, roll+Int.'; //'Quando <strong>consultar seu conhecimento acumulado a respeito de alguma coisa</strong>, role+INT...</p>';

main();

async function main(){
    //Tem somente 1 token selecionado? Se não, erro!
    if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
        ui.notifications.error("Por favor, selecione somente um token!");
        return;
    }
    let actor = canvas.tokens.controlled[0].actor;
    
    //O personagem possui o movimento? Se não, erro!
    let falarDificil = actor.items.find(item => item.data.name == moveName) ;
    if(falarDificil == null || falarDificil == undefined){
        ui.notifications.error("O personagem não tem esse movimento!");
        return;
    }

    //Faz a rolagem do movimento.
    let rolagem = "2d6+";
    let atributo = parseInt(actor.data.data.abilities.int.mod);
    let dado = new Roll(rolagem + atributo).roll();

    //Texto de acordo com o resultado e XP automático para falha.
    let msg = `<h2>${moveName}</h2><p>${summary}</p>`
    if(dado.total > 9){
        msg += result10;
    } else if(dado.total < 7){
        msg += result6;
        actor.update({"data.attributes.xp.value": actor.data.data.attributes.xp.value + 1});
    } else{
        msg += result79;
    }

    //Envia a rolagem para o chat
    dado.toMessage({
        speaker: {alias: actor.name},
        flavor: msg
    });
}