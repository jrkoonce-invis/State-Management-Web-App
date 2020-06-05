outlineState = false

// Colors
inProgress = [237, 242, 141]
inProgressOutline = [228, 202, 118]
notStarted = [245, 91, 75]
notStartedOutline = [216, 63, 63]
completed = [221, 247, 168]
completedOutline = [141, 193, 121]

class Post {
	constructor(x, y, text, number) {
		this.x = x
		this.y = y
        this.message = text
        this.number = number
        
        this.color = completed
        this.outlineColor = completedOutline

        this.size = 0
        this.offset = this.size * .5

		this.max = 100
        this.growSpeed = 5
        
        this.hoverState = false
        this.moveState = false
        this.newX = -1
        this.newY = -1
	}

	update() {
        push()
        
        if (this.moveState) {
            this.move(this.newX, this.newY)
        }

		translate(this.x, this.y)

		if (this.size < this.max) {
            this.size += this.growSpeed
            this.offset = this.size * .5
			rotate(2 * PI / this.max * this.size)
        }

        strokeWeight(5)
        if (!this.hoverState) {
            stroke(this.outlineColor[0], this.outlineColor[1], this.outlineColor[2])
        } else {
            stroke(150)
        }

        fill(this.color[0], this.color[1], this.color[2])
		rect(0 - this.offset, 0 - this.offset, this.size, this.size, 15)

		scale(this.size / this.max)
		textAlign(CENTER)
		textFont('Helvetica')
		textSize(13)
		noStroke()
		fill("grey")
        text(this.message, 0, 5)

        this.colorCheck()

		pop()
    }
    
    clicked() {
        outlineState = true
        posts.push(new Outline(this))
    }

    gotClicked(x, y) {
        if (!outlineState
            && x > this.x - this.offset 
            && x < this.x - this.offset + this.size 
            && y > this.y - this.offset 
            && y < this.y - this.offset + this.size) {
            return true
        } else {
            return false
        }

    }

    move() {
        if (abs(this.newX - this.x) < 1
            && abs(this.newY - this.y) < 1) {
            this.moveState = false
        } else {
            this.x += (this.newX - this.x) / 10
            this.y += (this.newY - this.y) / 10
            mouseMoved()
        }
    }

    colorCheck() {
        if (this.x >= secondThird) {
            this.color = completed
            this.outlineColor = completedOutline
        } else if (this.x <= firstThird) {
            this.color = notStarted
            this.outlineColor = notStartedOutline
        } else {
            this.color = inProgress
            this.outlineColor = inProgressOutline
        }
    }

    delete() {
        for (let i = 0; i < posts.length; i++){
            if (posts[i] === this) {
                posts.splice(i, 1)
                break
            }
        }
        deletePost(this.number)
        posts.splice(posts.length - 1, 1)
        outlineState = false
    }
}

class Outline {
    constructor(obj) {
        this.x = mouseX
        this.y = mouseY

        this.leaveState = false
        this.alpha = 120

        this.size = obj.size
        this.offset = this.size * .5

        this.obj = obj
    }

    update() {
        push()
        if (this.leaveState) {
            if (this.alpha == 0) {
                posts.pop()
                outlineState = false
            } else {
                this.alpha -= 10
            }
        } else {
            this.x = mouseX
            this.y = mouseY
        }

        translate(this.x, this.y)

        fill(this.obj.color[0], this.obj.color[1], this.obj.color[2], this.alpha)
		strokeWeight(5)
		stroke(this.obj.outlineColor[0], this.obj.outlineColor[1], this.obj.outlineColor[2], this.alpha)
        rect(0 - this.offset, 0 - this.offset, this.size, this.size, 15)
        pop()
    }

    gotClicked(x, y) {
        if (x > this.x - this.offset 
            && x < this.x - this.offset + this.size 
            && y > this.y - this.offset 
            && y < this.y - this.offset + this.size) {
            return true
        } else {
            return false
        }
    }

    clicked() {
        this.obj.moveState = true
        this.obj.newX = mouseX
        this.obj.newY = mouseY
        this.leaveState = true

        for (let i = 0; i < posts.length; i++) {
            if (posts[i] === this.obj){
                posts = posts.slice(0, i).concat(posts.slice(i + 1, posts.length))
                posts.splice(posts.length - 1, 0, this.obj)
            }
        }
    }
}