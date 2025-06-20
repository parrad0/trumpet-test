import { CharacterCountProps } from '@/types/widget'
import { WIDGET_STYLES } from '@/constants/widget'

export function CharacterCount({ current, max }: CharacterCountProps) {
  return (
    <div className={WIDGET_STYLES.characterCount}>
      {current}/{max} characters
    </div>
  )
}