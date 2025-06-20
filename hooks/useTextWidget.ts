import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { WIDGET_CONSTANTS } from '@/constants/widget'

interface UseTextWidgetProps {
  initialText: string
  onTextChange: (text: string) => void
}

export function useTextWidget({ initialText, onTextChange }: UseTextWidgetProps) {
  const [text, setText] = useState(initialText)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setText(initialText)
  }, [initialText])

  const debouncedSave = useDebouncedCallback((textToSave: string) => {
    if (textToSave !== initialText) {
      setIsSaving(true)
      onTextChange(textToSave)
      setTimeout(() => setIsSaving(false), WIDGET_CONSTANTS.SAVE_ANIMATION_DELAY)
    }
  }, WIDGET_CONSTANTS.DEBOUNCE_DELAY)

  useEffect(() => {
    debouncedSave(text)
  }, [text, debouncedSave])

  return {
    text,
    setText,
    isSaving
  }
}