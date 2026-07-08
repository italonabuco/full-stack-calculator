import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { calculate } from './api/calculatorClient'

vi.mock('./api/calculatorClient', () => ({
  calculate: vi.fn(),
}))

const mockedCalculate = vi.mocked(calculate)

describe('App', () => {
  beforeEach(() => {
    mockedCalculate.mockReset()
  })

  it('validates required numeric input before calling the API', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /calculate/i }))

    expect(await screen.findByText('Enter a valid first number.')).toBeInTheDocument()
    expect(mockedCalculate).not.toHaveBeenCalled()
  })

  it('updates labels and preview for square root operations', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/operation/i), 'sqrt')

    expect(screen.getByText('√a')).toBeInTheDocument()
    expect(screen.getByLabelText(/number \(a\)/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/second number|total/i)).not.toBeInTheDocument()
  })

  it('displays a successful result from the submitted values', async () => {
    mockedCalculate.mockResolvedValue({ operation: 'percentage', result: 5 })
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/operation/i), 'percentage')
    await user.type(screen.getByLabelText(/first number \(a\)/i), '5')
    await user.type(screen.getByLabelText(/total \(b\)/i), '100')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    expect(mockedCalculate).toHaveBeenCalledWith({
      operation: 'percentage',
      a: 5,
      b: 100,
    })
    expect(await screen.findByText('5% of 100 = 5')).toBeInTheDocument()

    await user.clear(screen.getByLabelText(/first number \(a\)/i))
    await user.type(screen.getByLabelText(/first number \(a\)/i), '10')

    expect(screen.getByText('10% of 100')).toBeInTheDocument()
    expect(screen.getByText('5% of 100 = 5')).toBeInTheDocument()
  })

  it('displays backend errors from failed calculations', async () => {
    mockedCalculate.mockRejectedValue(new Error('division by zero'))
    const user = userEvent.setup()
    render(<App />)

    await user.selectOptions(screen.getByLabelText(/operation/i), 'divide')
    await user.type(screen.getByLabelText(/first number \(a\)/i), '10')
    await user.type(screen.getByLabelText(/second number \(b\)/i), '0')
    await user.click(screen.getByRole('button', { name: /calculate/i }))

    expect(await screen.findByText('division by zero')).toBeInTheDocument()
  })
})
