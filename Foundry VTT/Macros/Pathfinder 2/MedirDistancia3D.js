/* Medir distância v0.1 / Measure distance between two 3d coordinates
How to
1 - Marque um token.
2 - Selecione outro token
3 - Execute a macro.
*/
 
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
 * Measure distance between two tokens
 */
function computeDistance(token, target)
{
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
  }

  return minDistance;
}

/*
 * Measure distances between a token and a list of targets
 */
function computeDistances(token, targets)
{
  return targets.map(function(target) {
    return {
      name: target.data.name,
      distance: computeDistance(token, target),
    };
  });
}

/*
 * Print results to chat
 */
function showResults(token, distances)
{
  let content = '';
  for(const d of distances) {
    content += `<p>${d.name}: ${d.distance} ft.</p>`;
  };
  ChatMessage.create({
    speaker: {
      alias: `Distance from ${token.data.name}`,
    },
    content: `${content}`,
    type: CONST.CHAT_MESSAGE_TYPES.OOC,
    whisper: [game.user],
  });
}

/*
 * Run everything
 */
function main() {
  const selected = canvas.tokens.controlled;
  if (selected.length === 0) {
    ui.notifications.error("Please select at least one token");
    return;
  }

  const targets = Array.from(game.user.targets);
  if (targets.length === 0) {
    ui.notifications.error("Please select at least one target");
    return;
  }

  for (let token of selected) {
    const distances = computeDistances(token, targets);
    showResults(token, distances);
  }
}

main();