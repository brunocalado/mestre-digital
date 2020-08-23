//replace "!GM Screen" with journal name 

let journal = game.journal.getName("!GM Screen"); 

if (journal.sheet.rendered)  
  journal.sheet.close(); 
else 
  journal.sheet.render(true) 