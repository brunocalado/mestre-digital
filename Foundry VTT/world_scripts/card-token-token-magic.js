// v0.1
// https://foundryvtt.wiki/en/basics/world-scripts

Hooks.on("createToken", async function addShadow(cardToken) {
//Hooks.on('createToken', (cardToken) => {

  // 
  if (!cardToken.actor.flags.world?.card) return;
  cardToken.updateSource({
    sight: {
      enabled: false // disable vision
    },
    displayName: 0
  });

  // TokenMagic
  await tokenMagicGlow(cardToken);

});

async function tokenMagicGlow(cardToken) {
  //await TokenMagic.deleteFilters(cardToken.object);

  let params = [{
      filterType: "glow",
      filterId: "superSpookyGlow",
      outerStrength: 4,
      innerStrength: 0,
      color: 0xdd1111,
      quality: 0.5,
      padding: 10,
      animated: {
        color: {
          active: true,
          loopDuration: 3000,
          animType: "colorOscillation",
          val1: 0xff1111,
          val2: 0x990000
        }
      }
    },
    {
      filterType: "shadow",
      filterId: "myShadow",
      rotation: 35,
      blur: 2,
      quality: 5,
      distance: 20,
      alpha: 0.7,
      padding: 10,
      shadowOnly: false,
      color: 0x000000,
      zOrder: 6000,
      animated: {
        blur: {
          active: true,
          loopDuration: 500,
          animType: "syncCosOscillation",
          val1: 2,
          val2: 4
        },
        rotation: {
          active: true,
          loopDuration: 100,
          animType: "syncSinOscillation",
          val1: 33,
          val2: 37
        }
      }
    }
  ];

  //await TokenMagic.addUpdateFilters(cardToken.object, params);  
  await TokenMagic.addFilters(cardToken.object, params);
  //await cardToken.object.TMFXaddUpdateFilters(params);

}