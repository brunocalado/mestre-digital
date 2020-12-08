const version = 'v0.1';
/* Whisper 
Features
- whisper to conected players

source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Qualquer/Whisper.js
icon: icons/tools/scribal/ink-quill-pink.webp
*/

let users = User.collection.entities.filter(it => it.active === true);

if (users.length < 2) {
  ui.notifications.error("Nenhum jogador online.");
} else {
  let applyChanges = false;
  let content =`
    <form>
      <div class="form-group">
        <label>Selecione o jogador:</label>
        <select id="player" name="player">
  `;

  for (let user of users) {
    if (!user.isGM) {
      content += `<option value="`+ user.data.name +`">`+ user.data.name +"</option>";
    }
  }

  content += `
        </select>
      </div>
        <div class="form-group">
        <label>Mensagem:</label>
        <textarea name="msg" style="width:250px;height:150px;"></textarea><br>
      </div>
    </form>
  `;

  new Dialog(
    {
      title: `Mensagem Privada - ${version}`,
      content: content,
      buttons: {
        yes: {
          icon: "<i class='fas fa-check'></i>",
          label: `Enviar`,
          callback: () => applyChanges = true
        },
        no: {
          icon: "<i class='fas fa-times'></i>",
          label: `Cancelar`
        },
      },
      default: "yes",
      close: html => {
        if (applyChanges) {
          let player = html.find('[name="player"]')[0].value;
          let msg = html.find('[name="msg"]')[0].value || "none";
          if (msg !== "none") {
            ChatMessage.create({
              whisper: ChatMessage.getWhisperRecipients(player),
              content: msg
            })
          }
        }
      }
    }
  ).render(true);
  
} // end 