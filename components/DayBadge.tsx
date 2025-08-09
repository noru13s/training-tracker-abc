'use client'
import { useEffect, useState } from 'react'

export default function DayBadge() {
  const [day, setDay] = useState<'A'|'B'|'C'|null>(null)
  useEffect(() => {
    fetch('/api/next-day').then(r=>r.json()).then(d=> setDay(d.suggested))
  }, [])
  if (!day) return <div className="card">Calcolo giorno...</div>
  return (
    <div className="card flex items-center justify-between">
      <div>
        <div className="text-sm text-neutral-400">Giorno consigliato</div>
        <div className="text-3xl font-semibold">{day}</div>
      </div>
      <span className="px-3 py-1 rounded-full bg-brand-600">A-B-C</span>
    </div>
  )
}
