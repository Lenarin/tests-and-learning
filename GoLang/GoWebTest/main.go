package main

import (
	"log"
	"net/http"
	"test/config"

	_ "github.com/lib/pq"
)

func main() {
	connStr := "user=postgres password=123 dbname=test_db sslmode=disable"
	db, err := config.NewDB(connStr)
	if err != nil {
		log.Panic(err)
	}
	defer db.Close()

	env := &config.Env{DB: db}

	router := NewRouter(AllRoutes(env))

	log.Fatal(http.ListenAndServe(":8080", router))
}
