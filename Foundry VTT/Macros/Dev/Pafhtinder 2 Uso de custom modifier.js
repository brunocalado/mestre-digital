// Select the token and run the macro
// Selecione o token a execute a macro

(async () => { 
  if (token.data.effects.includes("systems/pf2e/icons/spells/longstrider.jpg"))
  {
    actor.removeCustomModifier('speed', 'Longstrider')
    token.toggleEffect("systems/pf2e/icons/spells/longstrider.jpg")
  } else {
    actor.addCustomModifier('speed', 'Longstrider', 10, 'circumstance');
    token.toggleEffect("systems/pf2e/icons/spells/longstrider.jpg")
  };
})();

//full
all

str-based
dex-based
con-based
int-based
wis-based
cha-based

attack
attack-roll
str-attack
dex-attack
con-attack
int-attack
wis-attack
cha-attack

saving-throw
fortitude
reflex
will

initiative
perception
class (still subject to change)

ac

skill-check
acrobatics
arcana
athletics
crafting
deception
diplomacy
intimidation
medicine
nature
occultism
performance
religion
society
stealth
survival
thievery