package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetData() *mongo.Collection {
	clientOptions := options.Client().ApplyURI("...your url here...")
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
	collection := client.Database("GoSIte").Collection("Posts")
	return collection
}
