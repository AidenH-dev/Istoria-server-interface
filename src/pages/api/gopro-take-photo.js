import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const mediaListCommand = `curl -s "http://10.5.5.9/gp/gpMediaList"`;
        exec(mediaListCommand, (error, stdout) => {
            if (error) {
                console.error('Error fetching media list:', error);
                return res.status(500).json({ error: 'Failed to fetch media list.' });
            }

            try {
                const mediaList = JSON.parse(stdout);
                const latestMedia = mediaList.media[0]?.fs.slice(-1)[0];
                if (!latestMedia || !latestMedia.n.endsWith('.JPG')) {
                    return res.status(404).json({ error: 'No valid photo found.' });
                }

                const latestPhotoPath = `http://10.5.5.9:80/videos/DCIM/${mediaList.media[0].d}/${latestMedia.n}`;
                const downloadCommand = `curl -o ./public/latest_photo.jpg "${latestPhotoPath}"`;
                exec(downloadCommand, (downloadError) => {
                    if (downloadError) {
                        console.error('Error downloading latest photo:', downloadError);
                        return res.status(500).json({ error: 'Failed to download the latest photo.' });
                    }

                    res.status(200).json({ photoPath: '/latest_photo.jpg' });
                });
            } catch (parseError) {
                console.error('Error parsing media list:', parseError);
                res.status(500).json({ error: 'Invalid response from GoPro API.' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
