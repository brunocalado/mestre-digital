/*
// v0.1
//const animationPath = 'jb2a.energy_beam.normal.bluepink.02';
const animationPath = 'modules/jb2a_patreon/Library/Generic/UI/Indicator_01_Regular_Green_200x200.webm';
//const animationPath = '"modules/sequencer/samples/Bindings/chain.png"';
const soundPath= "modules/avatar/sounds/chain_metal_drop_on_floor_vs_02.ogg";
const source = canvas.tokens.controlled[0];
const target = await Array.from(game.user.targets)[0];
const currentEffects = Sequencer.EffectManager.getEffects({ source: target, name: "arrow" }) // Find effects on target with name "arrow"
*/

const animationPath = 'modules/jb2a_patreon/Library/Generic/UI/Indicator_01_Regular_Green_200x200.webm';
//const animationPath = 'jb2a.ui.indicator.green.01.01';
const source = canvas.tokens.controlled[0];
const target = Array.from(game.user.targets)[0];
let distance = computeDistance(source, target);
const currentEffects = Sequencer.EffectManager.getEffects({ source: source, name: "arrow" }) // Find effects on source with name "arrow"

const style = {
    align: "center",
    dropShadow: true,
    dropShadowAlpha: 0.2,
    fill: "#ffae00",
    fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
    fontSize: 45,
    fontStyle: "italic",
    fontWeight: "bold"
};

if( currentEffects.length != 0 ) {
    Sequencer.EffectManager.endEffects({ source: source, name: "arrow" }); // End effects on source named "arrow"
} else {
new Sequence()
  .effect()
    .file(animationPath)          // Play arrow animation from Sequencer Database
    .attachTo(source, { followRotation: false })    // Attach to source token but do not rotate with it
    .rotateTowards(target, { offset: 90, attachTo: true })          // Rotate towards target token
    .scaleToObject(0.75)                             // Scale effect to fit token's size
    .spriteOffset({ x: 0.5 }, { gridUnits: true })  // Move above token by 1 grid unit
    .name("arrow")                                  // Name it arrow so that endEffects can end the effect
    .fadeIn(500)                                    // When first created, fade it in
    .fadeOut(500)                                   // When ending, fade it out
    .animateProperty("sprite", "angle", { from: 90, to: 90, duration: 1 })
  .effect()
    .atLocation(token)
    .text(`${distance} km`, style)  
    .delay(2000)
  .play()  
}
//    .persist()                                      // Make it last forever


/*
 * Measure distance between two tokens
 */
function computeDistance(token, target) {
  let tokenData = token.data;
  let targetData = target.data;
  const gs = canvas.dimensions.size;
  const gd = game.scenes.active.data.gridDistance;

  // Set search variables
  var minDistance = 100000;
  var minTokenSquare = {};
  var minTargetSquare = {};
  var tokenSquare = {};
  var targetSquare = {};
  var distance;

  // Search for minimum distance
  for (let toX = 0; toX < tokenData.width; ++toX) {
    for (let toY = 0; toY < tokenData.height; ++toY) {
      for (let toZ = 0; toZ < tokenData.width; ++toZ) {
        for (let taX = 0; taX < targetData.width; ++taX) {
          for (let taY = 0; taY < targetData.height; ++taY) {
            for (let taZ = 0; taZ < targetData.width; ++taZ) {
              tokenSquare = {
                x: tokenData.x + toX * gs,
                y: tokenData.y + toY * gs,
                elevation: tokenData.elevation + toZ * gd,
              };
              targetSquare = {
                x: targetData.x + taX * gs,
                y: targetData.y + taY * gs,
                elevation: targetData.elevation + taZ * gd,
              }

              distance = measureDistance(tokenSquare, targetSquare);
              if (distance < minDistance) {
                minDistance = distance;
                minTokenSquare = tokenSquare;
                minTargetSquare = targetSquare;
              }
            }
          }
        }
      }
    }
  };
  return minDistance;
}

function measureDistance(origin, target) {
  const gs = canvas.dimensions.size;
  const ray = new Ray(origin, target);

  // How many squares do we travel across to get there? If 2.3, we should count that as 3 instead of 2; hence, Math.ceil
  const nx = Math.ceil(Math.abs(ray.dx / gs));
  const ny = Math.ceil(Math.abs(ray.dy / gs));

  // Elevation
  const gd = game.scenes.active.data.gridDistance;
  const oz = origin.elevation ? origin.elevation : 0;
  const tz = target.elevation ? target.elevation : 0;
  const nz = Math.ceil(Math.abs(tz - oz) / gd);

  // Let's order and rename nx, ny, nz so that A >= B >= C
  let [A, B, C] = [nx, ny, nz].sort(function(a, b) { return b - a; });

  // Get the total number of straight and diagonal moves
  const nStraight = A - B;
  const nDiagonal = B;
  const n3dDiagonal = C;

  // Get total distance
  const distance =
      nStraight                       // 1 each
    + Math.floor(nDiagonal * 1.5)     // 1 then 2 then 1 then 2...
    + Math.floor(n3dDiagonal * 0.5);  // 0 then 1 then 0 then 1...

  // Convert distance to grid's dimensions
  const distanceOnGrid = distance * canvas.dimensions.distance;
  return distanceOnGrid;
}

/*
 * Print results to chat
 */
function showResults(token, target) {
  const distance = computeDistance(token, target);  
  let message = `<h3>Distance from <b>${token.name}</b> to ??? is ${distance}</h3>`;
  console.log(message);;
}

/*
// v0.1
const animationPath = 'modules/jb2a_patreon/Library/Generic/Energy/EnergyBeam_03_Regular_BluePink_30ft_1600x400.webm';
//const animationPath = 'jb2a.energy_strands.range.multiple.bluepink.02';
//const animationPath = '"modules/sequencer/samples/Bindings/chain.png"';
const soundPath= "modules/avatar/sounds/chain_metal_drop_on_floor_vs_02.ogg";
const source = canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);
let currentEffect = Sequencer.EffectManager.getEffects({source: source});

if( currentEffect.length != 0 ) {
  Sequencer.EffectManager.endEffects({source: source})
} else {
  for (const target of targets) {
    new Sequence()
        .effect()
            .file(animationPath)
            .attachTo(source)
            .stretchTo(target, { attachTo: true })
            .template({ gridSize: 200 })
            .belowTokens()
            .persist()
        .sound(soundPath)
        .play()
  }
}
*/