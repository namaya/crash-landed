
function preload() {

}

function create() {
    game.stage.backgroundColor = 0x6e6e66;
    let style = { font: "30px Arial", fill: "#d5d3b1", align: "center" };
    let text = game.add.text(CANVAS_WIDTH/2, CANVAS_HEIGHT/2, "DESTROY YOUR ARCH-NEMESIS.\n\nPRESS ANY KEY\nTO CONTINUE.", style);
    text.anchor.setTo(0.5);
    text.align = "center";
    game.input.keyboard.onDownCallback = function() {
        game.state.start("state1");
    }
}

function update() {
}

let begin = {
    preload: preload,
    create: create,
    update: update
};
