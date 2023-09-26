const FIGURE_COLOR = "red";
const FIELD_COLOR = "black";
const STROKE_COLOR = "white";
const CELL_SIZE = 30;
let audio = document.getElementById("audio");
let canvas = document.querySelector(".game_field");
let next_canvas = document.querySelector('#next_figure');
let mute_button =document.getElementById("mute_button");
let start_button = document.getElementById("startButton");
let exit_button = document.getElementById("exitButton");
let name = localStorage.getItem('current player');
let context = canvas.getContext("2d");
let manager = new LocalStorageManager();
let generator = new Generator();
let field = new Field(canvas);
let level = 1;
let level_time = 800;
let start_time = 0;
let figure = null;
let next_figure = null;
let game_over = true;
let score = 0;
let game_animation = null;
manager.updateScoreTable();
field.drawField();
drawNextFigure(next_canvas, next_figure)
mute_button.addEventListener("click", mute);
start_button.addEventListener("click", start);
exit_button.addEventListener("click", function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
    }
    location.href = "https://localhost/";
});
document.getElementById("current_record").innerHTML = score;
document.getElementById("current_level").innerHTML = level;

function mute(){
    if (event.which === 32) {
        event.preventDefault();
    }
    if(audio.volume === 0){
        audio.volume = 1;
        mute_button.textContent = "Mute";
    } else {
        audio.volume = 0;
        mute_button.textContent = "Unmute";
    }
}

function drawNextFigure(next_canvas, next_figure){
    let next_context = next_canvas.getContext('2d');
    for(let i = 0; i < next_canvas.height/CELL_SIZE; i++){
        for(let j = 0; j < next_canvas.width/CELL_SIZE; j++){
            if( next_figure &&
                (i>0 && j>0) &&
                i - 1 < next_figure.matrix.length &&
                next_figure.matrix[i-1][j-1]){
                next_context.fillStyle = FIGURE_COLOR;
            }
            else{
                next_context.fillStyle = FIELD_COLOR;
            }
            next_context.fillRect(j * CELL_SIZE, i * CELL_SIZE,
                CELL_SIZE, CELL_SIZE);
            next_context.strokeStyle = STROKE_COLOR;
            next_context.strokeRect(j * CELL_SIZE, i * CELL_SIZE,
                CELL_SIZE, CELL_SIZE);
        }
    }
}

const MATRIX_TYPE = {
    "Q": [[1, 1], [1, 1],],
    "I":[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    "S":[[0, 1, 1], [1, 1, 0], [0, 0, 0],],
    "Z":[[1, 1, 0], [0, 1, 1], [0, 0, 0],],
    "J":[[0, 1, 0], [0, 1, 0], [1, 1, 0],],
    "L":[[0, 1, 0], [0, 1, 0], [0, 1, 1],],
    "T":[[0, 1, 0], [1, 1, 1], [0, 0, 0],]
};

function refreshRecord(rows){
    switch (rows) {
        case 1:
            score += 100;
            break;
        case 2:
            score += 300;
            break;
        case 3:
            score += 700;
            break;
        case 4:
            score += 1500;
            break;
        default:
            break;
    }
    document.getElementById("current_record").innerHTML = score;
}

function game(time){
    context.clearRect(0,0,canvas.width,canvas.height);
    field.drawField();
    figure.drawFigure(context);
    audio.play();
    if(!field.isMovable(figure)){
        field.placeFigure(figure);
        if(game_over){
            gameOver();
            return;
        }
    }
    if(time - start_time >= level_time){
        figure.y_coordinate++;
        if(!field.isMovable(figure)){
            figure.y_coordinate--;
            field.placeFigure(figure);
            if(game_over){
                gameOver();
                return;
            }
            figure = next_figure;
            next_figure = generator.nextFigure();
            drawNextFigure(next_canvas, next_figure);
            refreshRecord(field.clearRow());
            if(level * 200 - 1 <= score){
                level_time -= 100;
                level++;
            }
            start_time = 0;
        }
        else {
            start_time = time;
        }
    }
    document.getElementById("current_level").innerHTML = level;
    game_animation = window.requestAnimationFrame(game);
}

function gameOver(){
    generator = new Generator();
    field = new Field(canvas);
    start_button.disabled = false;
    level = 1;
    level_time = 800;
    start_time = 0;
    figure = null;
    next_figure = null;
    game_over = true;
    game_animation = null;
    audio.pause();
    audio.currentTime = 0;
    cancelAnimationFrame(game_animation);
    showGameOverPanel();
    manager.addLocalStorageScore(name, score);
    manager.updateScoreTable();
    score = 0;
}

function showGameOverPanel(){
    context.fillStyle = "black";
    context.fillRect(0, canvas.height/2 - 100, canvas.width, 200);
    context.fillStyle = "red"
    context.font = "40px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20)
    context.fillText("Your score: " + score, canvas.width / 2, canvas.height / 2 + 20)
}

document.addEventListener("keydown", function(event){
    if(!game_over) {
        if (event.which === 37) {
            figure.x_coordinate -= 1;
            if (!field.isMovable(figure)) {
                figure.x_coordinate += 1;
            }
        } else if (event.which === 39) {
            figure.x_coordinate += 1;
            if (!field.isMovable(figure)) {
                figure.x_coordinate -= 1;
            }
        } else if (event.which === 40) {
            figure.y_coordinate += 1;
            if (!field.isMovable(figure)) {
                figure.y_coordinate -= 1;
            }
        } else if (event.which === 32) {
            while (field.isMovable(figure)) {
                figure.y_coordinate += 1;
            }
            figure.y_coordinate -= 1;
            start_time = 0;
        } else if (event.which === 38) {
            figure.rotate();
            if (!field.isMovable(figure)) {
                figure.rotate();
                figure.rotate();
                figure.rotate();
            }
        } else if (event.which === 77) {
            mute();
        }
    }
} );

function start(){
    start_button.disabled = true;
    game_over = false;
    figure = generator.nextFigure();
    next_figure = generator.nextFigure();
    drawNextFigure(next_canvas, next_figure);
    game_animation = window.requestAnimationFrame(game);
}
