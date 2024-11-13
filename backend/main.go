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

type User struct {
	Username string `json.Username`
	Password string `json.Password`
}

type Login struct {
	HashedPassword string
	SessionToken   string
	CSRFToken      string
}

// Global database connection
var db *sql.DB

// Initialize the database connection
func initDB() {
	var err error
	// Change the connection string to match your PostgreSQL setup
	connectionString := "user=postgres password=rootroot dbname=gofinancedb sslmode=disable port=5433"
	db, err = sql.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	// Optionally check if the DB is alive
	if err := db.Ping(); err != nil {
		log.Fatal("Error pinging the database: ", err)
	}
	fmt.Println("Database connected successfully")
}

func register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "invalid method", er)
		return
	}
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{
		"message": "Hi from the backend!",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	initDB()
	defer db.Close()

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
	router.HandleFunc("/register", register)

	server := http.Server{
		Addr:    ":8080",
		Handler: stack(router),
	}
	log.Println("Starting server on port :8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server failed: ", err)
	}

}
