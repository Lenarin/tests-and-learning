package main

import (
	"test/config"
	"test/handlers"

	"github.com/julienschmidt/httprouter"
)

// Route - typedef of basic route struct
type Route struct {
	Name       string
	Method     string
	Path       string
	HandleFunc httprouter.Handle
}

// Routes - array of Route
type Routes []Route

// AllRoutes return Routes with all Route's
func AllRoutes(env *config.Env) Routes {
	routes := Routes{
		Route{"Index", "GET", "/", handlers.Index},
		Route{"Hello", "GET", "/hello/:name", handlers.Hello},
		Route{"BookCreate", "POST", "/books", handlers.BookCreate},
		Route{"BookIndex", "GET", "/books", handlers.BookIndex},
		Route{"BookShow", "GET", "/books/:isdn", handlers.BookShow},
		Route{"WhoAmI", "GET", "/whoami", handlers.Whoami},
		Route{"TimeStamp", "GET", "/timestamp", handlers.TimeStamp},
		Route{"NotesIndex", "GET", "/notes", handlers.NotesIndex(env)},
		Route{"NotesCreate", "POST", "/notes", handlers.NotesCreate(env)},
		Route{"NotesDelete", "DELETE", "/notes/:id", handlers.NotesDelete(env)},
		Route{"NotesUpdate", "PUT", "/notes", handlers.NotesUpdate(env)},
		Route{"NotesGetByID", "GET", "/notes/:id", handlers.NotesGetByID(env)},
		Route{"ShortenersIndex", "GET", "/urls", handlers.ShortenersIndex(env)},
		Route{"ShortenersRedirectByOriginalURL", "GET", "/urls/:id", handlers.ShortenersRefirectByID(env)},
		Route{"ShortenersPushNew", "POST", "/urls", handlers.ShortenersPushNew(env)},
		Route{"ShortenersDeleteByID", "DELETE", "/urls/:id", handlers.ShortenerDeleteByID(env)},
	}
	return routes
}
