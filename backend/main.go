package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", "user=root password=rootroot dbname=db sslmode=dsiable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Starting server...")
	app := fiber.New()

	// Set up CORS middleware with your configuration
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000", // Adjust according to your client URL
		AllowMethods:     "GET,POST,PUT,DELETE",
		AllowCredentials: true,
	}))

	app.Get("/", func(c *fiber.Ctx) error {

		return c.SendString("Hello from Go with Fiber!")
	})

	log.Fatal(app.Listen(":8000"))

}
