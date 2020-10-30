/*
Features
- Select all PCs on the scene to:
-- Set HP Bar
-- Always display name and hp
-- Set to disposition Friendly
-- Link actor
-- Set dim vision to 20.
*/

const tokens = canvas.tokens.placeables.filter((t) => t.actor._data.type === "character").map(token => {
  return {
    _id: token.id,
    "bar1.attribute": "attributes.hp",
    //"bar2.attribute": "attributes.ac.value", for xp when
    "displayName": CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    "displayBars": CONST.TOKEN_DISPLAY_MODES.ALWAYS,
    "disposition": 1,
    "actorLink": true,
    "vision": true,
    "dimSight": 20 
  };
});

canvas.scene.updateEmbeddedEntity('Token', tokens);