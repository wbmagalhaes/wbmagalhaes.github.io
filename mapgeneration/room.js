class Room {
    constructor(x, y) {
        this.x = round(x);
        this.y = round(y);
        this.w = 1;
        this.h = 1;
        this.color = color(255);
    }

    show() {
        fill(this.color);
        rect(this.x * tileSize, this.y * tileSize, this.w * tileSize, this.h * tileSize);
    }

    expand() {
        var tilesToGrowUp = this.spaceToGrowUp();

        if (tilesToGrowUp) {
            tilesToGrowUp.forEach(tile => {
                tile.empty = false;
            });

            this.h += 1;
            this.y -= 0.5;

            this.color = color(255, 0, 0);
        }

        var tilesToGrowDown = this.spaceToGrowDown();

        if (tilesToGrowDown) {
            tilesToGrowDown.forEach(tile => {
                tile.empty = false;
            });

            this.h += 1;
            this.y += 0.5;

            this.color = color(255, 0, 0);
        }

        var tilesToGrowLeft = this.spaceToGrowLeft();

        if (tilesToGrowLeft) {
            tilesToGrowLeft.forEach(tile => {
                tile.empty = false;
            });

            this.w += 1;
            this.x -= 0.5;

            this.color = color(255, 0, 0);
        }

        var tilesToGrowRight = this.spaceToGrowRight();

        if (tilesToGrowRight) {
            tilesToGrowRight.forEach(tile => {
                tile.empty = false;
            });

            this.w += 1;
            this.x += 0.5;

            this.color = color(255, 0, 0);
        }
    }

    spaceToGrowUp() {
        var result = [];

        var dx = floor(this.w / 2.0);
        var dy = floor(this.h / 2.0);

        var xmin = floor(this.x) - dx;
        var xmax = ceil(this.x) + dx;
        var y = ceil(this.y) - dy - 1;

        for (var i = xmin; i <= xmax; i++) {
            var tile = getTile(i, y);

            if (!tile || !tile.empty)
                return false;

            result.push(tile);
        }

        return result;
    }

    spaceToGrowDown() {
        var result = [];

        var dx = floor(this.w / 2.0);
        var dy = floor(this.h / 2.0);

        var xmin = floor(this.x) - dx;
        var xmax = ceil(this.x) + dx;
        var y = floor(this.y) + dy + 1;

        for (var i = xmin; i <= xmax; i++) {
            var tile = getTile(i, y);

            if (!tile || !tile.empty)
                return false;

            result.push(tile);
        }

        return result;
    }

    spaceToGrowLeft() {
        var result = [];

        var dx = floor(this.w / 2.0);
        var dy = floor(this.h / 2.0);

        var x = ceil(this.x) - dx - 1;
        var ymin = floor(this.y) - dy;
        var ymax = ceil(this.y) + dy;

        for (var j = ymin; j <= ymax; j++) {
            var tile = getTile(x, j);

            if (!tile || !tile.empty)
                return false;

            result.push(tile);
        }

        return result;
    }

    spaceToGrowRight() {
        var result = [];

        var dx = floor(this.w / 2.0);
        var dy = floor(this.h / 2.0);

        var x = floor(this.x) + dx + 1;
        var ymin = floor(this.y) - dy;
        var ymax = ceil(this.y) + dy;

        for (var j = ymin; j <= ymax; j++) {
            var tile = getTile(x, j);

            if (!tile || !tile.empty)
                return false;

            result.push(tile);
        }

        return result;
    }
}