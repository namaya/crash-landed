
function preload() {

}

function create() {
    game.stage.backgroundColor = 0x6e6e66;
    let style = { font: "60px Arial", fill: "#d5d3b1", align: "center" };
    let text = game.add.text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, "GAME OVER!\nSCORE: " + score, style);
    text.anchor.setTo(0.5);
    text.align = "center";
}

function update() {

}

let gameOver = {
    preload: preload,
    create: create,
    update: update
};
