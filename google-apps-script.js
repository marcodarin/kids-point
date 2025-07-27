/**
 * Kids Points Tracker - Google Apps Script
 * 
 * Questo codice va incollato su script.google.com per creare l'endpoint
 * che salva i dati su Google Sheets
 */

/**
 * Gestisce i preflight requests CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    // Gestisce il CORS per permettere le richieste dal frontend
    const response = ContentService.createTextOutput();
    response.setMimeType(ContentService.MimeType.JSON);
    
    // Parsing dei dati ricevuti
    const data = JSON.parse(e.postData.contents);
    
    // Ottiene il foglio di calcolo attivo (o lo crea se non esiste)
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Se non c'è un foglio attivo, ne crea uno nuovo
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create('Kids Points Tracker Data');
    }
    
    const sheet = spreadsheet.getActiveSheet();
    
    // Se è il primo utilizzo, crea le intestazioni
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Tipo', 'Data', 'Dati JSON']);
    }
    
    // Gestisce le diverse azioni
    switch (data.action) {
      case 'test':
        return response.setContent(JSON.stringify({
          status: 'ok',
          message: 'Connessione riuscita!',
          timestamp: new Date().toISOString()
        }));
        
      case 'save':
        // Salva i punti
        const pointsRow = [
          'POINTS', 
          new Date(), 
          JSON.stringify(data.points)
        ];
        sheet.appendRow(pointsRow);
        
        // Salva la storia
        const historyRow = [
          'HISTORY', 
          new Date(), 
          JSON.stringify(data.history)
        ];
        sheet.appendRow(historyRow);
        
        return response.setContent(JSON.stringify({
          status: 'saved',
          message: 'Dati salvati con successo!',
          timestamp: new Date().toISOString()
        }));
        
      case 'load':
        const values = sheet.getDataRange().getValues();
        let points = null;
        let history = null;
        
        // Trova gli ultimi dati salvati (cerca dal basso verso l'alto)
        for (let i = values.length - 1; i >= 0; i--) {
          if (values[i][0] === 'POINTS' && !points) {
            try {
              points = JSON.parse(values[i][2]);
            } catch (parseError) {
              console.error('Errore parsing points:', parseError);
            }
          }
          if (values[i][0] === 'HISTORY' && !history) {
            try {
              history = JSON.parse(values[i][2]);
            } catch (parseError) {
              console.error('Errore parsing history:', parseError);
            }
          }
          // Se abbiamo trovato entrambi, possiamo fermarci
          if (points && history) break;
        }
        
        return response.setContent(JSON.stringify({
          points: points || {1: 0, 2: 0, 3: 0, 4: 0},
          history: history || [],
          timestamp: new Date().toISOString()
        }));
        
      default:
        throw new Error('Azione non riconosciuta: ' + data.action);
    }
    
  } catch (error) {
    console.error('Errore nel doPost:', error);
    
    const errorResponse = ContentService.createTextOutput();
    errorResponse.setMimeType(ContentService.MimeType.JSON);
    
    return errorResponse.setContent(JSON.stringify({
      error: error.toString(),
      message: 'Errore del server',
      timestamp: new Date().toISOString()
    }));
  }
}

/**
 * Funzione opzionale per testare lo script manualmente
 */
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        action: 'test'
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}

/**
 * Funzione per pulire i dati vecchi (da eseguire manualmente se necessario)
 */
function cleanOldData() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    console.log('Nessun foglio di calcolo attivo trovato');
    return;
  }
  
  const sheet = spreadsheet.getActiveSheet();
  const values = sheet.getDataRange().getValues();
  
  // Mantiene solo gli ultimi 100 record per tipo
  const pointsRecords = [];
  const historyRecords = [];
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === 'POINTS') {
      pointsRecords.push(i + 1); // +1 perché getRange è 1-indexed
    } else if (values[i][0] === 'HISTORY') {
      historyRecords.push(i + 1);
    }
  }
  
  // Elimina i record più vecchi se ce ne sono troppi
  if (pointsRecords.length > 50) {
    const toDelete = pointsRecords.slice(0, pointsRecords.length - 50);
    // Elimina dal basso verso l'alto per non cambiare gli indici
    for (let i = toDelete.length - 1; i >= 0; i--) {
      sheet.deleteRow(toDelete[i]);
    }
  }
  
  console.log('Pulizia completata');
} 