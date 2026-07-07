package calculator

import (
	"errors"
	"math"
)

type Operation string

const (
	OperationAdd        Operation = "add"
	OperationSubtract   Operation = "subtract"
	OperationMultiply   Operation = "multiply"
	OperationDivide     Operation = "divide"
	OperationPower      Operation = "power"
	OperationSquareRoot Operation = "sqrt"
	OperationPercentage Operation = "percentage"
)

var (
	ErrMissingOperation   = errors.New("operation is required")
	ErrUnsupported        = errors.New("unsupported operation")
	ErrMissingOperand     = errors.New("second operand is required for this operation")
	ErrDivisionByZero     = errors.New("division by zero")
	ErrNegativeSquareRoot = errors.New("square root is undefined for negative numbers")
)

type Input struct {
	Operation Operation
	A         float64
	B         *float64
}

type Result struct {
	Operation Operation
	Value     float64
}

func Calculate(input Input) (Result, error) {
	if input.Operation == "" {
		return Result{}, ErrMissingOperation
	}

	switch input.Operation {
	case OperationAdd:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}

		return result(input.Operation, input.A+b), nil
	case OperationSubtract:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}

		return result(input.Operation, input.A-b), nil
	case OperationMultiply:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}

		return result(input.Operation, input.A*b), nil
	case OperationDivide:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}
		if b == 0 {
			return Result{}, ErrDivisionByZero
		}

		return result(input.Operation, input.A/b), nil
	case OperationPower:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}

		return result(input.Operation, math.Pow(input.A, b)), nil
	case OperationSquareRoot:
		if input.A < 0 {
			return Result{}, ErrNegativeSquareRoot
		}

		return result(input.Operation, math.Sqrt(input.A)), nil
	case OperationPercentage:
		b, err := requiredSecondOperand(input.B)
		if err != nil {
			return Result{}, err
		}

		return result(input.Operation, input.A*b/100), nil
	default:
		return Result{}, ErrUnsupported
	}
}

func requiredSecondOperand(value *float64) (float64, error) {
	if value == nil {
		return 0, ErrMissingOperand
	}

	return *value, nil
}

func result(operation Operation, value float64) Result {
	return Result{
		Operation: operation,
		Value:     value,
	}
}
