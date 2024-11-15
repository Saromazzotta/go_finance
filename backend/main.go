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
	FirstName       string `json:"firstName"`
	LastName        string `json:"lastName"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirmPassword"`
}

type Login struct {
	HashedPassword string
	SessionToken   string
	CSRFToken      string
}

// Global database connection
var db *sql.DB

// ------------------- Initialize the database connection -------------------------------------
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

// --------------- Registration Function --------------------------------------------------
func register(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
	}
	log.Printf("Received user: %+v\n", user)

	// ---------------------- Validiaton ---------------------------------------------------
	if len(user.Username) < 6 {
		http.Error(w, "Username must be at least 6 characters long", http.StatusBadRequest)
		return
	}

	if len(user.Password) < 6 {
		http.Error(w, "Password must be at least 6 characters long", http.StatusBadRequest)
	}

	if user.Password != user.ConfirmPassword {
		http.Error(w, "Passwords do not match", http.StatusBadRequest)
		return
	}

	// Hash the password before saving it
	hashedPassword, err := middleware.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	stmt := `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`

	_, err = db.Exec(stmt, user.FirstName, user.LastName, user.Username, hashedPassword)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		log.Println("Database error:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
	fmt.Fprintln(w, "User registered successfully")

}

// func testHandler(w http.ResponseWriter, r *http.Request) {
// 	response := map[string]string{
// 		"message": "Hi from the backend!",
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(response)
// }

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

	// -------------------- Routes-----------------------------
	// router.HandleFunc("/hello", testHandler)
	router.HandleFunc("/api/users/register", register)

	server := http.Server{
		Addr:    ":8080",
		Handler: stack(router),
	}
	log.Println("Starting server on port :8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server failed: ", err)
	}

}
