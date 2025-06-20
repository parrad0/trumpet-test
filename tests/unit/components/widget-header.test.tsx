import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WidgetHeader } from '@/components/widget-header'

describe('WidgetHeader', () => {
  const mockOnRemove = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render widget label with id', () => {
    render(
      <WidgetHeader 
        id="123" 
        isSaving={false} 
        onRemove={mockOnRemove} 
      />
    )
    
    expect(screen.getByText('Text Widget 123')).toBeInTheDocument()
  })

  it('should show saving indicator when isSaving is true', () => {
    render(
      <WidgetHeader 
        id="123" 
        isSaving={true} 
        onRemove={mockOnRemove} 
      />
    )
    
    expect(screen.getByText('Saving...')).toBeInTheDocument()
  })

  it('should not show saving indicator when isSaving is false', () => {
    render(
      <WidgetHeader 
        id="123" 
        isSaving={false} 
        onRemove={mockOnRemove} 
      />
    )
    
    expect(screen.queryByText('Saving...')).not.toBeInTheDocument()
  })

  it('should call onRemove when remove button is clicked', () => {
    render(
      <WidgetHeader 
        id="123" 
        isSaving={false} 
        onRemove={mockOnRemove} 
      />
    )
    
    const removeButton = screen.getByTestId('remove-widget-123')
    fireEvent.click(removeButton)
    
    expect(mockOnRemove).toHaveBeenCalledTimes(1)
  })

  it('should have correct test id for remove button', () => {
    render(
      <WidgetHeader 
        id="456" 
        isSaving={false} 
        onRemove={mockOnRemove} 
      />
    )
    
    expect(screen.getByTestId('remove-widget-456')).toBeInTheDocument()
  })
})