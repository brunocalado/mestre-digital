//Let's start with Bless, since that's the easiest. You would need to run this macro once for each player: 
actor.addCustomModifier('attack', 'Bless', 1, 'status', { all: ['blessed'] }); 
//Then, whenever a character is affected by a Bless spell, you can toggle on/off the modifier with this macro: 
actor.toggleRollOption('attack-roll', 'blessed'); 