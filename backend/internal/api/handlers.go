package api

import (
	"encoding/json"
	"errors"
	"net/http"

	"full-stack-calculator/backend/internal/calculator"
)

type Server struct{}

type calculateRequest struct {
	Operation calculator.Operation `json:"operation"`
	A         *float64             `json:"a"`
	B         *float64             `json:"b,omitempty"`
}

type calculateResponse struct {
	Operation calculator.Operation `json:"operation"`
	Result    float64              `json:"result"`
}

type errorResponse struct {
	Error string `json:"error"`
}

func NewServer() Server {
	return Server{}
}

func (s Server) Routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", s.health)
	mux.HandleFunc("POST /api/calculate", s.calculate)

	return withCORS(mux)
}

func (s Server) health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s Server) calculate(w http.ResponseWriter, r *http.Request) {
	var request calculateRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeError(w, http.StatusBadRequest, "request body must be valid JSON")
		return
	}

	if request.A == nil {
		writeError(w, http.StatusBadRequest, "first operand is required")
		return
	}

	result, err := calculator.Calculate(calculator.Input{
		Operation: request.Operation,
		A:         *request.A,
		B:         request.B,
	})
	if err != nil {
		writeCalculatorError(w, err)
		return
	}

	writeJSON(w, http.StatusOK, calculateResponse{
		Operation: result.Operation,
		Result:    result.Value,
	})
}

func writeCalculatorError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, calculator.ErrMissingOperation):
		writeError(w, http.StatusBadRequest, "operation is required")
	case errors.Is(err, calculator.ErrUnsupported):
		writeError(w, http.StatusBadRequest, "unsupported operation")
	case errors.Is(err, calculator.ErrMissingOperand):
		writeError(w, http.StatusBadRequest, "second operand is required for this operation")
	case errors.Is(err, calculator.ErrDivisionByZero):
		writeError(w, http.StatusBadRequest, "division by zero")
	case errors.Is(err, calculator.ErrNegativeSquareRoot):
		writeError(w, http.StatusBadRequest, "square root is undefined for negative numbers")
	default:
		writeError(w, http.StatusInternalServerError, "unexpected server error")
	}
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{Error: message})
}
