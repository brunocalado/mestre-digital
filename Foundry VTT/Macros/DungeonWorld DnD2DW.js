/* version 0.1
canvas.tokens.controlled[0].actor;
*/

drawFromDnDActor();

/* Functions */
async function drawFromDnDActor() {
  let list_compendium = await game.packs.filter(p=>p.entity=='Actor');      
  let inside = await list_compendium.filter( p=>p.metadata.label=='Cycle of Cerberus NPCs' )[0].getContent();     
  
  for (var i in inside) { //console.log(inside[i]);  
    let tmp = `<h3>Atributos</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.abilities)}</p>`;
    tmp += `<h3>Movimento</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.attributes.movement)}</p>`;
    tmp += `<h3>Alinhamento</h3>`;
    tmp += `<p>${inside[i].data.data.details.alignment}</p>`;    
    tmp += `<h3>Condições - Imunidades</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.traits.ci.value)}</p>`;
    tmp += `<h3>Condições - Resistências</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.traits.di.value)}</p>`;
    tmp += `<h3>Dano - Imunidades</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.traits.dr.value)}</p>`;
    tmp += `<h3>Dano - Resistências</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.traits.dv.value)}</p>`;
    tmp += `<h3>Sentidos</h3>`;
    tmp += `<p>${JSON.stringify(inside[i].data.data.traits.senses)}</p>`;

    tmp += `<h2>Itens</h2>`;
    for (const item of inside[i].data.items){ 
      tmp += `<h3>${item.name}</h3>`;
      tmp += `<p>${item.data.description.value}</p>`;    
    }

    createRandomNPC({
      name: inside[i].data.name,
      type: "npc",
      img: inside[i].data.img,    
      sort: 12000,
      data: {},
      token: {},
      items: [],
      flags: {},
      folder: "EBmCtyEVFNoufvMx",
      data: {
        details: {
          biography: tmp
        },
        attributes: {
          damage: {
            value: ""
          },
          ac: {
            value: inside[i].data.data.attributes.ac.value
          },
          hp: {
            max: inside[i].data.data.attributes.hp.max,     
            value: inside[i].data.data.attributes.hp.max
          },
          specialQualities: {
            value: inside[i].data.data.details.type    
          }
        }      
      }
    });    
    
  }
  
  if (!table) {
    ui.notifications.warn(`Table ${tableName} not found.`, {});
    return;
  }

}

async function createRandomNPC(data) {  
  const instantNPC = await Actor.create(data);     
}


/*================================================
*/

  
    let tmp = `<h3>Atributos</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.abilities)}</p>`;
    tmp += `<h3>Movimento</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.attributes.movement)}</p>`;
    tmp += `<h3>Alinhamento</h3>`;
    tmp += `<p>${inside[0].data.data.details.alignment}</p>`;    
    tmp += `<h3>Condições - Imunidades</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.traits.ci.value)}</p>`;
    tmp += `<h3>Condições - Resistências</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.traits.di.value)}</p>`;
    tmp += `<h3>Dano - Imunidades</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.traits.dr.value)}</p>`;
    tmp += `<h3>Dano - Resistências</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.traits.dv.value)}</p>`;
    tmp += `<h3>Sentidos</h3>`;
    tmp += `<p>${JSON.stringify(inside[0].data.data.traits.senses)}</p>`;

    tmp += `<h2>Itens</h2>`;
    for (const item of inside[0].data.items){ 
      tmp += `<h3>${item.name}</h3>`;
      tmp += `<p>${item.data.description.value}</p>`;    
    }

    createRandomNPC({
      name: inside[0].data.name,
      type: "npc",
      img: inside[0].data.img,    
      sort: 12000,
      data: {},
      token: {},
      items: [],
      flags: {},
      folder: "bzdFbnjNQdbrup4s",
      data: {
        details: {
          biography: tmp
        },
        attributes: {
          damage: {
            value: ""
          },
          ac: {
            value: inside[0].data.data.attributes.ac.value
          },
          hp: {
            max: inside[0].data.data.attributes.hp.max,     
            value: inside[0].data.data.attributes.hp.max
          },
          specialQualities: {
            value: inside[0].data.data.details.type    
          }
        }      
      }
    });    
    
  