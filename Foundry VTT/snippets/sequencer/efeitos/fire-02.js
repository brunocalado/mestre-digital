// v0.2
const animationExplosionPath= 'modules/jb2a_patreon/Library/Generic/Fire/ShieldFireAbove01_01_Regular_Orange_400x400.webm';
const animationPath= "modules/jb2a_patreon/Library/Generic/Fire/FireJet_01_Orange_15ft_600x200.webm";
const soundPath = "modules/avatar/sounds/fire_2.ogg";
const soundPath2 = "modules/avatar/sounds/fire_spell_2.ogg";
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
      .wait(2200)
      .effect(animationExplosionPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .randomRotation()           
        .sound(soundPath2) 
      .play();
}


