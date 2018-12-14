class Piece {
    constructor(type) {
        this.type = type;
        this.promoted = false;
    }

    draw() {
        strokeWeight(2);
        stroke(0);
        fill(this.type == 0 ? whitePieceColor : blackPieceColor);
        ellipse(0, 0, 40);
        
        if (this.promoted) {
            strokeWeight(2);
            stroke(this.type == 0 ? blackPieceColor : whitePieceColor);
            fill(this.type == 0 ? blackPieceColor : whitePieceColor);
            textAlign(CENTER, CENTER);
            text("D", 0, 0);
        }
    }
}