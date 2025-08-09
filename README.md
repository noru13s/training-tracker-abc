# Training Tracker A-B-C (Next.js + PWA + Google Sheets)

## Setup rapido
1. Installa dipendenze
```bash
npm i
```
2. Copia `.env.example` in `.env.local` e inserisci le credenziali del Service Account Google.
3. Avvia
```bash
npm run dev
```
4. Apri http://localhost:3000

## Google Sheets
Condividi lo spreadsheet con l'email del Service Account (permesso Editor).
Header consigliati (riga 1):
`timestamp | giorno | fase | esercizio | peso_suggerito | peso_usato | note | tempo_min | velocita_kmh | inclinazione_% | completato`
