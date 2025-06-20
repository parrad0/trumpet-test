import { render, screen } from '@testing-library/react'
import TextWidget from '@/components/text-widget'

// Mock the useTextWidget hook
jest.mock('@/hooks/useTextWidget', () => ({
  useTextWidget: jest.fn(() => ({
    text: 'Mocked text',
    setText: jest.fn(),
    isSaving: false,
  })),
}))

// Mock child components
jest.mock('@/components/widget-header', () => ({
  WidgetHeader: ({ id, isSaving, onRemove }: any) => (
    <div data-testid="widget-header">
      Widget Header {id} {isSaving ? 'Saving' : 'Not Saving'}
      <button onClick={onRemove} data-testid={`remove-${id}`}>Remove</button>
    </div>
  ),
}))

jest.mock('@/components/widget-textarea', () => ({
  WidgetTextArea: ({ text, onChange, maxLength }: any) => (
    <textarea 
      data-testid="widget-textarea" 
      value={text} 
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
    />
  ),
}))

jest.mock('@/components/character-count', () => ({
  CharacterCount: ({ current, max }: any) => (
    <div data-testid="character-count">{current}/{max}</div>
  ),
}))

describe('TextWidget', () => {
  const mockOnTextChange = jest.fn()
  const mockOnRemove = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
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