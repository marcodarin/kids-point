import { NextApiRequest, NextApiResponse } from 'next';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Controlla se DATABASE_URL è configurata
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'DATABASE_URL non configurata. Crea il file .env.local con la tua connection string di Neon.' 
      });
    }

    const sql = neon(process.env.DATABASE_URL);
    if (req.method === 'GET') {
      // Carica punti e storico
      const [pointsResult, historyResult] = await Promise.all([
        sql`SELECT child_id, total_points FROM points ORDER BY child_id`,
        sql`SELECT * FROM history ORDER BY created_at DESC LIMIT 100`
      ]);

      // Trasforma i risultati nel formato atteso dal frontend
      const points = {};
      pointsResult.forEach((row: any) => {
        points[row.child_id] = row.total_points;
      });

      const history = historyResult.map((row: any) => ({
        id: row.id,
        childId: row.child_id,
        childName: row.child_name,
        points: row.points,
        reason: row.reason,
        timestamp: row.timestamp,
        color: row.color
      }));

      res.status(200).json({ points, history });
    }
    
    else if (req.method === 'POST') {
      const { action, points: newPoints, history: newHistory } = req.body;

      if (action === 'save') {
        // Inizia una transazione per aggiornare punti e aggiungere alla history
        await sql`BEGIN`;

        try {
          // Aggiorna i punti per tutti i bambini
          for (const [childId, totalPoints] of Object.entries(newPoints)) {
            await sql.query(
              'UPDATE points SET total_points = $1, updated_at = CURRENT_TIMESTAMP WHERE child_id = $2',
              [totalPoints, parseInt(childId)]
            );
          }

          // Aggiungi l'ultima entry alla history (solo quella nuova)
          if (newHistory && newHistory.length > 0) {
            const latestEntry = newHistory[0]; // Il primo elemento è il più recente
            await sql.query(
              'INSERT INTO history (id, child_id, child_name, points, reason, timestamp, color) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING',
              [
                latestEntry.id,
                latestEntry.childId,
                latestEntry.childName,
                latestEntry.points,
                latestEntry.reason,
                latestEntry.timestamp,
                latestEntry.color
              ]
            );
          }

          await sql`COMMIT`;
          res.status(200).json({ success: true });
        } catch (error) {
          await sql`ROLLBACK`;
          throw error;
        }
      }
      
      else if (action === 'load') {
        // Stesso codice del GET
        const [pointsResult, historyResult] = await Promise.all([
          sql`SELECT child_id, total_points FROM points ORDER BY child_id`,
          sql`SELECT * FROM history ORDER BY created_at DESC LIMIT 100`
        ]);

        const points = {};
        pointsResult.forEach((row: any) => {
          points[row.child_id] = row.total_points;
        });

        const history = historyResult.map((row: any) => ({
          id: row.id,
          childId: row.child_id,
          childName: row.child_name,
          points: row.points,
          reason: row.reason,
          timestamp: row.timestamp,
          color: row.color
        }));

        res.status(200).json({ points, history });
      }
      
      else {
        res.status(400).json({ error: 'Azione non valida' });
      }
    }
    
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Errore API:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
}