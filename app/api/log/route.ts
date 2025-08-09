import { NextRequest, NextResponse } from 'next/server'
import { appendTrainingRow } from '../../../lib/sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const timestamp = new Date().toISOString()
    await appendTrainingRow({ ...body, timestamp })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
