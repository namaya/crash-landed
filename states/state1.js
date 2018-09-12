
// Game Assets
var chief;
var plufo;
var balls = [];
var blasts = [];

var cursors;

// Game State
var chiefIsFacingRight;
var ballJustFinishedBlowingUp;
var ballJustStartedBlowingUp;
var intervalId;

function dispatchBlast() {
    var blast = game.add.sprite(chief.x, chief.y, 'blast');
    blast.animations.add('dispatch', [0, 1, 2, 3, 4]);
    blast.animations.play('dispatch', 12, false);
    game.physics.enable(blast);
    blast.body.velocity.setTo(0, -400);
    blast.body.immovable = true;
    blasts.push(blast);
}

function blowUpNewBall() {
    ballJustStartedBlowingUp = true;
    var ball = game.add.sprite(plufo.x, plufo.y + 10, 'ball');
    ball.animations.add('blow-up');
    ball.animations.play('blow-up', 4, false);
    game.physics.enable(ball);
    ball.body.velocity.setTo(200, 200);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.immovable = true;
    balls.push(ball);
}

function preload() {
    game.load.spritesheet('chief', 'assets/chief.png', 66, 71);
    game.load.image('plufo', 'assets/plufo.png');
    game.load.spritesheet('ball', 'assets/ball.png', 48, 48);
    game.load.spritesheet('blast', 'assets/blast.png', 69, 92);
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
    cursors.up.onDown.add(dispatchBlast);

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

    intervalId = setInterval(blowUpNewBall, 5000);
}

var plufoVelocityX;

function gameOverHandler() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].body.velocity.setTo(0,0);
    }
    clearInterval(intervalId);
    game.state.start("game-over");
}

function update() {
    chief.update();

    var collisionDetected = false;

    for (var i = 0; i < balls.length; i++) {
        game.physics.arcade.collide(chief, balls[i], gameOverHandler);
        for (var j = 0; j < blasts.length; j++) {
            game.physics.arcade.collide(balls[i], blasts[j], function() {
                balls[i].destroy();
                balls.splice(i, 1);
                i--;
                collisionDetected = true;
            });
            if (collisionDetected) {
                collisionDetected = false;
                break;
            }
        }
    }

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
