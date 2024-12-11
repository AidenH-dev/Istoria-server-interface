import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Received GET request');
            
            // Use curl to fetch the media list
            console.log('Fetching media list...');
            const curlMediaList = await execPromise('curl -s http://10.5.5.9/gp/gpMediaList');
            console.log('Raw media list response:', curlMediaList.stdout);

            // Parse response if it's a string
            const mediaList = typeof curlMediaList.stdout === 'string'
                ? JSON.parse(curlMediaList.stdout)
                : curlMediaList.stdout;

            console.log('Media list fetched successfully:', mediaList);

            const latestDir = mediaList.media[0]?.d;
            const files = mediaList.media[0]?.fs || [];
            const latestFile = files[files.length - 1]?.n;

            if (!latestDir || !latestFile) {
                console.error('No valid directory or file found.');
                return res.status(404).json({ error: 'No images found in media list' });
            }

            const imageUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;
            console.log('Constructed image URL:', imageUrl);

            // Set proper headers for image
            res.setHeader('Content-Type', 'image/jpeg');

            console.log('Starting image streaming...');
            
            const curlProcess = exec(`curl -s "${imageUrl}"`);

            curlProcess.stdout.pipe(res);

            curlProcess.stdout.on('end', () => {
                console.log('Image streaming completed successfully.');
            });

            curlProcess.stderr.on('data', (data) => {
                console.error('Curl process error:', data.toString());
                res.status(500).json({ error: 'Error during image streaming' });
            });

        } catch (error) {
            console.error('Error in handler:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
