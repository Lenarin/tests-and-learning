package responses

// JSONResponse used for responses with JSON data
// @param Meta - response metadata
// @param Data - response data
type JSONResponse struct {
	Meta interface{} `json:"meta"`
	Data interface{} `json:"data"`
}

// JSONErrorResponse used for errors with JSON
// @param Error - Error of APIError type (Yes it is)
type JSONErrorResponse struct {
	Error *APIError `json:"error"`
}

// APIError is type of error
// @param Status - numerable error status
// @param Title - title of error
type APIError struct {
	Status int16  `json:"status"`
	Title  string `json:"title"`
}
