import { afterEach, describe, expect, it, vi } from 'vitest'
import { calculate } from './calculatorClient'

describe('calculate', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('posts calculation requests and returns successful responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ operation: 'add', result: 15 }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }),
    )

    await expect(calculate({ operation: 'add', a: 10, b: 5 })).resolves.toEqual({
      operation: 'add',
      result: 15,
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/calculate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'add', a: 10, b: 5 }),
      },
    )
  })

  it('throws API error messages from failed responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ error: 'division by zero' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }),
    )

    await expect(calculate({ operation: 'divide', a: 10, b: 0 })).rejects.toThrow(
      'division by zero',
    )
  })

  it('throws a friendly message when the API cannot be reached', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network failure'))

    await expect(calculate({ operation: 'sqrt', a: 25 })).rejects.toThrow(
      'Unable to reach the calculator API.',
    )
  })
})
