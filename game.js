
let CANVAS_WIDTH = 2 * 256;
let CANVAS_HEIGHT = 2 * 240;

let game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO);

game.state.add('state1', state1)
game.state.add('game-over', gameOver);
game.state.start('state1')
