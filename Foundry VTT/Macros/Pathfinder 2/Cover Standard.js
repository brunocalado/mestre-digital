// A macro for Pathfinder 2e to toggle lesser cover. Written by @mistamichal5724   
// Select the token / Selecione o token

if (token.data.effects.includes("systems/pf2e/icons/conditions-2/hidden.png")) { 
  actor.removeCustomModifier('ac', 'Lesser cover') 
  token.toggleEffect("systems/pf2e/icons/conditions-2/hidden.png") 
} else { 
  actor.addCustomModifier('ac', 'Lesser cover', 1, 'circumstance'); 
  token.toggleEffect("systems/pf2e/icons/conditions-2/hidden.png") 
};