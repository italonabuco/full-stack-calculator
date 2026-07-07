package main

import (
	"log"
	"net/http"
	"os"

	"full-stack-calculator/backend/internal/api"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	server := api.NewServer()
	address := ":" + port

	log.Printf("calculator API listening on %s", address)
	if err := http.ListenAndServe(address, server.Routes()); err != nil {
		log.Fatal(err)
	}
}
