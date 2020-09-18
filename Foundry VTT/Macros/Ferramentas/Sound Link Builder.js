/* Sound Link Builder v1.0
Macro for: https://github.com/superseva/sound-link
Source: https://raw.githubusercontent.com/brunocalado/mestre-digital/master/Foundry%20VTT/Macros/Ferramentas/Sound%20Link%20Builder.js
Icon: 
*/

main();

function main() {
  let playlists_list = "";
  Array.from(game.playlists).map((el) => {
    playlists_list += `<option value="${el.data.name}">${el.data.name}</option>`;
  });
  
  let template = `  
  <p>    
    Playlist Name: <select id="playlistname">${playlists_list}</select>
  </p>
  <p>
    Sound Name: <input id="soundname" type="text" style="width: 250px" value=''>
  </p>
  <p>
    Link Name: <input id="linkname" type="text" style="width: 250px" value=''>
  </p>
  <br />
  `;
  new Dialog({
    title: "Sound Link Builder v1.0",
    content: template,
    buttons: {
      ok: {
        label: "Generate",
        callback: async (html) => {
          generateCode(html);
        },
      },
    },
  }).render(true);
}

async function generateCode(html) {  
  let soundname = html.find("#soundname")[0].value;
  let linkname = html.find("#linkname")[0].value;
  let playlistname = html.find("#playlistname")[0].value;
  let template='';  
  
  template = `<a class="sound_link" data-playlist="${playlistname}" data-sound="${soundname}">${linkname}</a>`;

  /* view */
  let form = `
    <label>Copy this to the journal Source Code</label>
    <textarea id="moduleTextArea" rows="5" cols="33">${template}</textarea>
  `;

  let dialog = new Dialog({
    title: "module.json",
    content: form,
    buttons: {
      use: {
        label: "Copy to Clipboard",
        callback: () => {
          let copyText = document.getElementById("moduleTextArea"); /* Get the text field */  
          copyText.select(); /* Select the text field */  
          document.execCommand("copy"); /* Copy the text inside the text field */  
          ui.notifications.notify(`Saved on Clipboard`); /* Alert the copied text */
        }
      }
    }
  }).render(true);
}
