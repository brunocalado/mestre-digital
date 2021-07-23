const soundName = 'worlds/cycleofcerberusdw/sounds/cerberus.ogg';
const bbtoken = canvas.tokens.controlled[0];

AudioHelper.play({src: soundName, volume: 1.0, autoplay: true, loop: false}, true);

if(!canvas.scene._bossBars || !canvas.scene._bossBars[bbtoken.id]){
  if(game.user.isGM) {
    BossBar.panCamera(bbtoken);
    BossBar.create(bbtoken);
  }
}