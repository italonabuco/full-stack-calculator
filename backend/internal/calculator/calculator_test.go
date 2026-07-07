package calculator

import (
	"errors"
	"testing"
)

func TestCalculateBinaryOperations(t *testing.T) {
	tests := []struct {
		name      string
		operation Operation
		a         float64
		b         float64
		want      float64
	}{
		{name: "addition", operation: OperationAdd, a: 10, b: 5, want: 15},
		{name: "subtraction", operation: OperationSubtract, a: 10, b: 5, want: 5},
		{name: "multiplication", operation: OperationMultiply, a: 10, b: 5, want: 50},
		{name: "division", operation: OperationDivide, a: 10, b: 5, want: 2},
		{name: "power", operation: OperationPower, a: 2, b: 3, want: 8},
		{name: "percentage", operation: OperationPercentage, a: 20, b: 150, want: 30},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Calculate(Input{Operation: tt.operation, A: tt.a, B: &tt.b})
			if err != nil {
				t.Fatalf("Calculate returned error: %v", err)
			}

			if got.Operation != tt.operation {
				t.Fatalf("Calculate operation = %q, want %q", got.Operation, tt.operation)
			}
			if got.Value != tt.want {
				t.Fatalf("Calculate value = %v, want %v", got.Value, tt.want)
			}
		})
	}
}

func TestCalculateSquareRoot(t *testing.T) {
	got, err := Calculate(Input{Operation: OperationSquareRoot, A: 25})
	if err != nil {
		t.Fatalf("Calculate returned error: %v", err)
	}

	if got.Value != 5 {
		t.Fatalf("Calculate value = %v, want 5", got.Value)
	}
}

func TestCalculateErrors(t *testing.T) {
	zero := 0.0

	tests := []struct {
		name  string
		input Input
		want  error
	}{
		{name: "missing operation", input: Input{A: 1}, want: ErrMissingOperation},
		{name: "unsupported operation", input: Input{Operation: Operation("mod"), A: 1}, want: ErrUnsupported},
		{name: "missing second operand", input: Input{Operation: OperationAdd, A: 1}, want: ErrMissingOperand},
		{name: "division by zero", input: Input{Operation: OperationDivide, A: 1, B: &zero}, want: ErrDivisionByZero},
		{name: "negative square root", input: Input{Operation: OperationSquareRoot, A: -1}, want: ErrNegativeSquareRoot},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			_, err := Calculate(tt.input)
			if !errors.Is(err, tt.want) {
				t.Fatalf("Calculate error = %v, want %v", err, tt.want)
			}
		})
	}
}
