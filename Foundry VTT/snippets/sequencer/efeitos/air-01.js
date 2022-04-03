// v0.2
const animationPath= 'jb2a.gust_of_wind.default';
const animationExplosionPath= "modules/animated-spell-effects-cartoon/spell-effects/cartoon/air/air_puff_CIRCLE_02.webm";
const soundPath= "modules/avatar/sounds/magic_element_wind_03.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

for (const target of targets) {
  new Sequence()
      .effect()
        .atLocation(source)
        .stretchTo(target)
        .file(animationPath)
        .randomizeMirrorY()
        .sound(soundPath)
      .wait(2900)
      .effect(animationExplosionPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .randomRotation()   
      .play();
}