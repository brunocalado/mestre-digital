/*
source: 
icon:
*/
(async () => {
  let list_compendium = await game.packs.filter(p=>p.entity=='JournalEntry' );
  let inside = await list_compendium.filter( p=>p.metadata.label=='GM Screen' )[0].getContent();
  let journal = await inside.filter( p=>p._data['name']=='!GM Screen' )[0];

  if (journal.sheet.rendered)  
    journal.sheet.close(); 
  else 
    journal.sheet.render(true);
  
})()