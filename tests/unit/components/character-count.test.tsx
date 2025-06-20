import { render, screen } from '@testing-library/react'
import { CharacterCount } from '@/components/character-count'

describe('CharacterCount', () => {
  it('should render character count correctly', () => {
    render(<CharacterCount current={50} max={100} />)
    
    expect(screen.getByText('50/100 characters')).toBeInTheDocument()
  })

  it('should handle zero characters', () => {
    render(<CharacterCount current={0} max={500} />)
    
    expect(screen.getByText('0/500 characters')).toBeInTheDocument()
  })

  it('should handle maximum characters', () => {
    render(<CharacterCount current={500} max={500} />)
    
    expect(screen.getByText('500/500 characters')).toBeInTheDocument()
  })
})