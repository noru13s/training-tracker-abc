'use client'
import { useEffect, useState } from 'react'
import DayBadge from '../components/DayBadge'
import { EXERCISES } from '../lib/exercises'
import dynamic from 'next/dynamic'

const DynamicExerciseCard = dynamic(() => import('../components/ExerciseCard'), { ssr: false })

type DayKey = 'A' | 'B' | 'C' | '...'

export default function Home() {
  const [day, setDay] = useState<DayKey>('...')

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch('/api/next-day')
        const d = await r.json()
        const suggested = d?.suggested
        // Fallback sicuro: se non arriva A/B/C, usa A
        if (suggested === 'A' || suggested === 'B' || suggested === 'C') setDay(suggested)
        else setDay('A')
      } catch {
        // Se l'API fallisce (env non pronta, sheet non condiviso, ecc.), fallback A
        setDay('A')
      }
    }
    load()
  }, [])

  const isValidDay = day === 'A' || day === 'B' || day === 'C'
  const list = isValidDay ? EXERCISES[day] : []

  return (
    <main className="space-y-6">
      <DayBadge />
      <div className="grid gap-4">
        {list.map((ex) => (
          <section key={ex.name}>
            <DynamicExerciseCard
              name={ex.name}
              baseWeight={ex.baseWeight}
              phase={ex.phase}
              cardio={ex.cardio}
              giorno={(isValidDay ? day : 'A') as 'A'|'B'|'C'}
            />
          </section>
        ))}
      </div>
    </main>
  )
}
