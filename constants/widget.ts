export const WIDGET_CONSTANTS = {
  MAX_TEXT_LENGTH: 1000,
  DEBOUNCE_DELAY: 1000,
  SAVE_ANIMATION_DELAY: 300,
  MIN_TEXTAREA_HEIGHT: 120,
  STORAGE_KEY: 'text-widgets-data',
} as const

export const WIDGET_STYLES = {
  container: 'border-2 border-gray-300 rounded-lg p-4 bg-white relative',
  header: 'flex justify-between items-start mb-2',
  headerInfo: 'flex items-center gap-2',
  widgetLabel: 'text-sm font-medium text-gray-600',
  savingIndicator: 'text-xs text-blue-600',
  removeButton: 'h-6 w-6 p-0 bg-white text-gray-500 hover:bg-red-50 hover:text-red-600',
  textarea: 'min-h-[120px] resize-y border-gray-200 focus:border-blue-500',
  characterCount: 'mt-2 text-xs text-gray-500 text-right',
} as const