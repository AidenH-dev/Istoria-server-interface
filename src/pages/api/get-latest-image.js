import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Use curl to fetch the media list
            const { stdout: mediaListRaw } = await execPromise('curl -s "http://10.5.5.9/gp/gpMediaList"');
            const mediaList = JSON.parse(mediaListRaw);

            const latestDir = mediaList.media[0]?.d;
            const files = mediaList.media[0]?.fs || [];
            const latestFile = files[files.length - 1]?.n;

            if (!latestDir || !latestFile) {
                return res.status(404).json({ error: 'No images found in media list' });
            }

            const imageUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;

            // Use curl to fetch the image and stream it directly
            res.setHeader('Content-Type', 'image/jpeg');
            const curlProcess = exec(`curl -s "${imageUrl}"`);

            curlProcess.stdout.pipe(res);
            curlProcess.stderr.on('data', (data) => {
                console.error('Curl error:', data.toString());
                res.status(500).json({ error: 'Failed to stream image' });
            });
        } catch (error) {
            console.error('Error fetching latest image:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
