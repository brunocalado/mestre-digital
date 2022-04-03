// v0.1
const animationPath= 'modules/jb2a_patreon/Library/Generic/Liquid/LiquidSplash01_Bright_Blue_400x400.webm';
const animationExplosionPath= "modules/jb2a_patreon/Library/Generic/Liquid/LiquidSplashSide01_Bright_Blue_600x600.webm";
const soundPath= "modules/avatar/sounds/magic_element_water_01.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

for (const target of targets) {
  new Sequence()
        .effect()
          .atLocation(source)
          .stretchTo(target)
          .file(animationExplosionPath)
      .wait(900)
      .play();

  new Sequence()
      .effect(animationPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .repeats(3, 200, 300)
        .randomRotation()   
      .sound(soundPath)
      .play();
}
