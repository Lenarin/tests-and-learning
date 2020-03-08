package main

import (
	"github.com/julienschmidt/httprouter"
)

// NewRouter - returns pointer on a new router that can handle all routes and log them
func NewRouter(routes Routes) *httprouter.Router {
	router := httprouter.New()
	for _, route := range routes {
		var handle httprouter.Handle

		handle = route.HandleFunc
		handle = Logger(handle)

		router.Handle(route.Method, route.Path, handle)
	}

	return router
}
