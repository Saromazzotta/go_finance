package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
	"github.com/saromazzotta/go_finance/middleware"
)

func main() {
	router := http.NewServeMux()

	server := http.Server{
		Addr:    ":8080",
		Handler: middleware.Logging(router),
	}
	log.Println("Starting server on port :8080")
	server.ListenAndServe()

	db, err := sql.Open("postgres", "user=root password=rootroot dbname=db sslmode=dsiable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Starting server...")

	// Routes

	// log.Fatal(app.Listen(":8000"))

}
