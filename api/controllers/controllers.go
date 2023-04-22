package controllers

import (
	"MySite/api/db"
	"MySite/api/models"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func sessionMiddleware(c *gin.Context) int {

	cookie, err := c.Cookie("stateSessionCookie")
	if err != nil {
		strnum := strconv.Itoa(db.AddUser())
		c.SetCookie("stateSessionCookie", strnum, 300, "/", "https://state-management-demo.onrender.com", false, true)
		cookie = strnum
	}

	value, _ := strconv.Atoi(cookie)
	return value
}

func AddPost(c *gin.Context) {
	var post models.Post
	body := c.Request.Body
	data, _ := ioutil.ReadAll(body)

	err := json.Unmarshal(data, &post)
	if err != nil {
		fmt.Println(err)
	}

	userid := sessionMiddleware(c)
	collection := db.GetData()

	filter := bson.D{{"userid", userid}}
	update := bson.D{{"$push", bson.D{{"posts", post}}}}

	_, err = collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

}

func GetPosts(c *gin.Context) {
	var results []models.Post

	userid := sessionMiddleware(c)
	collection := db.GetData()

	var user models.User
	filter := bson.D{{"userid", userid}}

	err := collection.FindOne(context.TODO(), filter).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}

	for _, post := range user.Posts {
		results = append(results, post)
	}

	stuff, _ := json.Marshal(results)
	c.String(200, string(stuff))
}

func DeletePost(c *gin.Context) {
	param := c.Params.ByName("id")
	givenID, _ := strconv.Atoi(param)

	userid := sessionMiddleware(c)
	collection := db.GetData()

	filter := bson.D{{"userid", userid}}
	update := bson.D{{"$pull", bson.D{{"posts", bson.D{{"number", givenID}}}}}}

	_, err := collection.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		log.Fatal(err)
	}
}
