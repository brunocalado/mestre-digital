// by Daniel Ávila Ferro
/* 
Ativar os Módulos:
- FX Master, Furnace e JB2A

source: 
icon: 
*/

let tipo = 'JB2A_DnD5e'; // Troque por jb2a_patreon se for a versão de patreon
tipo = 'jb2a_patreon'; // Troque por jb2a_patreon se for a versão de patreon
let arquivo = `modules/${tipo}/Library/Generic/Weapon_Attacks/Melee/GreatSword01_01_Regular_White_800x600.webm`;

if(game.user.targets.size == 0) ui.notifications.error('You must target at least one token');
if(canvas.tokens.controlled.length == 0) ui.notifications.error("Please select your token");
if (!canvas.fxmaster) ui.notifications.error("This macro depends on the FXMaster module. Make sure it is installed and enabled");
const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast() {
var myStringArray = Array.from(game.user.targets)[0];
var arrayLength = game.user.targets.size;
for (var i = 0; i < arrayLength; i++) {

await sleepNow(300)

let mainTarget = Array.from(game.user.targets)[i];
let myToken = canvas.tokens.controlled [0];

let ray = new Ray(myToken.center, mainTarget.center);
let anDeg = -(ray.angle * 57.3);
let anDist = ray.distance;

let anFileSize = 250;
let anchorX = 0.4;
let anScale = anDist / anFileSize;
let anScaleY = anDist / anFileSize;

let spellAnim = 
                    {
                     file: arquivo,
                      position: myToken.center,
                      anchor: {
                       x: anchorX,
                       y: 0.5
                      },
                      angle: anDeg,
                      scale: {
                       x: anScale,
                       y: anScaleY
                      }
                    }; 
canvas.fxmaster.playVideo(spellAnim);
game.socket.emit('module.fxmaster', spellAnim);
}
}
Cast()