// Select the token and run the macro
// Selecione o token a execute a macro
// NOTE: Dependency on Turn Alert Module

(async () => { 
  if (token.data.effects.includes("systems/pf2e/icons/spells/shield.jpg"))
  {
    actor.removeCustomModifier('ac', 'Shield Spell')
  } else {
    const alertData = {
        round: 1,
        roundAbsolute: false,
        turnId: game.combat.combatant._id,
        macro: "Shield Spell",
        message: "Shield Spell Down",
        //recipientIds: game.users.filter((u) => u.isGM).map((u) => u.data._id),
    };
    actor.addCustomModifier('ac', 'Shield Spell', 1, 'circumstance');
    TurnAlert.create(alertData);
  };
  token.toggleEffect("systems/pf2e/icons/spells/shield.jpg")
})();