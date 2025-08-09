'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeCtx = createContext<{theme: 'dark'|'light', toggle: ()=>void}>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark'|'light'>(() => (typeof window!== 'undefined' && (localStorage.getItem('theme') as 'dark'|'light')) || 'dark')
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <ThemeCtx.Provider value={{theme, toggle}}>{children}</ThemeCtx.Provider>
}
export function useTheme() { return useContext(ThemeCtx) }
