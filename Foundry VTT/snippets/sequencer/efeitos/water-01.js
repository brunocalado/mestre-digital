// v0.2
const animationPath= 'modules/animated-spell-effects-cartoon/spell-effects/cartoon/water/water_blast_RAY_01.webm';
const animationExplosionPath= "modules/animated-spell-effects-cartoon/spell-effects/cartoon/water/create_water_CIRCLE_01.webm";
const soundPath= "modules/avatar/sounds/magic_element_water_02.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

for (const target of targets) {
  new Sequence()
      .effect()
        .atLocation(source)
        .reachTowards(target)
        .file(animationPath)
        .repeats(3, 200, 300)
        .randomizeMirrorY()
        .sound(soundPath)
      .wait(900)
      .effect(animationExplosionPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .randomRotation()   
      .play();
}

