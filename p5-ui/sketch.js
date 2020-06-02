let posts = []
let limbo = []

let firstThird
let secondThird

function setup() {
	createCanvas(windowWidth, windowHeight);

	firstThird = windowWidth / 3
	secondThird = 2 * windowWidth / 3

	addButton = new AddButton(windowWidth - 1.3 * windowWidth / 20, 
							  windowHeight - 1.3 * windowWidth / 20, 
							  windowWidth / 20, 
							  windowWidth / 20)

	getData()
}

function draw() {
	background(220)

	// Dividers
	translate(0, 0)
	strokeWeight(5)
	stroke(150)
	line(firstThird, 0, firstThird, windowHeight)
	line(secondThird, 0, secondThird, windowHeight)

	for (let post of posts) {
		post.update()
	}

	addButton.draw()
}

function mouseClicked() {
	let clickedPost = false
	for (let post of posts) {
		if (post.gotClicked(mouseX, mouseY)) {
			post.clicked()
			clickedPost = true
			break
		}
	}

	if (!clickedPost) {
		posts.push(new Post(mouseX, mouseY, "Hello World"))
	}
}

function mouseMoved() {
	let onlyOne = false
	for (let post of posts.slice().reverse()) {
		if (post.gotClicked(mouseX, mouseY) && !onlyOne) {
			post.hoverState = true
			onlyOne = true
		} else {
			post.hoverState = false
		}
	}
}