'use client'
import { useEffect, useMemo, useState } from 'react'
import { computeSuggestion } from '../lib/suggestions'
import { GUIDES } from '../lib/guides'

type Props = {
  name: string
  baseWeight?: number
  phase: 'Riscaldamento'|'Allenamento'|'Cardio'
  cardio?: boolean
  giorno: 'A'|'B'|'C'
}

type HistoryRow = {
  timestamp: string
  esercizio: string
  peso_usato: string
  completato: string | boolean
}

export default function ExerciseCard({ name, baseWeight, phase, cardio, giorno }: Props) {
  const [completed, setCompleted] = useState(false)
  const [pesoUsato, setPesoUsato] = useState<number | ''>('')
  const [note, setNote] = useState('')
  const [tempo, setTempo] = useState('')
  const [velocita, setVelocita] = useState('')
  const [inclinazione, setInclinazione] = useState('')

  const [history, setHistory] = useState<HistoryRow[]>([])
  useEffect(() => {
    fetch('/api/history').then(r=>r.json()).then(d=> setHistory(d.data || []))
  }, [])

  const { last3, completedRatio } = useMemo(() => {
    const rows = (history as any[]).filter(r => r.esercizio === name)
      .sort((a,b)=> new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    const last3 = rows.slice(-3).map(r => Number(r.peso_usato || 0)).filter(n=>!Number.isNaN(n) && n>0)
    const comp = rows.slice(-3).map(r => (String(r.completato).toLowerCase()==='true'))
    const completedRatio = comp.length ? comp.filter(Boolean).length / comp.length : undefined
    return { last3, completedRatio }
  }, [history, name])

  const suggestion = useMemo(
    () => computeSuggestion(baseWeight ?? 0, last3, completedRatio),
    [baseWeight, last3, completedRatio]
  )
  const guide = GUIDES[name]

  async function save() {
    const payload: any = {
      giorno,
      fase: phase,
      esercizio: name,
      peso_suggerito: baseWeight ?? '',
      peso_usato: pesoUsato === '' ? '' : Number(pesoUsato),
      note,
      completato: completed
    }
    if (cardio) {
      payload.tempo_min = tempo
      payload.velocita_kmh = velocita
      payload.inclinazione_perc = inclinazione
    }
    const res = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (res.ok) alert('Salvato ✅')
    else alert('Errore nel salvataggio')
  }

  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{name}</div>
        <label className="flex items-center gap-2 text-sm toggle">
          <input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)} />
          <span>Completato</span>
        </label>
      </div>

      {!cardio && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="label">Peso suggerito (base)</div>
            <div className="mt-1 text-xl font-semibold">{baseWeight ?? '-'} kg</div>
            <div className="text-xs text-neutral-400 mt-1">
              Suggerimento attuale: {suggestion.current} kg
              {suggestion.trend === 'up' && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-brand-600 text-xs">+5% consigliato</span>
              )}
              {suggestion.trend === 'down' && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-neutral-700 text-xs">-5% suggerito</span>
              )}
            </div>
          </div>
          <div>
            <label className="label">Peso usato (kg)</label>
            <input
              className="input"
              type="number"
              step="0.5"
              value={pesoUsato}
              onChange={e=>setPesoUsato(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {cardio && (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Tempo (min)</label>
            <input className="input" value={tempo} onChange={e=>setTempo(e.target.value)} />
          </div>
          <div>
            <label className="label">Velocità (km/h)</label>
            <input className="input" value={velocita} onChange={e=>setVelocita(e.target.value)} />
          </div>
          <div>
            <label className="label">Inclinazione (%)</label>
            <input className="input" value={inclinazione} onChange={e=>setInclinazione(e.target.value)} />
          </div>
        </div>
      )}

      <div>
        <label className="label">Note</label>
        <input className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="Sensazioni, difficoltà..." />
      </div>

      <div className="flex items-center gap-3">
        {guide && (
          <a className="underline text-brand-500" href={guide.url} target="_blank" rel="noreferrer">
            Guida: {guide.title}
          </a>
        )}
      </div>

      <div className="flex justify-end">
        <button className="btn" onClick={save}>Salva</button>
      </div>
    </div>
  )
}
