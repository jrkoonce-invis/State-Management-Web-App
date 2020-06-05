package main

import (
	"MySite/api/controllers"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

const port string = ":5000"

func setupRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.Default())

	// Api
	router.GET("/api", controllers.GetPosts)
	router.POST("/api", controllers.AddPost)
	router.DELETE("/api/:id", controllers.DeletePost)

	// Site
	router.Static("/src", "./p5-ui/src")
	router.Static("/libraries", "./p5-ui/libraries")
	router.LoadHTMLFiles("./p5-ui/index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	return router
}

func main() {
	router := setupRouter()

	router.Run(port)
}
