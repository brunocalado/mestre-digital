// Select the token and run the macro
// Selecione o token a execute a macro

(async () => { 
  if (token.data.effects.includes("systems/pf2e/icons/spells/longstrider.jpg"))
  {
    token.toggleEffect("systems/pf2e/icons/spells/longstrider.jpg")
  } else {
    token.toggleEffect("systems/pf2e/icons/spells/longstrider.jpg")
  };
})();