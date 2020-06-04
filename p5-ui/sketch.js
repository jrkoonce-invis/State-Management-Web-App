let posts = []
let postNum

let firstThird
let secondThird

let addButton

function myInputEvent() {
	console.log('you are typing: ', this.value());
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	firstThird = windowWidth / 3
	secondThird = 2 * windowWidth / 3
	 
	addButton = new AddButton(windowWidth - 1 * windowWidth / 20, 
							  windowHeight - 1 * windowWidth / 20, 
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
	if (addButton.gotClicked(mouseX, mouseY)) {
		addButton.clicked()
		clickedPost = true
	}

	for (let post of posts) {
		if (post.gotClicked(mouseX, mouseY)) {
			post.clicked()
			clickedPost = true
			break
		}
	}
}

function keyPressed() {
	if (outlineState && (keyCode === BACKSPACE || keyCode === DELETE)) {
		posts[posts.length - 1].obj.delete()
	}
}

function mouseMoved() {
	let onlyOne = false
	if (addButton.gotClicked(mouseX, mouseY)){
		onlyOne = true
	}
	for (let post of posts.slice().reverse()) {
		if (post.gotClicked(mouseX, mouseY) && !onlyOne) {
			post.hoverState = true
			onlyOne = true
		} else {
			post.hoverState = false
		}
	}
}