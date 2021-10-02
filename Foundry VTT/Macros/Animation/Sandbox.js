const version = 'v0.1';
let tokenD = canvas.tokens.controlled[0];

if (!tokenD) {
  ui.notifications.warn(`Select a token!`); // get selected token 
} else {
  main();
}

async function main() {

  //let items = tokenD.actor.data.data.citems; // tudo
  let items = tokenD.actor.data.data.citems.filter(e => e.attributes._animated);
    
  let itemsList = ""; //Display the Chat Card for the selected item
  for (let item of items) {
    itemsList += `<option value="${item.name}">${item.name}`
  }

  let dialogTemplate = `
  <h1>Select Item</h1>
  <p style="text-align:center; vertical-align:center"><select id="selecteditem" style=" width:250px;">${itemsList}</select></p>
  `;

  new Dialog({
    title: `Animation Assistant - ${version}`,
    content: dialogTemplate,
    buttons: {
      Attack: {
        label: "Animate",
        callback: async (html) => {
          activateAnimation(html);
        }
      },
      Cancel: {
        label: "Cancel"
      }
    }
  }).render(true);
  
}

async function activateAnimation(html) {
  let itemName = html.find("#selecteditem")[0].value;  
  
  let itemFromDir = game.items.contents.filter(e => e.type === 'cItem' && e.name === itemName && e.data.flags.autoanimations.override)[0];  
  
  console.log('------------------');
  console.log(itemName);
  console.log('------------------');

  AutoAnimations.playAnimation(tokenD, Array.from(game.user.targets), itemFromDir)  
}

/*
let itemsFromDir = game.items.contents.filter(e => e.type === 'cItem' && e.name === 'Arma Corpo a Corpo' && e.data.flags.autoanimations.override);  

[0].data.flags.autoanimations
[0].data.flags.autoanimations.override
*/