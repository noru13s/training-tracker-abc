import { NextResponse } from 'next/server'
import { getHistory } from '../../../lib/sheets'

export async function GET() {
  try {
    const data = await getHistory()
    return NextResponse.json({ ok: true, data })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
