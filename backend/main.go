package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/lib/pq"
	"github.com/saromazzotta/go_finance/middleware"
)

type Login struct {
	HashedPassword string
	SessionToken   string
	CSRFToken      string
}

func main() {
	// Initialize the database connection
	db, err := sql.Open("postgres", "user=root password=rootroot dbname=db sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Database connected succesfully")

	// Set up the router and middleware stack
	router := http.NewServeMux()

	stack := middleware.CreateStack(
		middleware.Logging,
		middleware.AllowCors,
		// middleware.IsAuthed,
		// middleware.CheckPermissions,
	)

	// Routes
	router.HandleFunc("/hello", testHandler)

	server := http.Server{
		Addr:    ":8080",
		Handler: stack(router),
	}
	log.Println("Starting server on port :8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server failed: ", err)
	}

}

func testHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Hi from the backend!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
