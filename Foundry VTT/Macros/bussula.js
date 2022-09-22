/*
icon: icons/tools/navigation/compass-brass-blue-red.webp
*/

const version =  'v1.0';
let tokenD;

if (canvas.tokens.controlled[0]===undefined){
  ui.notifications.error("You must select a token!");
} else {
  tokenD=canvas.tokens.controlled[0];
  main();
}

function main() {
  let template =` 
    <h2>Angle</h2>
    <p><input id="newangle" type="number" min=-360 max=360 style=" text-align: center;" value=0></p>       `
  ;

  new Dialog({
    title:  `Compass - ${version}`,
    content: template,
    buttons: {
      ok: {
        label: "Move",
        callback: async (html) => {
          compassAnimate(html);
        },
      },
      cancel: {
        label: "Cancel",
      },
    },
  }).render(true);
}

async function compassAnimate(html) {
  let newangle =  parseInt(html.find("#newangle")[0].value);
  await crazyPointer();
  await rotatePointer(newangle);

}

async function rotatePointer(angle) {
  let sequence = new Sequence()
    .animation()
        .on(tokenD)
        .rotateIn(angle, 2500, {ease: "easeOutCubic"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()

  await sequence.play();
}

async function crazyPointer() {
  let sequence = new Sequence()
    .animation()
        .on(tokenD)
        .rotateIn(0, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(90, 1500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(180, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)
        .waitUntilFinished()
        .rotateIn(360, 2500, {ease: "easeInOutBounce"})    // .rotateIn(degrees, duration, options)

  await sequence.play();
}