# 🚨 Errore: Deployment come Library

**Problema rilevato:** Hai deployato Google Apps Script come **"Library"** invece di **"Web App"**.

**URL sbagliato (Library):**
```
https://script.google.com/macros/library/d/[ID]/[NUMERO]
```

**URL corretto (Web App):**
```
https://script.google.com/macros/s/[ID]/exec
```

---

## 🔧 **Risoluzione (2 minuti)**

### **Step 1: Elimina il deployment Library**
1. Vai su [script.google.com](https://script.google.com)
2. Apri il tuo progetto
3. **Deploy → Manage deployments**
4. **Elimina** il deployment esistente (quello con URL `/library/`)

### **Step 2: Crea Web App deployment**
1. **Deploy → New deployment**
2. **Clicca l'icona ⚙️** accanto a "Type"
3. **Seleziona "Web app"** ⚠️ (NON "Library"!)

### **Step 3: Configura correttamente**
- **Description:** Kids Points API (opzionale)
- **Execute as:** "Me"
- **Who has access:** "Anyone" ⚠️ **CRITICO**

### **Step 4: Deploy e autorizza**
1. **Clicca "Deploy"**
2. **Autorizza** l'app se richiesto:
   - Clicca "Advanced" se vedi warning
   - Clicca "Go to [nome progetto] (unsafe)"
   - Clicca "Allow"
3. **Copia il nuovo URL** che finisce con `/exec`

---

## ✅ **Verifica il nuovo URL**

Il nuovo URL **deve essere così:**
```
https://script.google.com/macros/s/AKfycbxxxxx.../exec
```

**⚠️ Se non finisce con `/exec` hai sbagliato deployment!**

---

## 🧪 **Test rapido**

Puoi testare l'URL con questo comando:
```bash
curl -X POST [TUO_URL] \
  -H "Content-Type: application/json" \
  -d '{"action":"test"}'
```

**Risposta attesa:**
```json
{"status":"ok","message":"Connessione riuscita!"}
```

---

## 📝 **Differenze Library vs Web App**

| Tipo | URL | Accesso | Uso |
|------|-----|---------|-----|
| **Library** | `/library/d/[ID]/[N]` | Solo con login | Condivisione codice |
| **Web App** | `/s/[ID]/exec` | Pubblico | API endpoint |

**Per Kids Points Tracker serve Web App!**

---

**⏱️ Tempo: 2 minuti**  
**🎯 Risultato: URL pubblico che funziona con l'app** 