# 🚀 Setup Google Sheets (2 minuti)

Guida super veloce per configurare il database Google Sheets per Kids Points Tracker.

## 📋 **Step 1: Crea Google Apps Script** (1 minuto)

1. **Vai su** [script.google.com](https://script.google.com)
2. **Clicca** "Nuovo progetto"  
3. **Cancella** tutto il codice esistente
4. **Copia e incolla** tutto il contenuto del file `google-apps-script.js` dal progetto
5. **Rinomina** il progetto (es: "Kids Points API") [opzionale]

## 🚀 **Step 2: Deploy come Web App** (1 minuto)

1. **Clicca** "Deploy" → "New deployment"
2. **Seleziona tipo:** "Web app"
3. **Configura:**
   - Execute as: **"Me"** 
   - Who has access: **"Anyone"** ⚠️ (importante!)
4. **Clicca** "Deploy"
5. **Autorizza** l'app quando richiesto (clicca "Unsafe" se necessario)
6. **Copia l'URL** che finisce con `/exec`

## 🔗 **Step 3: Configura nell'app**

1. **Apri** la webapp Kids Points Tracker
2. **Clicca** "⚙️ Configura Google Sheets"
3. **Incolla** l'URL copiato nel passo 2
4. **Clicca** "Configura"
5. ✅ **Fatto!** Ora l'app salva tutto su Google Sheets

## 🎯 **Verifica funzionamento**

- Aggiungi punti a un bambino
- Controlla che vedi "Salvato su Google Sheets!"
- Vai su [drive.google.com](https://drive.google.com) → dovresti vedere il foglio creato automaticamente

## ❓ **Problemi comuni**

### "CORS policy error"
- ✅ **Soluzione:** Assicurati che "Who has access" sia impostato su "Anyone"

### "Script function not found"
- ✅ **Soluzione:** Verifica di aver copiato tutto il codice da `google-apps-script.js`

### "Permission denied"
- ✅ **Soluzione:** Ri-autorizza l'app nel processo di deploy

## 🔍 **Note tecniche**

- **Primo utilizzo:** Google Apps Script crea automaticamente un nuovo foglio di calcolo
- **Struttura dati:** 3 colonne (Tipo, Data, Dati JSON)
- **Performance:** Gestisce migliaia di record senza problemi
- **Sicurezza:** Solo tu hai accesso ai dati (tramite il tuo account Google)

---

**💡 Tip:** Salva l'URL di deploy - ti servirà se cambi dispositivo! 