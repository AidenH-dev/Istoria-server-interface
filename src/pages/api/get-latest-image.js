import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    console.log('API Handler Invoked: Method', req.method);

    if (req.method === 'GET') {
        try {
            console.log('Fetching media list from GoPro...');
            // Use curl to fetch the media list
            const { stdout: mediaListRaw } = await execPromise('curl -s "http://10.5.5.9/gp/gpMediaList"');
            console.log('Media list raw response:', mediaListRaw);

            const mediaList = JSON.parse(mediaListRaw);
            console.log('Parsed media list:', JSON.stringify(mediaList, null, 2));

            const latestDir = mediaList.media[0]?.d;
            const files = mediaList.media[0]?.fs || [];
            const latestFile = files[files.length - 1]?.n;

            console.log('Latest directory:', latestDir);
            console.log('Files in directory:', files);
            console.log('Latest file:', latestFile);

            if (!latestDir || !latestFile) {
                console.error('No images found in media list');
                return res.status(404).json({ error: 'No images found in media list' });
            }

            const imageUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;
            console.log('Constructed image URL:', imageUrl);

            // Use curl to fetch the image and stream it directly
            res.setHeader('Content-Type', 'image/jpeg');
            console.log('Starting image streaming...');

            const curlProcess = exec(`curl -s "${imageUrl}"`);
            curlProcess.stdout.pipe(res);

            curlProcess.stderr.on('data', (data) => {
                console.error('Curl process error:', data.toString());
                res.status(500).json({ error: 'Failed to stream image' });
            });

            curlProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('Image streaming completed successfully.');
                } else {
                    console.error('Curl process exited with code:', code);
                }
            });
        } catch (error) {
            console.error('Error occurred while fetching or streaming image:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        console.warn('Invalid request method:', req.method);
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
