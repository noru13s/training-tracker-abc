'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button className="btn" onClick={toggle} aria-label="Cambia tema">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
