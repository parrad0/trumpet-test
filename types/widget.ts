export enum WidgetType {
  TEXT = 'text',
  // Future widget types
  // IMAGE = 'image',
  // CHART = 'chart',
  // TABLE = 'table',
}

export interface BaseWidget {
  id: string
  type: WidgetType
}

export interface TextWidget extends BaseWidget {
  type: WidgetType.TEXT
  text: string
}

// Union type for all widget types
export type Widget = TextWidget

export interface WidgetData {
  widgets: Widget[]
}

export interface WidgetRendererProps {
  widget: Widget
  onUpdate: (widget: Widget) => void
  onRemove: () => void
}

export interface TextWidgetProps {
  id: string
  initialText: string
  onTextChange: (text: string) => void
  onRemove: () => void
}

export interface WidgetHeaderProps {
  id: string
  isSaving: boolean
  onRemove: () => void
}

export interface WidgetTextAreaProps {
  text: string
  onChange: (value: string) => void
  maxLength: number
}

export interface CharacterCountProps {
  current: number
  max: number
}