// Add a +1 bonus even though reloads
actor.addCustomModifier('attack', 'Heroism', 1, 'status');

// remove it
actor.removeCustomModifier('attack', 'Heroism');