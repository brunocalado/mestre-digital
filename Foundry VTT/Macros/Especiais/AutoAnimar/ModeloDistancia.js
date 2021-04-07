// by Daniel Ávila Ferro

//This macro plays the animation on selected targets with a trajectory and distances of 30ft, 60ft and 90ft
//And We play another animation on top of that on impact. Perfect for Explosive Arrows !
//folder 01 is the directory path to the Arrow assets and folder02 is for the Explosion
let folder01 = "modules/JB2A_DnD5e/Library/Generic/Weapon_Attacks/Ranged/";
//let folder02 = "modules/JB2A_DnD5e/Library/Generic/Explosion/"
// anFile30 points to the file corresponding to 30ft, anFile60 for 60ft and anFile90 for 90ft
//anFileXpl is for the file of the explosion.
/*
let anFile30 = `${folder01}Arrow01_01_Regular_White_30ft_1600x400.webm`;
let anFile60 = `${folder01}Arrow01_01_Regular_White_2800x400.webm`;
let anFile90 = `${folder01}Arrow01_01_Regular_White_4000x400.webm`;
//let anFileXpl = `${folder02}Explosion_01_Orange_400x400.webm`;
*/

let anFile30 = `modules/JB2A_DnD5e/Library/1st_Level/Magic_Missile/MagicMissile_01_Regular_Purple_30ft_01_1600x400.webm`;
let anFile60 = `modules/JB2A_DnD5e/Library/1st_Level/Magic_Missile/MagicMissile_01_Regular_Purple_60ft_01_2800x400.webm`;
let anFile90 = `modules/JB2A_DnD5e/Library/1st_Level/Magic_Missile/MagicMissile_01_Regular_Purple_60ft_01_2800x400.webm`;


if(game.user.targets.size == 0) ui.notifications.error('You must target at least one token');
if(canvas.tokens.controlled.length == 0) ui.notifications.error("Please select your token");
///Check if Module dependencies are installed or returns an error to the user
if (!canvas.fxmaster) ui.notifications.error("This macro depends on the FXMaster module. Make sure it is installed and enabled");

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast() {
var myStringArray = Array.from(game.user.targets)[0];
var arrayLength = game.user.targets.size;
for (var i = 0; i < arrayLength; i++) {

let mainTarget = Array.from(game.user.targets)[i];
let tarScale = ((mainTarget.data.width + mainTarget.data.height)/2);
let myToken = canvas.tokens.controlled [0];

let ray = new Ray(myToken.center, mainTarget.center);
let anDeg = -(ray.angle * 57.3);
let anDist = ray.distance;



let anFile = anFile30;
let anFileSize = 600;
let anchorX = 0.125;
switch(true){
 case (anDist<=1200):
    anFileSize = 1200;
    anFile = anFile30;
    anchorX = 0.125;
    break;
 case (anDist>1400):
    anFileSize = 1200;
    anFile = anFile90;
    anchorX = 0.05;
    break;
 default:
    anFileSize = 2400;
    anFile = anFile60;
    anchorX = 0.071;
    break;
}

let anScale = anDist / anFileSize;
let anScaleY = anDist <= 600 ? 0.6  : anScale;

let spellAnim = 
                    {
                     file: anFile,
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

//let spellAnim2 = 
//                    {
//                     file: anFileXpl,
//                      position: mainTarget.center,
//                      anchor: {
 //                      x: 0.5,
//                       y: 0.5
//                      },
//                      angle: 0,
//                      scale: {
//                       x: tarScale,
//                       y: tarScale
//                      }
//                    }; 
//
canvas.fxmaster.playVideo(spellAnim);
game.socket.emit('module.fxmaster', spellAnim)
await sleepNow(800);
canvas.fxmaster.playVideo(spellAnim2);
await sleepNow(250);
game.socket.emit('module.fxmaster', spellAnim2);
}
}
Cast ()