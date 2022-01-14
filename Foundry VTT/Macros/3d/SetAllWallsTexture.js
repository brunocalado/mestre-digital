const texturePath = '3d/textures/wildtextures_grey-tree-bark.jpg';
const doortexturePath = '3d/textures/wildtextures_grey-tree-bark.jpg';
const wallTopHeight = 10;

const walls = canvas.walls.controlled.length ? canvas.walls.controlled : canvas.walls.placeables;

const updates = walls.map(w => {
    const isDoor = w.data.door > 0;
    return {
        _id : w._id,
        flags : {
            "levels-3d-preview" : {
                "wallTexture" : isDoor ? doortexturePath : texturePath
            },
            "wallHeight" : {
                "wallHeightTop" : wallTopHeight
            }
        }
    }
});

canvas.scene.updateEmbeddedDocuments("Wall", updates)

/*
canvas.scene.data.walls.get('b8BVMnICXhnXWNbu').data.flags["levels-3d-preview"]
wallTexture

wallHeight.wallHeightTop

canvas.scene.data.walls.get('b8BVMnICXhnXWNbu').data.flags.wallHeight


{
    "wallTexture": "3d/textures/wildtextures_grey-tree-bark.jpg",
    "wallTint": "#ffffff",
    "stretchTex": false,
    "wallOpacity": 1,
    "wallDepth": 30,
    "alwaysVisible": false,
    "joinWall": false
}

*/