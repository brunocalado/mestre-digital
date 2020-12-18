/**
 * Applies a status (requires CUB)
 * 
 * Contains code for 0.75 and 0.6.6. If you're using 0.6.6, comment out the "addCondition" line (add // to front of line)
 * and uncomment the "applyCondition" line (remove //)
 *
 * Author: @ChazPls#3551
 */

let options = '';
game.cub.conditions.forEach((item) => {
  options += `<option value="${item.name}">\n`;
});
let content = `
<form>
  <div class="form-group">
    <label for="condition">Condition:</label>
    <input list="conditions" id="condition" name="condition"/ autofocus>
    <datalist id="conditions">
      ${options}
    </datalist>
  </div>
</form>
`

new Dialog({
  title: `Select Condition`,
  content: content,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply`,
      callback: (html) => {
        let condition = html.find('#condition').val();
        if (!game.cub.conditions.some(el => el.name === condition)) {
          return ui.notifications.info("Select a valid condition.");
        }

        //apply the condition to selected tokens (0.6.6)
        //game.cub.applyCondition(condition);

    //apply the condition to the selected tokens (0.7.5)
    game.cub.addCondition(condition);

      }
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel`
    },
  },
  default: "yes"
}).render(true);

(async () => {
  await new Promise(resolve => setTimeout(resolve, 20));
  let input = $('#condition').focus();
})();