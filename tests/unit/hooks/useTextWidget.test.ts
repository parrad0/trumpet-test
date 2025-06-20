import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTextWidget } from '@/hooks/useTextWidget'

vi.mock('use-debounce', () => ({
  useDebouncedCallback: (callback: Function, delay: number) => {
    return vi.fn((...args) => {
      callback(...args)
    })
  },
}))

describe('useTextWidget', () => {
  const mockOnTextChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with initial text', () => {
    const { result } = renderHook(() =>
      useTextWidget({
        initialText: 'Hello world',
        onTextChange: mockOnTextChange,
      })
    )

    expect(result.current.text).toBe('Hello world')
    expect(result.current.isSaving).toBe(false)
  })

  it('should update text when setText is called', () => {
    const { result } = renderHook(() =>
      useTextWidget({
        initialText: 'Hello world',
        onTextChange: mockOnTextChange,
      })
    )

    act(() => {
      result.current.setText('New text')
    })

    expect(result.current.text).toBe('New text')
  })

  it('should call onTextChange when text changes', () => {
    const { result } = renderHook(() =>
      useTextWidget({
        initialText: 'Hello world',
        onTextChange: mockOnTextChange,
      })
    )

    act(() => {
      result.current.setText('New text')
    })

    expect(mockOnTextChange).toHaveBeenCalledWith('New text')
  })

  it('should set isSaving to true when text changes', () => {
    const { result } = renderHook(() =>
      useTextWidget({
        initialText: 'Hello world',
        onTextChange: mockOnTextChange,
      })
    )

    act(() => {
      result.current.setText('New text')
    })

    expect(result.current.isSaving).toBe(true)
  })

  it('should not call onTextChange if text is same as initial', () => {
    const { result } = renderHook(() =>
      useTextWidget({
        initialText: 'Hello world',
        onTextChange: mockOnTextChange,
      })
    )

    act(() => {
      result.current.setText('Hello world')
    })

    expect(mockOnTextChange).not.toHaveBeenCalled()
  })

  it('should update text when initialText prop changes', () => {
    const { result, rerender } = renderHook(
      ({ initialText }) =>
        useTextWidget({
          initialText,
          onTextChange: mockOnTextChange,
        }),
      {
        initialProps: { initialText: 'Initial text' },
      }
    )

    expect(result.current.text).toBe('Initial text')

    rerender({ initialText: 'Updated initial text' })

    expect(result.current.text).toBe('Updated initial text')
  })
})