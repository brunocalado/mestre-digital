// A macro for Pathfinder 2e to toggle greater cover. Written by @mistamichal5724  

if (token.data.effects.includes("systems/pf2e/icons/conditions-2/hidden.png")) { 
  actor.removeCustomModifier('ac', 'Greater cover') 
  token.toggleEffect("systems/pf2e/icons/conditions-2/hidden.png") 
} else { 
  actor.addCustomModifier('ac', 'Greater cover', 4, 'circumstance'); 
  token.toggleEffect("systems/pf2e/icons/conditions-2/hidden.png") 
}; 