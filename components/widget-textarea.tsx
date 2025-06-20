import { Textarea } from '@/components/ui/textarea'
import { WidgetTextAreaProps } from '@/types/widget'
import { WIDGET_STYLES } from '@/constants/widget'

export function WidgetTextArea({ text, onChange, maxLength }: WidgetTextAreaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Textarea
      value={text}
      onChange={handleChange}
      placeholder="Enter your text here..."
      className={WIDGET_STYLES.textarea}
      maxLength={maxLength}
      data-testid="widget-textarea"
    />
  )
}