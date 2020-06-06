package db

import (
	"MySite/api/models"
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetData() *mongo.Collection {
	uri := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		fmt.Println(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	defer cancel()
	if err != nil {
		fmt.Println(err)
	}
	collection := client.Database("GoSIte").Collection("Users")

	return collection
}

func AddUser() int {
	uri := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		fmt.Println(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	defer cancel()
	if err != nil {
		fmt.Println(err)
	}
	collection := client.Database("GoSIte").Collection("Users")

	max := 0
	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find())
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.TODO()) {

		var elem models.User
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}

		if elem.Userid > max {
			max = elem.Userid
		}
	}

	nextNum := max + 1
	newUser := models.User{Userid: nextNum, Posts: []models.Post{}}

	_, err = collection.InsertOne(context.TODO(), newUser)
	if err != nil {
		log.Fatal(err)
	}

	return nextNum
}
