(async () => { 
  let messageContent = ''; 
  if (actor.data.type === 'character') {
    if ((actor.data.data.customModifiers['ac'] || []).some(modifier => modifier.name === 'Taking Cover')) {
      await actor.removeCustomModifier('ac', 'Taking Cover'); 
      await actor.removeCustomModifier('reflex', 'Taking Cover'); 
      await actor.removeCustomModifier('stealth', 'Taking Cover');
      if (token.data.effects.includes("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg")) {
        await token.toggleEffect("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg");
      }
      messageContent = 'Isn\'t covered anymore.';
    } else {
      await actor.addCustomModifier('ac', 'Taking Cover', 4, 'circumstance'); 
      await actor.addCustomModifier('reflex', 'Taking Cover', 4, 'circumstance');
      await actor.addCustomModifier('stealth', 'Taking Cover', 4, 'circumstance'); 

      if (!token.data.effects.includes("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg")) {
        await token.toggleEffect("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg");
      } 
      messageContent = 'Takes cover !' ;
    }; 

    // create the message  
    if (messageContent !== '') { 
      let chatData = { 
        user: game.user._id, 
        speaker: ChatMessage.getSpeaker(), 
        content: messageContent, 
      }; 
      await ChatMessage.create(chatData, {}); 
    } 
  } else { 
    ui.notifications.warn("Please select a PC."); 
  } 
})(); 