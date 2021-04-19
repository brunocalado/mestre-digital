'let bName = 'worlds/western/rolladvantage/CAVALO3.png';
let aName = 'worlds/western/Bang/10.png';
let tok = canvas.tokens.controlled[0];
let img = tok.data.img;
let size = img === aName ? 2 : 1
tok.update({img: img, height: size})
img = (img == aName ? bName: aName);
tok.update({ img });
'