import { exec } from 'child_process';
import { promisify } from 'util';

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

        // Step 1: Fetch Media List
        const { stdout: mediaList } = await execAsync('curl -s "http://10.5.5.9/gp/gpMediaList"');
        logs.push({ level: 'info', message: 'Fetched media list successfully.', data: mediaList });

        const media = JSON.parse(mediaList);
        const latestPhoto = media.media[0].fs.pop().n; // Get the latest photo name
        const photoPath = `http://10.5.5.9:80/videos/DCIM/${media.media[0].d}/${latestPhoto}`;
        logs.push({ level: 'info', message: `Latest photo determined: ${photoPath}` });

        // Step 2: Download the latest photo
        const downloadCommand = `curl -o public/latest_photo.jpg "${photoPath}"`;
        const { stdout: downloadOutput } = await execAsync(downloadCommand);
        logs.push({ level: 'info', message: 'Photo downloaded successfully.', data: downloadOutput });

        res.status(200).json({ photoPath: '/latest_photo.jpg', logs });
    } catch (error) {
        logs.push({ level: 'error', message: 'An error occurred during the process.', data: error.message });
        console.error('Error in API:', error);
        res.status(500).json({ error: 'Failed to fetch and download the latest photo.', logs });
    }
}
