const url = 'http://localhost:5000/api'

function getData() {
    fetch(url)
        .then(response => response.json())
        .then(results => {
            results.forEach(result => {
                posts.push(new Post(Math.random() * windowWidth, Math.random() * windowHeight, result.text))
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        })
}

function createPost(text, number, x, y) {
    let data = { text: text, number: number }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    posts.push(new Post(x, y, text))
}