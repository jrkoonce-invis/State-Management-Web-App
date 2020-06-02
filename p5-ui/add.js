
class AddButton {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        push()
        translate(this.x, this.y)
        stroke("grey")
        fill(220)
        rect(0, 0, this.w, this.h, 10)
        pop()
    }
}