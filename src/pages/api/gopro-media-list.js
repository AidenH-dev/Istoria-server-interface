import { exec } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'GET') {
        exec('curl -s "http://10.5.5.9/gp/gpMediaList"', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                return res.status(500).json({ error: 'Failed to fetch media list', details: stderr });
            }
            console.log(`Media List: ${stdout}`);
            return res.status(200).json({ mediaList: JSON.parse(stdout) });
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
