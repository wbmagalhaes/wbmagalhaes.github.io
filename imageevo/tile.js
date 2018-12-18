class Tile {
    constructor(target) {
        this.target = target.levels;
        this.colors = [];
        this.finished = false;
    }

    addColor(c) {
        if (this.finished) return;

        var r = c.levels[0] + random(-30, 30);
        var g = c.levels[1] + random(-30, 30);
        var b = c.levels[2] + random(-30, 30);

        r = clamp(r, 0, 255);
        g = clamp(g, 0, 255);
        b = clamp(b, 0, 255);

        this.colors.push(color(r, g, b));
    }

    show() {
        if (this.colors.length == 0)
            return color(0);

        return this.colors[0];
    }

    resolve() {
        if (this.finished) return;

        if (this.colors.length > 1) {
            var closest = null;
            var dist = 256 * 3;

            for (var i = 0; i < this.colors.length; i++) {
                var levels = this.colors[i].levels;

                var r = abs(levels[0] - this.target[0]);
                var g = abs(levels[1] - this.target[1]);
                var b = abs(levels[2] - this.target[2]);

                var d = r + g + b;

                if (d < dist) {
                    dist = d;
                    closest = this.colors[i];
                }
            }

            if (dist == 0)
                this.finished = true;

            this.colors = [closest];
        }
    }

    reproduce(ts, i, j) {
        if (this.colors.length > 0) {
            var dir = int(random(4));
            switch (dir) {
                case 0: //UP
                    j--;
                    break;
                case 1: //DOWN
                    j++;
                    break;
                case 2: //LEFT
                    i++;
                    break;
                case 3: //RIGHT
                    i--;
                    break;
            }

            ts[i][j].addColor(this.colors[0]);
        }
    }
}