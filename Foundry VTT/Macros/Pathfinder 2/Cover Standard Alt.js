// Select the token

(async () => { 
  let messageContent = ''; 
  if (actor.data.type === 'character') { 
    if ((actor.data.data.customModifiers['ac'] || []).some(modifier => modifier.name === 'Is Covered')) { 
      if ((actor.data.data.customModifiers['ac'] || []).some(modifier => modifier.name === 'Taking Cover')) { 
        await actor.removeCustomModifier('ac', 'Taking Cover'); 
        await actor.removeCustomModifier('reflex', 'Taking Cover'); 
        await actor.removeCustomModifier('stealth', 'Taking Cover');
        if (token.data.effects.includes("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg")) { 
          await token.toggleEffect("systems/pf2e/icons/equipment/shields/specific-shields/reflecting-shield.jpg") 
        } 
      }
      
      await actor.removeCustomModifier('ac', 'Is Covered'); 
      await actor.removeCustomModifier('reflex', 'Is Covered'); 
      await actor.removeCustomModifier('stealth', 'Is Covered');

      if (token.data.effects.includes("systems/pf2e/icons/equipment/shields/specific-shields/floating-shield.jpg")) { 
        await token.toggleEffect("systems/pf2e/icons/equipment/shields/specific-shields/floating-shield.jpg") 
      } 
      messageContent = 'Isn\'t covered anymore.' 
    } else { 
      await actor.addCustomModifier('ac', 'Is Covered', 2, 'circumstance'); 
      await actor.addCustomModifier('reflex', 'Is Covered', 2, 'circumstance'); 
      await actor.addCustomModifier('stealth', 'Is Covered', 2, 'circumstance');
      if (!token.data.effects.includes("systems/pf2e/icons/equipment/shields/specific-shields/floating-shield.jpg")) { 
        await token.toggleEffect("systems/pf2e/icons/equipment/shields/specific-shields/floating-shield.jpg") 
      } 
      messageContent = 'Is Covered !' 
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