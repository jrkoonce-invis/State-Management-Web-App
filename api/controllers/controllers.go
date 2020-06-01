package controllers

import (
	"MySite/api/db"
	"MySite/api/models"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func AddPost(c *gin.Context) {

	var post models.Post
	body := c.Request.Body
	data, _ := ioutil.ReadAll(body)

	err := json.Unmarshal(data, &post)
	if err != nil {
		fmt.Println(err)
	}

	collection := db.GetData()
	insertResult, err := collection.InsertOne(context.TODO(), post)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a single document: ", insertResult.InsertedID)
}

func GetPosts(c *gin.Context) {
	var results []models.Post

	findOptions := options.Find()

	collection := db.GetData()
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {

		var elem models.Post
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		results = append(results, elem)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.TODO())

	stuff, _ := json.Marshal(results)
	c.String(200, string(stuff))
}

func DeletePost(c *gin.Context) {
	givenID := c.Param("id")
	collection := db.GetData()

	id, _ := primitive.ObjectIDFromHex(givenID)

	deleteResult, err := collection.DeleteOne(context.TODO(), bson.M{"_id": id})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("deleted count: %d\n", deleteResult.DeletedCount)
}
