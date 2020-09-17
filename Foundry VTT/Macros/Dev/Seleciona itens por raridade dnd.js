game.betterTables.createTableFromCompendium("Full Table Itens Incommon",
    "dnd5e.items",
    { weightPredicate: predicate }
);

function predicate(entity) {
    if(entity.type != "loot") return 0;
    if(entity.data.data.rarity != "incommon") return 0;
}