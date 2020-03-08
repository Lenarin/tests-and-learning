package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"test/models/miscelnarious"
	"test/responses"
	"time"

	"github.com/julienschmidt/httprouter"
)

// TimeStamp - handler of timestamp route
// GET /timestamp
func TimeStamp(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	writeOkResponse(w, &miscelnarious.TimeStamp{UNIX: time.Now().Unix(), UTC: time.Now().UTC()})
}

// Whoami - handler o whoami route
// GET /whoami
func Whoami(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	writeOkResponse(w, &miscelnarious.WhoAmI{IP: r.RemoteAddr, Language: r.Header.Get("Accept-Language"), Software: r.Header.Get("User-Agent")})
}

// Index - handle of route:
// GET /
func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Hello World!")
}

// Hello - handle of route
// GET /hello/:name
func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "Hello %s!\n", ps.ByName("name"))
}

func writeOkResponse(w http.ResponseWriter, m interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	if err := json.NewEncoder(w).Encode(responses.JSONResponse{Data: m}); err != nil {
		writeErrorResponse(w, http.StatusInternalServerError, "Internal Server Error")
	}
}

func writeErrorResponse(w http.ResponseWriter, errorCode int16, errorMsg string) {
	w.WriteHeader(http.StatusNotFound)
	response := responses.JSONErrorResponse{Error: &responses.APIError{Status: errorCode, Title: errorMsg}}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		panic(err)
	}
}

func populateModelFromHandler(r *http.Request, model interface{}) error {
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err != nil {
		return err
	}

	if err := r.Body.Close(); err != nil {
		return err
	}

	if err := json.Unmarshal(body, model); err != nil {
		return err
	}
	return nil
}
