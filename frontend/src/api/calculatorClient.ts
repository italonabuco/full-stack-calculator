import type {
  CalculationRequest,
  CalculationResponse,
  ErrorResponse,
} from './types'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'

export async function calculate(
  request: CalculationRequest,
): Promise<CalculationResponse> {
  let response: Response

  try {
    response = await fetch(`${apiBaseUrl}/api/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  } catch {
    throw new Error('Unable to reach the calculator API.')
  }

  const payload: unknown = await response.json()

  if (!response.ok) {
    const error = payload as ErrorResponse
    throw new Error(error.error || 'Unable to calculate result.')
  }

  return payload as CalculationResponse
}
