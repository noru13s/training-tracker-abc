import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!
const sheetName = 'Training'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
  const key = (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '').replace(/\\n/g, '\n')
  return new google.auth.JWT(email, undefined, key, SCOPES)
}

export async function appendTrainingRow(row: any) {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const values = [[
    row.timestamp,
    row.giorno,
    row.fase,
    row.esercizio,
    row.peso_suggerito ?? '',
    row.peso_usato ?? '',
    row.note ?? '',
    row.tempo_min ?? '',
    row.velocita_kmh ?? '',
    row.inclinazione_perc ?? '',
    row.completato ?? ''
  ]]
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:K`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values }
  })
}

export async function getLastDay(): Promise<'A'|'B'|'C'|undefined> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:K` })
  const rows = res.data.values || []
  if (rows.length <= 1) return undefined // assuming first row might be header
  const last = rows[rows.length - 1]
  const giorno = last[1] as 'A'|'B'|'C'
  return giorno
}

export async function getHistory() {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}!A:K` })
  const rows = res.data.values || []
  const headers = ['timestamp','giorno','fase','esercizio','peso_suggerito','peso_usato','note','tempo_min','velocita_kmh','inclinazione_%','completato']
  return rows.slice(1).map(r => Object.fromEntries(headers.map((h,i)=>[h, r[i] ?? ''])))
}
