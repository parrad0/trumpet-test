"use client"

import { TextWidgetProps } from '@/types/widget'
import { WidgetHeader } from './widget-header'
import { WidgetTextArea } from './widget-textarea'
import { CharacterCount } from './character-count'
import { useTextWidget } from '@/hooks/useTextWidget'
import { WIDGET_CONSTANTS, WIDGET_STYLES } from '@/constants/widget'


export default function TextWidget({ id, initialText, onTextChange, onRemove }: TextWidgetProps) {
  const { text, setText, isSaving } = useTextWidget({ initialText, onTextChange })

  return (
    <div className={WIDGET_STYLES.container} data-testid={`text-widget-${id}`}>
      <WidgetHeader 
        id={id}
        isSaving={isSaving} 
        onRemove={onRemove} 
      />
      <WidgetTextArea 
        text={text} 
        onChange={setText} 
        maxLength={WIDGET_CONSTANTS.MAX_TEXT_LENGTH} 
      />
      <CharacterCount 
        current={text.length} 
        max={WIDGET_CONSTANTS.MAX_TEXT_LENGTH} 
      />
    </div>
  )
}
