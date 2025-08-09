export type Exercise = {
  name: string
  baseWeight?: number // kg per i pesi; opzionale per cardio
  phase: 'Riscaldamento'|'Allenamento'|'Cardio'
  cardio?: boolean
}

export const EXERCISES: Record<'A'|'B'|'C', Exercise[]> = {
  A: [
    { name: 'Panca piana manubri', baseWeight: 18, phase: 'Allenamento' },
    { name: 'Shoulder press', baseWeight: 10, phase: 'Allenamento' },
    { name: 'Arm curl', baseWeight: 10, phase: 'Allenamento' },
    { name: 'Arm extension', baseWeight: 12, phase: 'Allenamento' },
    { name: 'Tapis roulant', phase: 'Cardio', cardio: true }
  ],
  B: [
    { name: 'Leg press', baseWeight: 120, phase: 'Allenamento' },
    { name: 'Leg extension', baseWeight: 45, phase: 'Allenamento' },
    { name: 'Leg curl', baseWeight: 45, phase: 'Allenamento' },
    { name: 'Squat con manubri', baseWeight: 14, phase: 'Allenamento' },
    { name: 'Tapis roulant', phase: 'Cardio', cardio: true }
  ],
  C: [
    { name: 'Vertical traction', baseWeight: 50, phase: 'Allenamento' },
    { name: 'Low row', baseWeight: 40, phase: 'Allenamento' },
    { name: 'Lower back', baseWeight: 45, phase: 'Allenamento' },
    { name: 'Glutei machine', baseWeight: 40, phase: 'Allenamento' },
    { name: 'Tapis roulant', phase: 'Cardio', cardio: true }
  ]
}
