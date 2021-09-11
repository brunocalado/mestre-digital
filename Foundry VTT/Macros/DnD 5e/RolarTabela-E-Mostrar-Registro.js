const tableName = 'Acerto Crítico';
//const tableName = 'Erro Crítico';
const peculiaridades = await drawFromTable(tableName);


async function drawFromTable(tableName) {

  let list_compendium = await game.packs.filter(p=>p.documentName=='RollTable');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='RPG Next - Tabelas' )[0].getDocuments();      
  const table = await inside.filter( p=>p.name==tableName )[0];          
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }
  const output = await table.roll();
  const result = output.results[0].data.img;
  await ChatMessage.create({content: `<img src:${result}>`});
  //await table.draw({flavor:""}); // joga no chat, mas tem que comentar abaixo

  
  const popout = new ImagePopout(result).render(true);
  popout.shareImage();
}
