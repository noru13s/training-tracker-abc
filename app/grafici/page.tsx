'use client'
import { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend)

export default function Grafici() {
  const [history, setHistory] = useState<any[]>([])
  useEffect(() => { fetch('/api/history').then(r=>r.json()).then(d=> setHistory(d.data || [])) }, [])

  const byExercise: Record<string, { x: string, y: number }[]> = {}
  const byDayTotal: Record<string, number> = {}

  for (const row of history) {
    const ts = row.timestamp
    const ex = row.esercizio
    const w = Number(row.peso_usato || 0)
    if (ex && w) {
      byExercise[ex] = byExercise[ex] || []
      byExercise[ex].push({ x: ts, y: w })
    }
    const dayKey = new Date(ts).toISOString().slice(0,10)
    byDayTotal[dayKey] = (byDayTotal[dayKey] || 0) + (w || 0)
  }

  return (
    <main className="space-y-8">
      <h1 className="text-2xl font-bold">Grafici</h1>

      {Object.entries(byExercise).map(([name, points]) => (
        <div key={name} className="card">
          <div className="mb-2 font-semibold">{name}</div>
          <Line data={{
            labels: points.map(p=>p.x),
            datasets: [{ label: name, data: points.map(p=>p.y) }]
          }} />
        </div>
      ))}

      <div className="card">
        <div className="mb-2 font-semibold">Carico giornaliero totale</div>
        <Bar data={{
          labels: Object.keys(byDayTotal),
          datasets: [{ label: 'Somma pesi', data: Object.values(byDayTotal) }]
        }} />
      </div>
    </main>
  )
}
