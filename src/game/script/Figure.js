class Figure{
    matrix;
    x_coordinate;
    y_coordinate;

    constructor(matrix, x_coordinate, y_coordinate) {
        this.matrix = matrix;
        this.x_coordinate = x_coordinate;
        this.y_coordinate = y_coordinate;
    }

    drawFigure(context){
        for (let i = 0; i <  this.matrix.length; i++) {
            for (let j = 0; j < this.matrix.length; j++) {
                if (this.matrix[i][j]) {
                    context.fillStyle = FIGURE_COLOR;
                    context.fillRect((this.x_coordinate + j) * CELL_SIZE,
                        (this.y_coordinate + i) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                    context.strokeStyle = "white";
                    context.strokeRect((this.x_coordinate + j) * CELL_SIZE,
                        (this.y_coordinate + i) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                }
            }
        }
    }

    rotate(){
        let result = [];
        for (let i = this.matrix.length - 1; i >= 0; i--) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (!result[j]) {
                    result[j] = [];
                }
                result[j].push(this.matrix[i][j]);
            }
        }
        this.matrix = result;
    }
}