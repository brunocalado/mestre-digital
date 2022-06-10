// https://raw.githubusercontent.com/dmrickey/ckl-foundry-macros/master/random-sequencer-effects/fireworks.js

const quantity = 15;
const path = 'jb2a.firework';

const width = game.canvas.screenDimensions[0];
const height = game.canvas.screenDimensions[1];

var sequence = new Sequence();
for (let i = 0; i < quantity; i++) {
    sequence.effect()
        .file(path)
        .screenSpace()
        .screenSpaceAnchor({ x: 0.5, y: 0.5 })
        .screenSpacePosition({
            x: width / 2 - Sequencer.Helpers.random_int_between(0, width - 200),
            y: height / 2 - Sequencer.Helpers.random_int_between(0, height - 100)
        })
        .scale(.8, 1.2)
        .delay(i * 400 + Sequencer.Helpers.random_int_between(0, 750))
        .fadeIn(100)
        .fadeOut(100);
}
await sequence.play();