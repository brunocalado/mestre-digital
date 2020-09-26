/*
@Kekilla#7036 
*/

let compendium_types = ["Item"];

pick_compendium();

async function pick_compendium()
{
  let packs = game.packs.filter(p=>(game.user.isGM || !p.private) && compendium_types.includes(p.entity));

  let pack_choice = await choose(packs.map(p=> { return [p.collection, p.title]}), `Chose a compendium to create a table from : `);

  console.log(pack_choice, packs);

  let data = await create_Data(packs.find(p=> p.collection === pack_choice));

  RollTable.create(data);
}

async function choose(options = [], prompt = ``)
{
  let value = await new Promise((resolve, reject) => {

    let dialog_options = (options[0] instanceof Array)
      ? options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join(``)
      : options.map(o => `<option value="${o}">${o}</option>`).join(``);
  
    let content = `
    <p>
    ${prompt}<br><select id="choice">${dialog_options}</select>   
    </p>
    <p>
    Table Name: <input id="tableName" type="text" style="width: 250px" value='My Table'>    
    </p>
    `;
  
    new Dialog({
      title: "Create Table from Compendium",
      content, 
      buttons : { OK : {label : `Create`, callback : async (html) => { resolve(html.find('#choice').val()); } } }
    }).render(true);
    
  });
  return value;
}

async function create_Data(pack)
{
  console.log(pack);

  let data = {
    name : `${pack.title} Table`,
    formula : "",
    replacement : true,
    displayRoll : true,
    results : []
  };

  let contents = await pack.getContent(), range = 0, type = 2, weight = 1;
  
  for(let content of contents)
  {
    data.results.push({
      collection : pack.collection,
      drawn : false,
      img : content.img,
      range : [range, range],
      resultId : content.id,
      text : content.name,
      type,
      weight
    });
    range++;
  }

  data.formula = `d${contents.length}`;

  return data;
}