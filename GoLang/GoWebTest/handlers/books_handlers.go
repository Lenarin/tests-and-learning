package handlers

import (
	"net/http"
	"test/models/books"

	"github.com/julienschmidt/httprouter"
)

var bookstore = make(map[string]*books.Book)

// BookCreate - handler of route:
// POST /books
func BookCreate(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	book := &books.Book{}
	if err := populateModelFromHandler(r, book); err != nil {
		writeErrorResponse(w, http.StatusUnprocessableEntity, "Unprocessable Entity")
	}
	bookstore[book.ISDN] = book
	writeOkResponse(w, book)
}

// BookIndex - handler of route:
// GET /books
func BookIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	books := []*books.Book{}
	for _, book := range bookstore {
		books = append(books, book)
	}
	writeOkResponse(w, books)
}

// BookShow - handler of route:
// GET /book/:isdn
func BookShow(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	isdn := ps.ByName("isdn")
	book, ok := bookstore[isdn]
	if !ok {
		writeErrorResponse(w, http.StatusNotFound, "Not Found")
		return
	}
	writeOkResponse(w, book)
}
