import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { calculate } from './api/calculatorClient'
import type { CalculationRequest, Operation } from './api/types'
import { operations } from './api/types'
import './App.css'

type CalculationResult = {
  expression: string
  value: number
}

const operationLabels: Record<Operation, string> = {
  add: 'Addition',
  subtract: 'Subtraction',
  multiply: 'Multiplication',
  divide: 'Division',
  power: 'Exponentiation',
  sqrt: 'Square root',
  percentage: 'Percentage',
}

const operationHints: Record<Operation, string> = {
  add: 'a + b',
  subtract: 'a - b',
  multiply: 'a × b',
  divide: 'a ÷ b',
  power: 'aᵇ',
  sqrt: '√a',
  percentage: 'a% of b',
}

const operationSymbols: Record<Operation, string> = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
  power: '^',
  sqrt: '√',
  percentage: '%',
}

function App() {
  const [operation, setOperation] = useState<Operation>('add')
  const [firstOperand, setFirstOperand] = useState('')
  const [secondOperand, setSecondOperand] = useState('')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const needsSecondOperand = operation !== 'sqrt'
  const selectedHint = useMemo(() => operationHints[operation], [operation])
  const formulaPreview = getFormulaPreview(
    operation,
    firstOperand,
    secondOperand,
  )
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setResult(null)

    const a = parseNumber(firstOperand)
    const b = parseNumber(secondOperand)

    if (a === null) {
      setError('Enter a valid first number.')
      return
    }

    if (needsSecondOperand && b === null) {
      setError('Enter a valid second number.')
      return
    }

    const request: CalculationRequest = { operation, a }
    if (needsSecondOperand && b !== null) {
      request.b = b
    }

    setIsLoading(true)

    try {
      const response = await calculate(request)
      setResult({
        expression: getResultExpression(
          operation,
          String(a),
          needsSecondOperand && b !== null ? String(b) : '',
          response.result,
        ),
        value: response.result,
      })
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : 'Unable to calculate result.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleOperationChange(nextOperation: Operation) {
    setOperation(nextOperation)
    setError(null)
    setResult(null)
  }

  return (
    <main className="app-shell">
      <section className="calculator-panel" aria-labelledby="calculator-title">
        <div className="panel-header">
          <p className="eyebrow">React + Go REST API</p>
          <h1 id="calculator-title">Full-Stack Calculator</h1>
        </div>

        <form className="calculator-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Operation</span>
            <div className="select-shell">
              <span className="select-symbol" aria-hidden="true">
                {operationSymbols[operation]}
              </span>
              <select
                value={operation}
                onChange={(event) =>
                  handleOperationChange(event.target.value as Operation)
                }
              >
                {operations.map((availableOperation) => (
                  <option key={availableOperation} value={availableOperation}>
                    {operationLabels[availableOperation]}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <div className="operation-preview" aria-live="polite">
            <span>{formulaPreview || selectedHint}</span>
          </div>

          <div className="operand-grid">
            <label className="field">
              <span>
                {operation === 'sqrt' ? 'Number (a)' : 'First number (a)'}
              </span>
              <input
                type="number"
                inputMode="decimal"
                step="any"
                value={firstOperand}
                onChange={(event) => setFirstOperand(event.target.value)}
                placeholder="0"
              />
            </label>

            {needsSecondOperand ? (
              <label className="field">
                <span>
                  {operation === 'percentage' ? 'Total (b)' : 'Second number (b)'}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  value={secondOperand}
                  onChange={(event) => setSecondOperand(event.target.value)}
                  placeholder="0"
                />
              </label>
            ) : null}
          </div>

          <button className="calculate-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Calculate'}
          </button>
        </form>

        <section className="result-panel" aria-live="polite">
          {isLoading ? <p className="muted">Working...</p> : null}
          {!isLoading && error ? <p className="error-message">{error}</p> : null}
          {!isLoading && !error && result !== null ? (
            <div className="result-success">
              <div className="result-status" aria-hidden="true">
                ✓
              </div>
              <div className="result-content">
                <span className="result-label">Result</span>
                <p className="result-value">{formatResult(result.value)}</p>
                <p className="result-expression">{result.expression}</p>
              </div>
            </div>
          ) : null}
          {!isLoading && !error && result === null ? (
            <p className="muted">Ready</p>
          ) : null}
        </section>
      </section>
    </main>
  )
}

function parseNumber(value: string): number | null {
  if (value.trim() === '') {
    return null
  }

  const parsed = Number(value)

  return Number.isFinite(parsed) ? parsed : null
}

function formatResult(value: number): string {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)))
}

function displayValue(value: string, fallback: string): string {
  return value.trim() === '' ? fallback : value
}

function getFormulaPreview(
  operation: Operation,
  firstOperand: string,
  secondOperand: string,
): string {
  const a = displayValue(firstOperand, 'a')
  const b = displayValue(secondOperand, 'b')

  switch (operation) {
    case 'add':
      return `${a} + ${b}`
    case 'subtract':
      return `${a} − ${b}`
    case 'multiply':
      return `${a} × ${b}`
    case 'divide':
      return `${a} ÷ ${b}`
    case 'power':
      return `${a} ^ ${b}`
    case 'sqrt':
      return `√${a}`
    case 'percentage':
      return `${a}% of ${b}`
  }
}

function getResultExpression(
  operation: Operation,
  firstOperand: string,
  secondOperand: string,
  result: number,
): string {
  return `${getFormulaPreview(operation, firstOperand, secondOperand)} = ${formatResult(result)}`
}

export default App
