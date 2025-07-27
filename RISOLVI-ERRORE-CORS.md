# 🚨 Risoluzione Errore CORS

**Problema:** `Access to fetch at 'https://script.google.com/...' has been blocked by CORS policy`

**Causa:** Il Google Apps Script non è configurato correttamente o è deployato come Library invece di Web App.

---

## ✅ **Soluzione Rapida (1 minuto)**

### **Step 1: Accedi al tuo script**
1. Vai su [script.google.com](https://script.google.com)
2. Cerca e apri il tuo progetto (es: "Kids Points API")

### **Step 2: Verifica il tipo di deployment**
**⚠️ IMPORTANTE:** L'URL deve finire con `/exec`, NON `/library/`

Se l'URL contiene `/library/`:
1. **Deploy → Manage deployments → Elimina il deployment Library**
2. **Deploy → New deployment → Tipo: "Web app"**

Se l'URL finisce con `/exec`:
1. **Deploy → Manage deployments**
2. Clicca l'icona **✏️ (modifica)** del deployment Web app

### **Step 3: Verifica le impostazioni**
Assicurati che sia impostato:
- **Execute as:** "Me"
- **Who has access:** **"Anyone"** ⚠️ **CRITICO!**

### **Step 4: Aggiorna il deployment**
1. Clicca **"Deploy"**
2. Se richiesto, **autorizza di nuovo** l'app
3. ✅ **Fatto!**

---

## 🔄 **Test della risoluzione**

1. **Ricarica** l'app Kids Points Tracker 
2. Dovresti vedere **"Google Sheets collegato ✅"**
3. Prova ad **aggiungere punti** a un bambino
4. Dovrebbe apparire **"Salvato su Google Sheets!"**

---

## ❓ **Se persiste l'errore**

### **Caso 1: Prima autorizzazione**
Se è la prima volta che usi lo script:
1. Durante il deploy potresti vedere warning di sicurezza
2. Clicca **"Advanced"** → **"Go to [nome progetto] (unsafe)"**
3. Clicca **"Allow"** per autorizzare

### **Caso 2: Script non aggiornato**
1. Verifica di aver copiato **tutto** il codice da `google-apps-script.js`
2. Il file dovrebbe iniziare con `function doPost(e) {`
3. **Salva** e **ri-deploya** se necessario

### **Caso 3: Account diverso**
1. Assicurati di essere loggato con lo **stesso account Google**
2. Che hai usato per creare lo script

---

## 🎯 **Verifica finale**

Vai su [drive.google.com](https://drive.google.com) - dovresti vedere un nuovo foglio:
- **Nome:** "Kids Points Tracker Data" (creato automaticamente)
- **Contenuto:** I dati dei punti in formato JSON

---

**⏱️ Tempo di risoluzione: ~1 minuto**  
**🔧 Causa più comune: "Who has access" non impostato su "Anyone"** 