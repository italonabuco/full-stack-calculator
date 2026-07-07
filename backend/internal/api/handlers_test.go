package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHealth(t *testing.T) {
	response := sendRequest(t, http.MethodGet, "/health", "")

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}

	var body map[string]string
	decodeJSON(t, response, &body)

	if body["status"] != "ok" {
		t.Fatalf("status body = %q, want ok", body["status"])
	}
}

func TestCalculateSuccess(t *testing.T) {
	response := sendRequest(t, http.MethodPost, "/api/calculate", `{"operation":"add","a":10,"b":5}`)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}

	var body calculateResponse
	decodeJSON(t, response, &body)

	if body.Operation != "add" {
		t.Fatalf("operation = %q, want add", body.Operation)
	}
	if body.Result != 15 {
		t.Fatalf("result = %v, want 15", body.Result)
	}
}

func TestCalculateSquareRootSuccess(t *testing.T) {
	response := sendRequest(t, http.MethodPost, "/api/calculate", `{"operation":"sqrt","a":25}`)

	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusOK)
	}

	var body calculateResponse
	decodeJSON(t, response, &body)

	if body.Result != 5 {
		t.Fatalf("result = %v, want 5", body.Result)
	}
}

func TestCalculateValidationErrors(t *testing.T) {
	tests := []struct {
		name string
		body string
		want string
	}{
		{name: "invalid json", body: `{`, want: "request body must be valid JSON"},
		{name: "missing first operand", body: `{"operation":"add","b":5}`, want: "first operand is required"},
		{name: "missing operation", body: `{"a":10,"b":5}`, want: "operation is required"},
		{name: "missing second operand", body: `{"operation":"add","a":10}`, want: "second operand is required for this operation"},
		{name: "unsupported operation", body: `{"operation":"mod","a":10,"b":5}`, want: "unsupported operation"},
		{name: "division by zero", body: `{"operation":"divide","a":10,"b":0}`, want: "division by zero"},
		{name: "negative square root", body: `{"operation":"sqrt","a":-1}`, want: "square root is undefined for negative numbers"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			response := sendRequest(t, http.MethodPost, "/api/calculate", tt.body)

			if response.Code != http.StatusBadRequest {
				t.Fatalf("status = %d, want %d", response.Code, http.StatusBadRequest)
			}

			var body errorResponse
			decodeJSON(t, response, &body)

			if body.Error != tt.want {
				t.Fatalf("error = %q, want %q", body.Error, tt.want)
			}
		})
	}
}

func TestCORSPreflight(t *testing.T) {
	response := sendRequest(t, http.MethodOptions, "/api/calculate", "")

	if response.Code != http.StatusNoContent {
		t.Fatalf("status = %d, want %d", response.Code, http.StatusNoContent)
	}
	if response.Header().Get("Access-Control-Allow-Origin") != "http://localhost:5173" {
		t.Fatal("missing expected CORS origin header")
	}
}

func sendRequest(t *testing.T, method string, path string, body string) *httptest.ResponseRecorder {
	t.Helper()

	server := NewServer()
	request := httptest.NewRequest(method, path, bytes.NewBufferString(body))
	response := httptest.NewRecorder()

	server.Routes().ServeHTTP(response, request)

	return response
}

func decodeJSON(t *testing.T, response *httptest.ResponseRecorder, target any) {
	t.Helper()

	if contentType := response.Header().Get("Content-Type"); contentType != "application/json" {
		t.Fatalf("content type = %q, want application/json", contentType)
	}

	if err := json.NewDecoder(response.Body).Decode(target); err != nil {
		t.Fatalf("decode JSON response: %v", err)
	}
}
