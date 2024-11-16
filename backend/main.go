package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

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
	Username     string
	Password     string
	SessionToken string
	CSRFToken    string
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
		return
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

// --------------------- LOGIN ----------------------------------------------------------
func login(w http.ResponseWriter, r *http.Request) {
	// Method Check
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
		return
	}

	var login Login

	// Decode json body
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		http.Error(w, "Invalid JSON payload", http.StatusBadRequest) // gives a 400 error
		return
	}

	// Validations
	if login.Username == "" || login.Password == "" {
		http.Error(w, "Username and password cannot be blank", http.StatusBadRequest)
		return
	}

	// Fetch user credentials from database
	var storedPassword string
	err = db.QueryRow("SELECT password FROM users WHERE username=$1", login.Username).Scan(&storedPassword)
	if err == sql.ErrNoRows {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	} else if err != nil {
		log.Println("Database error: ", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError) // returns a 500 error
		return
	}
	log.Printf("Fetched password from database: %s\n", storedPassword)

	// authenticate user

	if !middleware.CheckPasswordHash(login.Password, storedPassword) {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// genereate tokens with middleware
	login.SessionToken = middleware.GenerateToken(32)
	login.CSRFToken = middleware.GenerateToken(32)

	// set session cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    login.SessionToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: true,
	})

	// set CSRFToken cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "csrf_token",
		Value:    login.CSRFToken,
		Expires:  time.Now().Add(24 * time.Hour),
		HttpOnly: false, // needs to be accessible to the client-side
	})

	// store tokens in the database
	stmt := `
		INSERT INTO user_sessions (username, session_token, csrf_token, updated_at)
		VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
		ON CONFLICT (username) DO UPDATE
		SET session_token = EXCLUDED.session_token,
			csrf_token = EXCLUDED.csrf_token,
			updated_at = CURRENT_TIMESTAMP
	`

	log.Printf("Inserting session token for user: %s\n", login.Username)
	_, err = db.Exec(stmt, login.Username, login.SessionToken, login.CSRFToken)
	if err != nil {
		log.Println("Failed to save session token: ", err)
		http.Error(w, "Failed to log in ", http.StatusInternalServerError)
		return
	}

	// Log the successful login attempt
	log.Printf("Login Attempt: %+v\n", login)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful!"})
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
	router.HandleFunc("/api/users/login", login)

	server := http.Server{
		Addr:    ":8080",
		Handler: stack(router),
	}
	log.Println("Starting server on port :8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server failed: ", err)
	}

}
