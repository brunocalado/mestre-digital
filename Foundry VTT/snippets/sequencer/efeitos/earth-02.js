// v0.1
const animationPath= 'modules/animated-spell-effects-cartoon/spell-effects/cartoon/earth/earth_explosion_SQUARE_02.webm';
const animationExplosionPath= "modules/jb2a_patreon/Library/Generic/Traps/Falling_Rocks/FallingRocks01Top_02_Regular_Grey_05x05ft_600x600.webm";
const soundPath= "modules/avatar/sounds/magic_element_earth_02.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

new Sequence()
    .effect(animationPath)
      .atLocation(source)
      .randomizeMirrorY()
    .wait(1100)
    .play();

for (const target of targets) {
  new Sequence()
      .effect(animationExplosionPath)
        .atLocation(target)
        .randomRotation()   
      .sound(soundPath)
      .play();
}