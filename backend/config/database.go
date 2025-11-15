package config

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDB() {
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI environment variable is not set")
	}

	// Configure client options with retries and longer timeouts
	clientOptions := options.Client().
		ApplyURI(mongoURI).
		SetServerSelectionTimeout(60 * time.Second).
		SetConnectTimeout(60 * time.Second).
		SetSocketTimeout(60 * time.Second).
		SetMaxPoolSize(10).
		SetMinPoolSize(1).
		SetRetryWrites(true).
		SetRetryReads(true)

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	// Ping the database with a longer timeout
	pingCtx, pingCancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer pingCancel()

	err = client.Ping(pingCtx, nil)
	if err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	log.Println("Connected to MongoDB successfully!")

	dbName := os.Getenv("DB_NAME")
	if dbName == "" {
		dbName = "instagram_clone"
	}

	DB = client.Database(dbName)
}

func GetDB() *mongo.Database {
	return DB
}
