const url = '../../api'

function getData() {
    fetch(url, {
        credentials: "same-origin"
    })
        .then(response => response.json())
        .then(results => {
            results.forEach(result => {
                posts.push(new Post(Math.random() * windowWidth, Math.random() * windowHeight, result.text, result.number))
                postNum = posts[posts.length - 1].number
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
}

function createPost(text, x, y) {
    let data = { text: text, number: postNum + 1 }
    posts.push(new Post(x, y, text, postNum + 1))
    postNum++

    fetch(url, {
        credentials: "same-origin",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

function deletePost(id) {
    fetch(url + "/" + id, {
        credentials: "same-origin",
        method: "delete",
    })
}