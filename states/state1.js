
function preload() {
    game.load.spritesheet('chief', 'assets/chief.png', 32, 32);
}

function create() {
    game.stage.backgroundColor = "#4d4d4d";

    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    graphics.drawRect(0, 2 * 230, 2 * 256, 40);


    var sprite = game.add.sprite(10, 2 * 200, 'chief');
    sprite.scale.setTo(2);
}

function update() {
}

let state1 = {
    preload: preload,
    create: create,
    update: update
};
