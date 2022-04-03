// v0.2
const animationPath= 'jb2a.whirlwind.bluegrey02';
const animationExplosionPath= "modules/animated-spell-effects-cartoon/spell-effects/cartoon/air/air_puff_CIRCLE_02.webm";
const soundPath= "modules/avatar/sounds/magic_element_wind_01.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

new Sequence()
    .effect(animationExplosionPath)
      .atLocation(source)
      .scale(0.4, 0.7)
      .randomRotation()   
      .sound(soundPath)  
      .wait(500)        
      .play();
      
for (const target of targets) {
  new Sequence()
      .effect()
        .file(animationPath)
        .atLocation(target)
          .scaleToObject(2)
          .belowTokens()
          .fadeIn(1500, {ease: "easeOutCubic", delay: 500})
          .fadeOut(1500)
          .rotateIn(90, 2500, {ease: "easeInOutCubic"})
          .rotateOut(350, 1500, {ease: "easeInCubic"})
          .scaleIn(2, 2500, {ease: "easeInOutCubic"})
          .scaleOut(0, 1500, {ease: "easeInCubic"})     
      .wait(900)
      .play();
}

