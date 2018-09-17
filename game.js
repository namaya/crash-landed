
let CANVAS_WIDTH = 2 * 256;
let CANVAS_HEIGHT = 2 * 240;

let game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO);

game.state.add('state1', state1);
game.state.add('game-over', gameOver);
game.state.add('begin', begin);
game.state.start('begin');

// // let _states = {
// //     "intro-screen", "level-1", "exit-screen"];
// class MyGame {

//     constructor(width, height) {
//         this.game = new Phaser.Game(width, height, Phaser.AUTO);
//         this._registerStates();
//     }

//     _registerStates() {
//         this.game.state.add(_states[0], {
//             preload: function() {},
//             create: function() {},
//             update: function() {}
//         });
//     }

//     play() {
//         this.game.state.start(_states[0]);
//     }
// }
