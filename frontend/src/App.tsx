import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { calculate } from './api/calculatorClient'
import type { CalculationRequest, Operation } from './api/types'
import { operations } from './api/types'
import './App.css'

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
  multiply: 'a x b',
  divide: 'a / b',
  power: 'a ^ b',
  sqrt: 'sqrt(a)',
  percentage: 'a% of b',
}

function App() {
  const [operation, setOperation] = useState<Operation>('add')
  const [firstOperand, setFirstOperand] = useState('')
  const [secondOperand, setSecondOperand] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const needsSecondOperand = operation !== 'sqrt'
  const selectedHint = useMemo(() => operationHints[operation], [operation])

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
      setResult(response.result)
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
          </label>

          <div className="operation-preview" aria-live="polite">
            {selectedHint}
          </div>

          <div className="operand-grid">
            <label className="field">
              <span>{operation === 'sqrt' ? 'Number' : 'First number'}</span>
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
                  {operation === 'percentage' ? 'Total' : 'Second number'}
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
          <span className="result-label">Result</span>
          {isLoading ? <p className="muted">Working...</p> : null}
          {!isLoading && error ? <p className="error-message">{error}</p> : null}
          {!isLoading && !error && result !== null ? (
            <p className="result-value">{formatResult(result)}</p>
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

export default App
