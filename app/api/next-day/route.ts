import { NextResponse } from 'next/server'
import { getLastDay } from '../../../lib/sheets'
import { nextDay } from '../../../lib/rotation'

export async function GET() {
  try {
    const last = await getLastDay()
    const suggested = nextDay(last)
    return NextResponse.json({ ok: true, last, suggested })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
