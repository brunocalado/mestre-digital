// Must have the feat Untrained Improvisation

const level = actor.data.data.details.level.value; 
const modifier = level < 7 ? Math.floor(level / 2) : level; 
const untrained = Object.values(actor.data.data.skills).filter((skill) => skill.rank === 0) ?? []; 

(async () => { 
  for (const skill of untrained) { 
    await actor.removeCustomModifier(skill.name, 'Untrained Improvisation'); 
    if (modifier > 0) { 
      await actor.addCustomModifier(skill.name, 'Untrained Improvisation', modifier, 'proficiency'); 
    } 
  } 

})();