// v0.1
const animationPath = 'jb2a.energy_beam.normal.bluepink.02';
//const animationPath = '"modules/sequencer/samples/Bindings/chain.png"';
const soundPath= "modules/avatar/sounds/chain_metal_drop_on_floor_vs_02.ogg";
const source = canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);
let currentEffect = Sequencer.EffectManager.getEffects({source: source});

if( currentEffect.length != 0 ) {
  Sequencer.EffectManager.endEffects({source: source})
} else {
  for (const target of targets) {
    new Sequence()
        .effect()
            .file(animationPath)
            .attachTo(source)
            .stretchTo(target, { attachTo: true })
            .template({ gridSize: 200 })
            .tilingTexture()
            .scale(0.5)
            .belowTokens()
            .persist()
        .sound(soundPath)
        .play()
  }
}



