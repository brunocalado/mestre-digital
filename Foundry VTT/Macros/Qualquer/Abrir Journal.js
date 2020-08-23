//replace "MEUJOURNAL" with journal name 

let journal = game.journal.getName("MEUJOURNAL"); 

if (journal.sheet.rendered)  
  journal.sheet.close(); 
else 
  journal.sheet.render(true); 