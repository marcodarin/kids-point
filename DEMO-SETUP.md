# 🎬 Demo Setup Google Sheets

Demo passo-passo per configurare Google Sheets in 2 minuti.

## 🎯 **Obiettivo**
Creare il database Google Sheets per salvare i punti dei bambini.

---

## **Step 1: Apri Google Apps Script**

```
1. Vai su: https://script.google.com
2. Accedi con il tuo account Google
3. Clicca il pulsante "Nuovo progetto"
```

**Risultato:** Si apre l'editor con del codice predefinito.

---

## **Step 2: Sostituisci il codice**

```
1. Seleziona TUTTO il codice esistente (Ctrl+A)
2. Cancella tutto (Backspace)
3. Copia TUTTO il contenuto dal file "google-apps-script.js"
4. Incolla nell'editor (Ctrl+V)
```

**Risultato:** L'editor ora contiene il codice per Kids Points Tracker.

---

## **Step 3: Deploy come Web App**

```
1. Clicca "Deploy" in alto a destra
2. Seleziona "New deployment"  
3. Clicca l'icona dell'ingranaggio accanto a "Type"
4. Seleziona "Web app"
```

**Configura i permessi:**
```
- Execute as: "Me" 
- Who has access: "Anyone" ⚠️ IMPORTANTE!
```

```
5. Clicca "Deploy"
6. Se richiesto, clicca "Authorize access"
7. Seleziona il tuo account Google
8. Clicca "Advanced" → "Go to [nome progetto] (unsafe)"
9. Clicca "Allow"
```

**Risultato:** Ottieni un URL che finisce con `/exec`

---

## **Step 4: Testa nell'app**

```
1. Apri l'app Kids Points Tracker
2. Vedrai un banner rosso "Configurazione richiesta"
3. Clicca "⚙️ Configura Google Sheets"
4. Incolla l'URL copiato nel campo
5. Clicca "Configura"
```

**Risultato:** Vedrai "Google Sheets collegato" ✅

---

## **Step 5: Test finale**

```
1. Aggiungi 5 punti a "Gaia" per "Ha aiutato in cucina"
2. Dovresti vedere "Salvato su Google Sheets!"
3. Vai su drive.google.com
4. Vedrai un nuovo foglio di calcolo creato automaticamente
```

**🎉 Completato!** L'app ora salva tutto su Google Sheets.

---

## **🚨 Se qualcosa va storto**

### Error: "CORS policy"
```
Problema: "Who has access" non è impostato su "Anyone"
Soluzione: Ri-deploy con "Anyone" selezionato
```

### Error: "Script function not found"  
```
Problema: Codice non copiato correttamente
Soluzione: Verifica di aver copiato TUTTO il codice da google-apps-script.js
```

### Error: "Unauthorized"
```
Problema: Autorizzazioni non concesse
Soluzione: Ri-autorizza l'app nel processo di deploy
```

---

**⏱️ Tempo totale: ~2 minuti**
**💰 Costo: €0 (Google Sheets è gratuito)**
**🔄 Una volta sola: Non devi ripetere questo setup** 