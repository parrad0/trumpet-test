import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { WidgetHeaderProps } from '@/types/widget'
import { WIDGET_STYLES } from '@/constants/widget'

export function WidgetHeader({ isSaving, onRemove, id }: WidgetHeaderProps) {
  return (
    <div className={WIDGET_STYLES.header}>
      <div className={WIDGET_STYLES.headerInfo}>
        <span className={WIDGET_STYLES.widgetLabel}>Text Widget {id}</span>
        {isSaving && <span className={WIDGET_STYLES.savingIndicator}>Saving...</span>}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onRemove}
        className={WIDGET_STYLES.removeButton}
        data-testid={`remove-widget-${id}`}
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  )
}