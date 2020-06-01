let posts = []

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(220)

	// Dividers
	translate(0, 0)
	line(windowWidth / 3, 0, 0, windowWidth / 3, windowHeight)

	for (let post of posts) {
		post.update()
	}
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