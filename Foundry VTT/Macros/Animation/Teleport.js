//DAE Macro Execute, Effect Value = "Macro Name" @target
const lastArg = args[args.length - 1];
const tokenD = canvas.tokens.get(lastArg.tokenId) || token;

let range = await MeasuredTemplate.create({
    t: "circle",
    user: game.user._id,
    x: tokenD.x + canvas.grid.size / 2,
    y: tokenD.y + canvas.grid.size / 2,
    direction: 0,
    distance: 30,
    borderColor: "#FF0000"
});

let position = await warpgate.crosshairs.show();

range[0].delete();

let teleport_x = position.x;
let teleport_y = position.y;

new Sequence()
    .effect()
        .file("modules/animated-spell-effects-cartoon/spell-effects/cartoon/electricity/electric_ball_CIRCLE_06.webm")
        .atLocation(tokenD)
        .gridSize(200)
    .sound("Music/Sound_Effects/Lightning_eyes_01.wav").volume(0.2)
    .wait(100)
    .sound("Music/Sound_Effects/Run_in_10.wav").volume(0.2)
    .wait(200)
    .effect()
        .file(tokenD.data.img)
        .atLocation(tokenD)
        .scaleToObject()
        .fadeIn(50)
        .duration(550)
        .fadeOut(250)
        .filter("Blur")
        .belowTokens()
    .effect()
        .file("jb2a.chain_lightning.secondary.blue")
        .atLocation(tokenD)
        .reachTowards({
            x: teleport_x,
            y: teleport_y
        })
        .belowTokens()
    .wait(100)
    .animation()
        .on(tokenD)
        .teleportTo({
            x: teleport_x,
            y: teleport_y
        })
        .snapToGrid()
    .effect()
        .file("modules/animated-spell-effects-cartoon/spell-effects/cartoon/electricity/electric_ball_CIRCLE_06.webm")
        .atLocation(tokenD)
        .gridSize(200)
    .play();