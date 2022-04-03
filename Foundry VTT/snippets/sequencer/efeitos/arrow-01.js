// v0.2
const animationPath= 'jb2a.arrow.cold.pink';
const soundPath= "modules/avatar/sounds/arrow_fly_21.ogg";
const source = await canvas.tokens.controlled[0];
const targets = await Array.from(game.user.targets);

for (const target of targets) {
  new Sequence()
      .effect()
        .atLocation(source)
        .stretchTo(target)
        .file(animationPath)
        .repeats(5, 200, 300)
        .sound(soundPath)
      .wait(1900)
      .play();
}

