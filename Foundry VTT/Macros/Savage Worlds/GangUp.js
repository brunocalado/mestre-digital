const withinRangeOfToken = canvas.tokens.placeables.filter(t => t.id !== tokenD.id && t.actor.data.type === "npc" && t.visible && withinRange(token, t, itemRange));

// function from Kekilla
function withinRange(origin, target, range) {
    const ray = new Ray(origin, target);
    let distance = canvas.grid.measureDistances([{ ray }], { gridSpaces: true })[0];
    return range >= distance;
}