'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const path = usePathname()
  const Item = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} className={`px-3 py-2 rounded-xl ${path===href? 'bg-neutral-800 text-white' : 'text-neutral-300 hover:bg-neutral-800'}`}>{label}</Link>
  )
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="text-xl font-semibold">Training Tracker</div>
      <nav className="flex items-center gap-2">
        <Item href="/" label="Home" />
        <Item href="/grafici" label="Grafici" />
        <Item href="/storico" label="Storico" />
        <ThemeToggle />
      </nav>
    </header>
  )
}
