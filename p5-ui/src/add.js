
class AddButton {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw() {
        push()
        rectMode(CENTER)
        translate(this.x, this.y)
        stroke("grey")
        fill(220)
        rect(0, 0, this.w, this.h, 10)
        noStroke()
        fill("grey")
        rect(0, 0, this.w - 15, 9, 10)
        rect(0, 0, 9, this.h - 15, 10)
        pop()
    }

    gotClicked(x, y) {
        if (!outlineState
            && x > this.x - this.w / 2 
            && x < this.x + this.w / 2
            && y > this.y - this.h / 2
            && y < this.y + this.h / 2) {
            return true
        } else {
            return false
        }
    }

    clicked() {
        var postData = prompt("What do you want in your new post?")
        if (postData) {
            createPost(postData,  Math.random() * windowWidth, Math.random() * windowHeight)
        }
    }
}