class Snake {
    constructor(idx, pos) {
        this.idx = idx;
        this.position = pos;
        this.dir = createVector(0, 0);
        this.tail = null;
        this.col = color(175, 175, 175);
    }

    update() {
        var newPos = this.position.copy().add(this.dir.copy().mult(tileSize));

        if (this.idx == 0 && this.checkCollision(newPos)) {
            this.col = color(155, 13, 13);
            lose();
        }
        else {
            this.position = newPos;

            if (this.tail != null) {
                this.tail.update();
                this.tail.dir = this.dir.copy();
            }

            if (this.position.x > width)
                this.position.x = 0;
            else if (this.position.x < 0)
                this.position.x = width;

            if (this.position.y > height)
                this.position.y = 0;
            else if (this.position.y < 0)
                this.position.y = height;
        }
    }

    draw() {
        if (this.tail != null)
            this.tail.draw();

        fill(this.col);
        rect(this.position.x, this.position.y, tileSize - 2, tileSize - 2);
    }

    move(newDir) {
        if (this.dir.x == 1 && newDir.x == -1)
            return;

        if (this.dir.x == -1 && newDir.x == 1)
            return;

        if (this.dir.y == 1 && newDir.y == -1)
            return;

        if (this.dir.y == -1 && newDir.y == 1)
            return;

        this.dir = newDir;
    }

    eat(foodPos) {
        if (samePlace(this.position, foodPos)) {
            this.grow();
            return true;
        }

        return false;
    }

    checkCollision(pos) {
        if (this.dir.mag() == 0)
            return false;

        if (this.tail != null && this.tail.checkCollision(pos))
            return true;

        if (this.idx != 0 && samePlace(this.position, pos)) {
            this.col = color(155, 13, 13);
            return true;
        }

        return false;
    }

    grow() {
        if (this.tail == null)
            this.tail = new Snake(this.idx + 1, this.position.copy());
        else
            this.tail.grow();
    }
}