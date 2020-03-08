package handlers

import (
	"net/http"
	"test/config"
	"test/models/shortener"

	"github.com/julienschmidt/httprouter"
)

// ShortenersIndex - return handler with given db for endpoint
// GET /urls
func ShortenersIndex(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		shorteners, err := shortener.GetAll(env.DB)
		if err != nil {
			writeErrorResponse(w, http.StatusNoContent, "No shorteners found")
			return
		}
		writeOkResponse(w, shorteners)
	}
}

// ShortenersRefirectByID - redirect to original URL from ID if it exists in DB
// GET /urls/:id
func ShortenersRefirectByID(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		id := ps.ByName("id")
		shortener, err := shortener.GetFirstByID(env.DB, id)
		if err != nil {
			writeErrorResponse(w, http.StatusNotFound, "404 Not Found")
		}
		http.Redirect(w, r, "http://"+shortener.OriginalURL, 301)
	}
}

// ShortenersPushNew - create new shortener object in DB with given URL and answer with object with id
// POST /urls {body contains: original_url, short_url}
func ShortenersPushNew(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		shr := new(shortener.Shortener)
		err := r.ParseForm()
		if err != nil {
			writeErrorResponse(w, http.StatusUnprocessableEntity, err.Error())
		}
		shr.OriginalURL = r.PostFormValue("original_url")
		if shr.OriginalURL == "" {
			writeErrorResponse(w, http.StatusUnprocessableEntity, "No URL")
		}
		shr.ShortURL = r.PostFormValue("short_url")
		shr, err = shortener.PushNew(env.DB, shr)
		if err != nil {
			writeErrorResponse(w, http.StatusBadRequest, err.Error())
		}
		writeOkResponse(w, shr)
	}
}

// ShortenerDeleteByID - delete shortener with given id from DB
// DELETE /urls/:id
func ShortenerDeleteByID(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		id := ps.ByName("id")
		shr, err := shortener.DeleteByID(env.DB, id)
		if err != nil {
			writeErrorResponse(w, http.StatusBadRequest, err.Error())
		}
		writeOkResponse(w, shr)
	}
}
