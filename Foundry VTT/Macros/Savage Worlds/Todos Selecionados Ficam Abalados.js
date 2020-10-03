/*

*/

main ();

async function main() {
  const ImgPath = "assets/icons/swade-status/0-Shaken.png";
   
   //Is a token selected
   if (canvas.tokens.controlled.length == 0) {
      ui.notifications.error("No tokens selected");
      return;
   }
   let tokens = canvas.tokens.controlled.map(token => {return token});

   for (let token of tokens) {
      await token.actor.update({"data.status.isShaken": !token.actor.data.data.status.isShaken });
      await token.toggleEffect(ImgPath);
   }

}