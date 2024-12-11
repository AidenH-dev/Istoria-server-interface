import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

export default async function handler(req, res) {
    const logs = [];

    if (req.method !== 'POST') {
        const errorMessage = 'Invalid request method. Only POST is allowed.';
        logs.push({ level: 'error', message: errorMessage });
        console.error(errorMessage);
        return res.status(405).json({ error: errorMessage, logs });
    }

    try {
        logs.push({ level: 'info', message: 'Starting the process to fetch the latest photo.' });

        const { stdout: mediaList } = await execAsync('curl -s "http://10.5.5.9/gp/gpMediaList"');
        logs.push({ level: 'info', message: 'Fetched media list successfully.', data: mediaList });

        const media = JSON.parse(mediaList);
        const latestPhoto = media.media[0].fs.pop().n;
        const photoPath = `http://10.5.5.9:80/videos/DCIM/${media.media[0].d}/${latestPhoto}`;
        logs.push({ level: 'info', message: `Latest photo determined: ${photoPath}` });

        const downloadCommand = `curl -o public/latest_photo.jpg "${photoPath}"`;
        const { stdout: downloadOutput } = await execAsync(downloadCommand);
        logs.push({ level: 'info', message: 'Photo downloaded successfully.', data: downloadOutput });

        // Check file size and modification time
        const filePath = path.join(process.cwd(), 'public', 'latest_photo.jpg');
        const fileStats = fs.statSync(filePath);
        logs.push({
            level: 'info',
            message: 'Photo file stats',
            data: { size: fileStats.size, mtime: fileStats.mtime }
        });

        res.status(200).json({ photoPath: '/latest_photo.jpg', logs });
    } catch (error) {
        logs.push({ level: 'error', message: 'An error occurred during the process.', data: error.message });
        console.error('Error in API:', error);
        res.status(500).json({ error: 'Failed to fetch and download the latest photo.', logs });
    }
}
