# Moviemedia Gestionale — Deploy Guide

## Struttura file
```
moviemedia-app/
├── src/
│   ├── main.jsx        ← entry point React
│   ├── App.jsx         ← app completa (~3000 righe)
│   └── db.js           ← layer Supabase / localStorage
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── supabase-setup.sql  ← SQL da eseguire una volta
└── .env.example        ← template variabili ambiente
```

---

## STEP 1 — Supabase (5 minuti)

1. Vai su https://supabase.com → **Start your project** → crea account
2. **New project** → dai un nome (es. `moviemedia`) → scegli regione Europe West → **Create**
3. Aspetta ~2 minuti che si avvii
4. Vai su **SQL Editor** → **New Query** → incolla il contenuto di `supabase-setup.sql` → **Run**
5. Vai su **Settings → API** e copia:
   - **Project URL** → `https://xxxx.supabase.co`
   - **anon/public key** → `eyJ...`

---

## STEP 2 — GitHub (2 minuti)

1. Vai su https://github.com → **New repository** → nome `moviemedia-gestionale` → **Create**
2. Sul tuo computer, carica questa cartella:
   ```bash
   cd moviemedia-app
   git init
   git add .
   git commit -m "first deploy"
   git remote add origin https://github.com/TUO-USERNAME/moviemedia-gestionale.git
   git push -u origin main
   ```

---

## STEP 3 — Vercel (3 minuti)

1. Vai su https://vercel.com → **Sign up with GitHub**
2. **Add New Project** → seleziona `moviemedia-gestionale`
3. Framework: **Vite** (rilevato automaticamente)
4. **Environment Variables** → aggiungi:
   - `VITE_SUPABASE_URL` = `https://xxxx.supabase.co`
   - `VITE_SUPABASE_ANON` = `eyJ...`
5. **Deploy** → aspetta 1-2 minuti
6. Il tuo URL sarà tipo: `https://moviemedia-gestionale.vercel.app`

---

## Aggiornamenti futuri

Ogni volta che modifichi `App.jsx` e fai `git push`, Vercel rideploya automaticamente in ~1 minuto.

---

## Note

- I dati (clienti, campagne, circuito) vengono salvati in Supabase e persistono per sempre
- Il progetto Supabase Free va in **pausa dopo 7 giorni di inattività** — al primo accesso si risveglia in ~30 secondi
- Per evitare la pausa: piano Pro ($25/mese) oppure configura un cron job gratuito che fa ping ogni 3 giorni
- Le credenziali demo (admin/admin123) sono hardcoded nell'app — cambia le password dalla schermata Utenti dopo il primo accesso
