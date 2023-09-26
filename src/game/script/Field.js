class Field{
    matrix = [];
    context;
    constructor(canvas) {
        for(let i = 0; i < canvas.height/CELL_SIZE; i++){
            this.matrix[i] = [];
            for(let j = 0; j < canvas.width/CELL_SIZE; j++){
                this.matrix[i][j] = 0;
            }
        }
        this.context = canvas.getContext("2d");
    }

    drawField(){
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[i].length; j++){
                if(this.matrix[i][j]){
                    this.context.fillStyle = FIGURE_COLOR;
                }
                else{
                    this.context.fillStyle = FIELD_COLOR;
                }
                this.context.fillRect(j * CELL_SIZE, i * CELL_SIZE,
                    CELL_SIZE, CELL_SIZE);
                this.context.strokeStyle = STROKE_COLOR;
                this.context.strokeRect(j * CELL_SIZE, i * CELL_SIZE,
                    CELL_SIZE, CELL_SIZE);
            }
        }
    }

    placeFigure(figure){
        for (let i = 0; i < figure.matrix.length; i++){
            for (let j = 0; j < figure.matrix.length; j++) {
                if(figure.matrix[i][j]){
                    if(figure.y_coordinate + i === 0){
                        game_over = true;
                        return;
                    }
                    this.matrix[figure.y_coordinate + i][figure.x_coordinate + j] = figure.matrix[i][j];
                }
            }
        }
    }

    clearRow(){
        let rows = 0;
        for(let i = this.matrix.length - 1; i >= 0;){
            if(this.matrix[i].every(cell => cell === 1)){
                rows++;
                for(let j = i; j > 0; j--){
                    for(let k = 0; k < this.matrix[j].length; k++){
                        this.matrix[j][k] = this.matrix[j-1][k];
                    }
                }
            }
            else{
                i--;
            }
        }
        return rows;
    }

    isMovable(figure){
        for (let i = 0; i < figure.matrix.length; i++){
            for (let j = 0; j < figure.matrix.length; j++){
                if (figure.matrix[i][j] && (
                    figure.x_coordinate + j < 0 ||
                    figure.x_coordinate + j >= this.matrix[0].length ||
                    figure.y_coordinate + i >= this.matrix.length||
                    this.matrix[figure.y_coordinate + i][figure.x_coordinate + j])
                ){
                    return false;
                }
            }
        }
        return true;
    }
}