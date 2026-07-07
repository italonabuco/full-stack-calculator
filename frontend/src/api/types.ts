export const operations = [
  'add',
  'subtract',
  'multiply',
  'divide',
  'power',
  'sqrt',
  'percentage',
] as const

export type Operation = (typeof operations)[number]

export type HealthResponse = {
  status: 'ok' | (string & {})
}

export type CalculationRequest = {
  operation: Operation
  a: number
  b?: number
}

export type CalculationResponse = {
  operation: Operation
  result: number
}

export type ErrorResponse = {
  error: string
}
