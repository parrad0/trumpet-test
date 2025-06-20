import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WidgetTextArea } from '@/components/widget-textarea'

describe('WidgetTextArea', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render with initial text', () => {
    render(
      <WidgetTextArea 
        text="Hello world" 
        onChange={mockOnChange} 
        maxLength={500} 
      />
    )
    
    const textarea = screen.getByTestId('widget-textarea')
    expect(textarea).toHaveValue('Hello world')
  })

  it('should call onChange when text is typed', async () => {
    const user = userEvent.setup()
    
    render(
      <WidgetTextArea 
        text="" 
        onChange={mockOnChange} 
        maxLength={500} 
      />
    )
    
    const textarea = screen.getByTestId('widget-textarea')
    await user.type(textarea, 'Hi')
    
    // userEvent.type() calls onChange for each character
    expect(mockOnChange).toHaveBeenCalledWith('H')
    expect(mockOnChange).toHaveBeenCalledWith('i')
    expect(mockOnChange).toHaveBeenCalledTimes(2)
  })

  it('should have correct placeholder text', () => {
    render(
      <WidgetTextArea 
        text="" 
        onChange={mockOnChange} 
        maxLength={500} 
      />
    )
    
    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument()
  })

  it('should respect maxLength attribute', () => {
    render(
      <WidgetTextArea 
        text="" 
        onChange={mockOnChange} 
        maxLength={100} 
      />
    )
    
    const textarea = screen.getByTestId('widget-textarea')
    expect(textarea).toHaveAttribute('maxLength', '100')
  })

  it('should handle onChange event correctly', () => {
    render(
      <WidgetTextArea 
        text="" 
        onChange={mockOnChange} 
        maxLength={500} 
      />
    )
    
    const textarea = screen.getByTestId('widget-textarea')
    fireEvent.change(textarea, { target: { value: 'Test value' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('Test value')
  })
})