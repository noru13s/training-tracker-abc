'use client'
import { useEffect, useMemo, useState } from 'react'

export default function Storico() {
  const [history, setHistory] = useState<any[]>([])
  const [q, setQ] = useState('')

  useEffect(() => { fetch('/api/history').then(r=>r.json()).then(d=> setHistory(d.data || [])) }, [])

  const filtered = useMemo(() => history.filter(r => {
    const s = (r.esercizio + ' ' + r.giorno + ' ' + r.note).toLowerCase()
    return s.includes(q.toLowerCase())
  }), [history, q])

  function exportPdf() {
    window.print()
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Storico</h1>
        <button className="btn" onClick={exportPdf}>Esporta PDF</button>
      </div>

      <input className="input" placeholder="Filtra per esercizio, giorno o note" value={q} onChange={e=>setQ(e.target.value)} />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-400">
              <th className="py-2 pr-4">Data</th>
              <th className="py-2 pr-4">Giorno</th>
              <th className="py-2 pr-4">Fase</th>
              <th className="py-2 pr-4">Esercizio</th>
              <th className="py-2 pr-4">Suggerito</th>
              <th className="py-2 pr-4">Usato</th>
              <th className="py-2 pr-4">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r,i)=> (
              <tr key={i} className="border-t border-neutral-800">
                <td className="py-2 pr-4">{new Date(r.timestamp).toLocaleString()}</td>
                <td className="py-2 pr-4">{r.giorno}</td>
                <td className="py-2 pr-4">{r.fase}</td>
                <td className="py-2 pr-4">{r.esercizio}</td>
                <td className="py-2 pr-4">{r.peso_suggerito}</td>
                <td className="py-2 pr-4">{r.peso_usato}</td>
                <td className="py-2 pr-4">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
