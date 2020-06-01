# A State Management App made in Go and p5.js

### Golang Backend
- serves index.html in the ui-dist/ folder
- api at localhost:5000/api serves data in the form of a post (simply text and a number)
- api allows for POST, DELETE, and GET requests
- existing posts stored in Mongodb database

### Default Frontend (ui-dist/index.html)
- simply performs a get request and shows the exsisting data

### P5 Frontend (p5-ui/)
- Currently not connected to backend and simply a ui for creating posts (in development...)

**Note**: If you want to use the p5 frontend, as of now you have to build the static files with webpack into the dist/ folder and replace the existing index.html file

### Future Additions
- I want to build a working version on Heroku
- I want to add a sort of login system
