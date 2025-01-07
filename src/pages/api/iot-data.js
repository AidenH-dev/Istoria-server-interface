import db from '../../lib/db.js';

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.all('SELECT * FROM IoTData', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data' });
      } else {
        res.status(200).json(rows);
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
