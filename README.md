# 🌟 Kids Points Tracker

Una webapp moderna per tracciare i punti comportamentali dei tuoi bambini, con sistema di autenticazione e salvataggio automatico su Google Sheets.

## 🚀 Caratteristiche

- ✅ **Autenticazione sicura** con password statica
- 📊 **Classifica in tempo reale** dei punti
- 📱 **Design mobile-first** ottimizzato per smartphone
- 💾 **Salvataggio automatico** su Google Sheets
- 🎨 **Interfaccia colorata e coinvolgente** per i bambini
- 📝 **Storico dettagliato** delle attività

## 🔐 Accesso

La webapp è protetta da password. Usa: **12345**

## 🛠 Deploy su Vercel

### Metodo rapido (GitHub)

1. Fai fork di questo repository
2. Vai su [vercel.com](https://vercel.com)
3. Importa il progetto da GitHub
4. Clicca su "Deploy"

### Configurazione variabili d'ambiente (opzionale)

Se vuoi configurare l'URL di Google Sheets tramite variabile d'ambiente:

1. Nel dashboard Vercel, vai su Settings > Environment Variables
2. Aggiungi: `NEXT_PUBLIC_SHEETS_URL` con il tuo URL di Google Apps Script

## 📊 **Setup Google Sheets (2 minuti)**

**✅ L'URL è già configurato nel codice** - serve solo attivare lo script Google!

**⚡ Setup super rapido:**
1. [script.google.com](https://script.google.com) → Nuovo progetto
2. Copia il codice da `google-apps-script.js` 
3. Deploy come Web App (**importante**: "Anyone" può accedere)
4. Autorizza l'app → **Fatto!**

**📋 Guide disponibili:**
- [🚨 **Errore deployment Library?**](./ERRORE-DEPLOYMENT-LIBRARY.md) - Risoluzione errore comune
- [🔧 **Errore CORS?**](./RISOLVI-ERRORE-CORS.md) - Risoluzione rapida 
- [📖 Guida completa](./SETUP-GOOGLE-SHEETS.md) - Setup completo
- [🎬 Demo step-by-step](./DEMO-SETUP.md) - Con esempi visuali

## 🧑‍💻 Sviluppo locale

\`\`\`bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Vai su http://localhost:3000
\`\`\`

## 👨‍👩‍👧‍👦 Bambini configurati

- 🌸 **Gaia** (Rosa)
- 🔵 **Mattia** (Blu)  
- 🟢 **Michele** (Verde)
- 🟣 **Pietro** (Viola)

Puoi modificare i nomi e i colori nel file `components/KidsPointsTracker.tsx`.

## 📱 Utilizzo

1. Accedi con la password **12345**
2. Seleziona il bambino
3. Inserisci i punti e la motivazione
4. Clicca "Aggiungi" o "Sottrai"
5. I dati vengono salvati automaticamente!

## 💾 **Database: Google Sheets**

L'app salva **tutti i dati su Google Sheets** - la soluzione più semplice e veloce:
- ✅ **Nessun costo** - Google Sheets è gratuito
- ✅ **Nessun account aggiuntivo** - usa il tuo Google esistente  
- ✅ **Accesso multi-dispositivo** - sincronizzato nel cloud
- ✅ **Backup automatico** - i dati sono al sicuro
- ✅ **Setup in 2 minuti** - segui la guida sotto

### 🚨 **Configurazione obbligatoria**
L'app **richiede** la configurazione di Google Sheets per funzionare.

## 🔧 Personalizzazione

- **Password**: modifica in `components/AuthWrapper.tsx`
- **Bambini**: modifica in `components/KidsPointsTracker.tsx`
- **Colori e stili**: modifica i CSS in Tailwind

## 📄 Licenza

Questo progetto è per uso personale e familiare. 