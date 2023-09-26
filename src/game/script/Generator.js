class Generator{
    sequence = [];

    nextFigure(){
        if(this.sequence.length === 0){
            this.nextSequence();
        }

        return new Figure(MATRIX_TYPE[this.sequence.pop()], canvas.width/(2*CELL_SIZE) - 1, 0);
    }

    nextSequence(){
        let types = ["Q", "I", "S", "Z", "J", "L", "T"];
        while(types.length) {
            let type_number = Math.floor(Math.random() * types.length);
            let type_name = types.splice(type_number, 1)[0];
            this.sequence.push(type_name);
        }
    }
}