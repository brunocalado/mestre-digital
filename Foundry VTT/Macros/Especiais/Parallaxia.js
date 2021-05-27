PARALLAXIA DESATIVAR:
let updates = canvas.tiles.placeables.filter(t => t.data.flags.parallaxia).map(t => {
return {
_id: t.id,
'flags.parallaxia.isTarget': false,
}
});
canvas.tiles.updateMany(updates)
PARALLAXIA ATIVAR:
let updates = canvas.tiles.placeables.filter(t => t.data.flags.parallaxia).map(t => {
return {
_id: t.id,
'flags.parallaxia.isTarget': true,
}
});
canvas.tiles.updateMany(updates)