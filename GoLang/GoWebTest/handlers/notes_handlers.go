package handlers

import (
	"log"
	"net/http"
	"strconv"
	"test/config"
	"test/models/notes"

	"github.com/julienschmidt/httprouter"
)

// NotesIndex - return handler with given db for endpoint
// GET /notes
func NotesIndex(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		notes, err := notes.AllNotes(env.DB)
		if err != nil {
			writeErrorResponse(w, http.StatusNotFound, "404 Not Found")
			return
		}
		writeOkResponse(w, notes)
	}
}

// NotesGetByID - return hanler with given db for endpoint
// GET /notes/:id
func NotesGetByID(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		id := ps.ByName("id")
		note, err := notes.GetByID(env.DB, id)
		if err != nil {
			writeErrorResponse(w, http.StatusNotFound, "404 Note with given ID not found")
			return
		}
		writeOkResponse(w, note)
	}
}

// NotesCreate - return a handler with given db for endpoint
// POST /notes {body contains: name. text}
func NotesCreate(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
		note := &notes.Note{}
		err := r.ParseForm()
		if err != nil {
			log.Println(err)
		}
		note.Name = r.PostFormValue("name")
		note.Text = r.PostFormValue("text")
		note, err = notes.PushNote(env.DB, note)
		if err != nil {
			writeErrorResponse(w, http.StatusUnprocessableEntity, err.Error())
			return
		}
		writeOkResponse(w, note)
	}
}

// NotesDelete - return a handler with giver db for endpoint
// DELETE /notes/:id
func NotesDelete(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		id := ps.ByName("id")
		note, err := notes.DeleteNoteByID(env.DB, id)
		if err != nil {
			writeErrorResponse(w, http.StatusUnprocessableEntity, err.Error())
			return
		}
		writeOkResponse(w, note)
	}
}

// NotesUpdate - return a handler with given db for endpoint
// UPDATE /notes {body contains: id, name. text}
func NotesUpdate(env *config.Env) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		note := &notes.Note{}
		err := r.ParseForm()
		if err != nil {
			writeErrorResponse(w, http.StatusUnprocessableEntity, err.Error())
			return
		}
		note.ID, err = strconv.Atoi(r.PostFormValue("id"))
		if err != nil {
			writeErrorResponse(w, http.StatusUnprocessableEntity, err.Error())
			return
		}
		note.Name = r.PostFormValue("name")
		note.Text = r.PostFormValue("text")
		note, err = notes.UpdateNote(env.DB, note)
		if err != nil {
			writeErrorResponse(w, http.StatusNotFound, err.Error())
			return
		}
		writeOkResponse(w, note)
	}
}
