package handlers

import (
	"net/http"
	"net/http/httptest"
	"test/models/books"
	"testing"

	"github.com/julienschmidt/httprouter"
)

func TestBookIndex(t *testing.T) {
	testBook := &books.Book{
		ISDN:   "123",
		Title:  "Some guy",
		Author: "Another guy",
		Pages:  1488,
	}
	bookstore["111"] = testBook

	req1, err := http.NewRequest("GET", "/books", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr1 := newRequestRecorder(req1, "GET", "/books", BookIndex)
	if rr1.Code != 200 {
		t.Error("Expected response code to be 200")
	}

	er1 := `"meta":null,"data":[{"isdn":"123","title":"Some Guy","author":"Another guy","pages":1488}]\n`
	if rr1.Body.String() != er1 {
		t.Error("Wrong body")
	}
}

func newRequestRecorder(req *http.Request, method string, strPath string, fnHangler func(w http.ResponseWriter, r *http.Request, ps httprouter.Params)) *httptest.ResponseRecorder {
	router := httprouter.New()
	router.Handle(method, strPath, fnHangler)
	rr := httptest.NewRecorder()
	router.ServeHTTP(rr, req)
	return rr
}
