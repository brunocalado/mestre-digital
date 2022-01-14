const assetPath = 'worlds/scum-and-villainy/images/assets-scifi/datapad-template-700w.png'
const folderName = 'Datapads';

create_datapad_journal();

async function create_datapad_journal() {  
  let template = `
<div style="background-image: url( ${assetPath} ); background-repeat: no-repeat; width: 700px;min-height: 1000px; display: block; padding: 75px 50px; color: #d0faff;font-size: 18px;">
<p>&nbsp;</p>
</div>
  `;
  
  let folderID;
  if ( game.folders.filter( p => p.name === folderName )[0]==undefined ) {
    const createdFolder = await Folder.createDocuments([{name: folderName, type: "JournalEntry"}]);
    folderID = createdFolder[0].id;
  } else {
    const existingFolder = await game.folders.filter( p => p.name === folderName ); 
    folderID = existingFolder[0].id;
  }

  let data = {
    "name": 'Datapad',
    "folder": folderID,
    "content": template,
  };

  JournalEntry.create(data).then(journal => { journal.sheet.render(true) });
}
