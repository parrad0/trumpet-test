import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TextWidget from '@/components/text-widget'

// Mock the useTextWidget hook
vi.mock('@/hooks/useTextWidget', () => ({
  useTextWidget: vi.fn(() => ({
    text: 'Mocked text',
    setText: vi.fn(),
    isSaving: false,
  })),
}))

// Mock child components
vi.mock('@/components/widget-header', () => ({
  WidgetHeader: ({ id, isSaving, onRemove }: any) => (
    <div data-testid="widget-header">
      Widget Header {id} {isSaving ? 'Saving' : 'Not Saving'}
      <button onClick={onRemove} data-testid={`remove-${id}`}>Remove</button>
    </div>
  ),
}))

vi.mock('@/components/widget-textarea', () => ({
  WidgetTextArea: ({ text, onChange, maxLength }: any) => (
    <textarea 
      data-testid="widget-textarea" 
      value={text} 
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
    />
  ),
}))

vi.mock('@/components/character-count', () => ({
  CharacterCount: ({ current, max }: any) => (
    <div data-testid="character-count">{current}/{max}</div>
  ),
}))

describe('TextWidget', () => {
  const mockOnTextChange = vi.fn()
  const mockOnRemove = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render all child components', () => {
    render(
      <TextWidget
        id="123"
        initialText="Initial text"
        onTextChange={mockOnTextChange}
        onRemove={mockOnRemove}
      />
    )

    expect(screen.getByTestId('widget-header')).toBeInTheDocument()
    expect(screen.getByTestId('widget-textarea')).toBeInTheDocument()
    expect(screen.getByTestId('character-count')).toBeInTheDocument()
  })

  it('should have correct test id', () => {
    render(
      <TextWidget
        id="456"
        initialText="Initial text"
        onTextChange={mockOnTextChange}
        onRemove={mockOnRemove}
      />
    )

    expect(screen.getByTestId('text-widget-456')).toBeInTheDocument()
  })

  it('should pass correct props to child components', () => {
    render(
      <TextWidget
        id="789"
        initialText="Initial text"
        onTextChange={mockOnTextChange}
        onRemove={mockOnRemove}
      />
    )

    expect(screen.getByText('Widget Header 789 Not Saving')).toBeInTheDocument()
    expect(screen.getByTestId('character-count')).toHaveTextContent('11/1000')
  })
})