// v0.1
const animationPath= 'modules/animated-spell-effects-cartoon/spell-effects/cartoon/earth/earth_explosion_SQUARE_02.webm';
const animationExplosionPath= "modules/animated-spell-effects-cartoon/spell-effects/cartoon/earth/earth_slam_RECTANGLE_01.webm";
const soundPath= "modules/avatar/sounds/earth_spell_2.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

new Sequence()
    .effect(animationPath)
      .atLocation(source)
      .randomizeMirrorY()
    .wait(900)
    .play();

for (const target of targets) {
  new Sequence()
      .effect(animationExplosionPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .repeats(3, 200, 300)
        .randomRotation()   
      .sound(soundPath)
      .play();
}