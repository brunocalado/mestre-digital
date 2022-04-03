// v0.2
const animationPath= 'jb2a.fireball.beam.orange';
const animationExplosionPath= "jb2a.explosion.01.orange";
const soundPath= "modules/avatar/sounds/fire_1.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

for (const target of targets) {
  new Sequence()
      .effect()
        .atLocation(source)
        .stretchTo(target)
        .file(animationPath)
        .repeats(3, 200, 300)
        .randomizeMirrorY()
      .wait(1900)
      .sound(soundPath)
      .wait(1200)
      .effect(animationExplosionPath)
        .atLocation(target)
        .scale(0.3, 0.6)
        .randomRotation()   
      .play();
}