# A State Management App made in Go and p5.js

### Golang Backend
- serves index.html in the p5-ui/ folder
- api at *domain*/api serves data in the form of a post (simply text and a number)
- api allows for POST, DELETE, and GET requests
- existing posts stored in Mongodb database

### P5 Frontend (p5-ui/)
- With gui, interacts with the bacend in the following ways:
    - POST request -> adds post
    - DELET request -> delets post
    - GET request -> gets post

### Session Management
- Keeps tracks of users exsisting posts with cookies for session management
- Cookies store userid which are acessed in database

**Note**: Cookies are temporary and are just used for proof of concept. If I were to add to
this project, I would create a more permenant login system
