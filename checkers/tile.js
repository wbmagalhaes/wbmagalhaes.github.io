class Tile {
    constructor(pos, col) {
        this.position = pos.copy();
        this.coordX = 'abcdefgh'.charAt(pos.x);
        this.coordY = str(8 - pos.y);
        this.coord = this.coordX + this.coordY;

        this.col = col;

        this.hovered = false;
        this.selected = false;

        this.piece = null;
    }

    draw() {
        push();
        translate((this.position.x - 3.5) * tileSize, (this.position.y - 3.5) * tileSize);

        noStroke();
        fill(this.selected ? this.col.selected : this.hovered ? this.col.hovered : this.col.normal);

        rect(0, 0, tileSize, tileSize);

        textSize(16);
        fill(this.col.text);
        if (this.position.x == 0) {
            textAlign(LEFT, TOP);
            text(this.coordY, 3 - tileSize / 2, 3 - tileSize / 2);
        }

        if (this.position.y == 7) {
            textAlign(RIGHT, BOTTOM);
            text(this.coordX, tileSize / 2 - 3, tileSize / 2 - 3);
        }

        if (this.piece != null)
            this.piece.draw();

        pop();

        this.hovered = false;
    }

    select() {
        if (this.piece) {
            this.selected = true;
            selectedTile = this;
        }
    }

    unselect() {
        this.selected = false;
        selectedTile = null;
    }

    placePiece(piece) {
        if ((this.position.x + this.position.y) % 2 == 0)
            return;

        if (this.piece != null && this.piece.type == piece.type)
            return false;

        this.piece = piece;

        if (this.coordY == 1 && this.piece.type == 1)
            this.piece.promoted = true;

        if (this.coordY == 8 && this.piece.type == 0)
            this.piece.promoted = true;

        return true;
    }
}

class TileColor {
    constructor(n, h, t) {
        this.normal = n;
        this.hovered = h;
        this.text = t;

        this.selected = color(170, 170, 35);
    }
}