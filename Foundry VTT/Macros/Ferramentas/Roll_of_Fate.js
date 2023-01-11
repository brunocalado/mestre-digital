
const tokens = canvas.tokens.controlled;
const rand = Math.floor(Math.random() * tokens.length);
const name = tokens[rand].document.name;
const image = tokens[rand].document.texture.src;

ChatMessage.create({
 content: "<div style='font-size: 1.8em; margin: 1em 0; text-align: center;'><img src='" + image + "' style='max-width:6em;'><br>" + name + "</div>",
 whisper: [game.user.id]
});

/*

const tokens = canvas.tokens.controlled;
const rand = Math.floor(Math.random() * tokens.length);
const name = tokens[rand].document.name;
ChatMessage.create({
 content: "<div style='font-size: 1.8em; margin: 1em 0; text-align: center;'>" + name + "</div>",
 whisper: [game.user.id]
});
*/