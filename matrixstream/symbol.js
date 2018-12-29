class Symbol {
    constructor(idx, max, x, y) {
        this.idx = idx;

        this.x = x;
        this.y = y;

        this.speed = (idx == 0 || round(random(20)) != 0) ? symbolSize : 2 * symbolSize;

        var alpha = map(idx, 0, max, 255, 0);

        if (idx < round(random(4)))
            this.col = color(140, 255, 190, alpha);
        else
            this.col = color(0, 255, 70, alpha);

        if (idx < max)
            this.next = new Symbol(idx + 1, max, x, y - symbolSize);

        this.setRandomValue();
    }

    setRandomValue() {
        if (this.next) {
            var rng = round(random(12));
            if (rng != 0)
                this.next.value = this.value;
        }

        var charType = round(random(6));
        if (charType == 0)
            this.value = round(random(9));
        else
            this.value = String.fromCharCode(0x30A0 + round(random(95)));
    }

    fall() {
        this.y = (this.y > height + symbolSize) ? -symbolSize : this.y += this.speed;
        if (this.next)
            this.next.fall();
    }

    show() {
        if (this.y < -symbolSize) return;

        fill(this.col);
        text(this.value, this.x, this.y);

        if (this.next) this.next.show();

        this.setRandomValue();
    }
}