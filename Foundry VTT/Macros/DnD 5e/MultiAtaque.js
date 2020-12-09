const version = 'v0.1';
/* Multi Attack 
Features
- 


TODO
- Read token data
source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/DnD%205e/MultiAtaque.js
icon: icons/commodities/claws/claw-bear-brown.webp
*/

(async ()=> {
  const data = [[`What is target AC? : `, `number`], [`How many attacks? : `, `number`], [`Damage dices? : `, `text`], [`Damage Modifier? : `, `number`], [`Attack Modifier (including proficiency)? : `, `number`], [`Roll with advantage? : `, `checkbox`]];
  let [ac, atks, dice, dmgmod, attackmod, adv] = await multi_input({ title : `Summon Multi-roll!`, data });

  const critRoll = 20+attackmod;
  let attack_rolls = Array(atks).fill(0).map((v,i)=> new Roll(`${adv ? '2d20kh1' : '1d20'}+${attackmod}`).roll());
  let damage_rolls = Array(atks).fill(0).map((v,i)=> new Roll(`${dice} ${attack_rolls[i].total === critRoll ? `+${dice}` : ``} + ${dmgmod}`).roll());
  
  let content = `<b>Attack Rolls [d20 + ${attackmod}] vs AC ${ac}<br>Damage Rolls [${dice}+${dmgmod}]</b><br>
  <table style="width:100%">
    <tr><th>#</th><th>Attack</th><th>Damage</th></tr>
    ${
      attack_rolls.map((v,i)=> `
        <tr>
          <td style="width:20%">${i+1}</td>
          <td style="width:40%">${v.total === critRoll ? 'Critical !' : '<div title="('+ v.dice[0].results.map(r=>`${r.result}`).join(` | `)+')">' + v.total + '</div>'}</td>
          <td style="width:40%">${v.total >= ac ? '<div title="('+ damage_rolls[i].dice[0].results.concat(damage_rolls[i].dice[1] ? damage_rolls[i].dice[1].results : []).map(r=>`${r.result}`).join(` | `)+')">' + damage_rolls[i].total + '</div>' : `Missed !`}</td>
        </tr>`).join(` `)
    }
    <tr>
      <td colspan="2"><h2>Total Damage: </h2><td><h2><b>${attack_rolls.reduce((a, v, i) => (v.total >= ac) ? a+damage_rolls[i].total : a, 0)}</b></h2></td>
    </tr>
  </table>`;

  ChatMessage.create({content, flavor : ``});
})();
async function multi_input({title = ``, data = []} = {})
{
  let value = await new Promise((resolve)=> {
    new Dialog({
      title,       
      buttons : {
        Ok : { 
          label : `Ok`, 
          callback : (html) => { 
            let html_values = html.find("input"); 
            resolve(data.map((e,i) => e[1] == "number" ? html_values[i].valueAsNumber : ( e[1] == "checkbox" ? html_values[i].checked : html_values[i].value)));
          }
        }
      },
      content : `<table style="width:100%">${data.map((input, index) => {
        return `<tr>
                  <th style="width:50%">
                    <label>${input[0]}</label>
                  </th>
                  <td style="width:50%">
                    <input type="${input[1]}" name="${index}"/>
                  </td>
                </tr>`;
        }).join(``)}</table>`
    }).render(true);
  });
  return value;
}