package middleware

import (
	"fmt"
	"net/http"
)

// AllowCors sets the CORS headers for HTTP responses

func AllowCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Update with your frontend origin
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		fmt.Println("Enabling CORS")
		next.ServeHTTP(w, r)
	})
}
