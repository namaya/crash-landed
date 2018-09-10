
// Game Assets
var chief;
var plufo;
// var ball;
var cursors;

// Game State
var chiefIsFacingRight;
var ballJustFinishedBlowingUp;
var ballJustStartedBlowingUp;

function preload() {
    game.load.spritesheet('chief', 'assets/chief.png', 128, 128);
    game.load.image('plufo', 'assets/plufo.png');
    game.load.spritesheet('ball', 'assets/ball.png', 128, 128);
}

function create() {
    let bmd = game.add.bitmapData(CANVAS_WIDTH, CANVAS_HEIGHT);
    bmd.addToWorld();

    let NUM_STEPS = 75;
    let deltaY = CANVAS_HEIGHT / NUM_STEPS;
    var x = 0, y = 0;
    for (var i = 0; i < NUM_STEPS; i++) {
        let bgColor = Phaser.Color.interpolateColor(0x1f78e9, 0x72c5f8, NUM_STEPS, i); 
        bmd.rect(x, y, CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.Color.getWebRGB(bgColor)); 
        y += deltaY;
    }

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Draw background
    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x4f4638);
    graphics.lineStyle(2, 0x000000, 0.25);

    graphics.drawTriangle([new Phaser.Point(150, CANVAS_HEIGHT),
                           new Phaser.Point(CANVAS_WIDTH-200, 250),
                           new Phaser.Point(CANVAS_WIDTH, CANVAS_HEIGHT)]);

    graphics.beginFill(0x4f4638);
    graphics.drawTriangle([new Phaser.Point(0, CANVAS_HEIGHT),
                           new Phaser.Point(150, 200),
                           new Phaser.Point(300, CANVAS_HEIGHT)]);

    graphics.beginFill(0x429926);
    graphics.drawRect(0, 2 * 230, 2 * 256, 40);

    chief = game.add.sprite(10, 2 * 200, 'chief');
    chief.scale.setTo(0.75);
    plufo = game.add.sprite(CANVAS_WIDTH / 2, 50, 'plufo');
    plufo.anchor.set(0.5);
    // ball = game.add.sprite(50, 50, 'ball');
    
    game.physics.enable(chief, Phaser.Physics.ARCADE);
    game.physics.enable(plufo, Phaser.Physics.ARCADE);

    chief.body.collideWorldBounds = true;
    plufo.body.collideWorldBounds = true;
    plufo.body.bounce.set(1);
    plufo.body.velocity.setTo(100, 0);

    chief.animations.add('walk-right', [1, 2, 1, 3], 10);
    chief.animations.add('walk-left', [6, 7, 6, 8], 10);
    chief.animations.add('up-right', [4], 1);
    chief.animations.add('up-left', [9], 1);
    chief.animations.add("stand-right", [0], 1)
    chief.animations.add("stand-left", [5], 1);

    // ball.animations.add('blow-up');

    cursors = game.input.keyboard.createCursorKeys();

    // Initial Game State
    chiefIsFacingRight = true;
    ballJustFinishedBlowingUp = false;
    ballJustStartedBlowingUp = true;

    // Update function
    chief.update = function() {
        if (cursors.right.isDown) {
            chief.animations.play('walk-right', 12, true);
            chief.x += 4;
            chiefIsFacingRight = true;
        } else if (cursors.left.isDown) {
            chief.animations.play('walk-left', 12, true);
            chief.x -= 4;
            chiefIsFacingRight = false;
        } else if (cursors.up.isDown) {
            if (chiefIsFacingRight) {
                chief.animations.play("up-right");
            } else {
                chief.animations.play("up-left");
            }
        } else {
            if (chiefIsFacingRight) {
                chief.animations.play("stand-right");
            } else {
                chief.animations.play("stand-left");
            }
        }
    }

    // setInterval(blowUpNewBall, 3000);
}

var plufoVelocityX;

function update() {
    chief.update();

    // let blowUpAnimation = ball.animations.getAnimation('blow-up');

    // if (blowUpAnimation.isPlaying) {
    //     if (ballJustStartedBlowingUp) {
    //         plufoVelocityX = plufo.body.velocity.x;
    //         ballJustStartedBlowingUp = false;
    //         console.log(plufoVelocityX);
    //     }
    //     plufo.body.velocity.setTo(0, 0);
    //     ballJustFinishedBlowingUp = true;
    // } else {
    //     if (ballJustFinishedBlowingUp) {
    //         console.log(plufoVelocityX);
    //         plufo.body.velocity.setTo(plufoVelocityX, 0);
    //         ballJustFinishedBlowingUp = false;
    //         ballJustStartedBlowingUp = true;
    //     }
    // }

}

let state1 = {
    preload: preload,
    create: create,
    update: update
};
