/* Lanterna Elétrica - v0.1
*/

const torchAnimation = {"type": "BlitzElectric Fault", "speed": 2, "intensity": 5};

async function tokenUpdate(data) {
  await canvas.tokens.controlled.map(token => token.update(data));
}

(async () => {
  await tokenUpdate({"lightAlpha": 0.13, "dimSight": 5, "brightSight": 0, "dimLight": 100, "brightLight": 60, "lightAngle": 120, "lightAnimation": torchAnimation});
})();

/*
// Desliga
const torchAnimation = {"type": ""};

async function tokenUpdate(data) {
  await canvas.tokens.controlled.map(token => token.update(data));
}

(async () => {
  await tokenUpdate({"lightAlpha": 0.13, "dimSight": 5, "brightSight": 0, "dimLight": 0, "brightLight": 0, "lightAngle": 120, "torchAnimation": lightAnimation});
})();


*/