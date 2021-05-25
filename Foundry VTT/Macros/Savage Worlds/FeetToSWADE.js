// IMPORTANT: MAKE A SCENE BACKUP BEFORE RUN THIS MACRO
// ----------------------------------------------------

/* Feet to SWADE
source: 
icon: 
*/

const lightMulti = 5;
const newDistance = 1;
const newUnit = 'in';

(async () => {
  await canvas.lighting.updateAll((i) => ({
    bright : Math.round( i.data.bright / lightMulti ) , dim : Math.round( i.data.dim / lightMulti ) 
  }));
  
  await canvas.scene.update({gridDistance: newDistance, gridUnits: newUnit});
})()