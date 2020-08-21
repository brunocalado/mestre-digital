// Select the token and run the macro
// Selecione o token a execute a macro

(async () => { if (token.data.effects.includes("systems/pf2e/icons/spells/shield.jpg"))
{
actor.removeCustomModifier('ac', 'Shield Spell')
token.toggleEffect("systems/pf2e/icons/spells/shield.jpg")
}else
{
actor.addCustomModifier('ac', 'Shield Spell', 1, 'circumstance');
token.toggleEffect("systems/pf2e/icons/spells/shield.jpg")
};
})();