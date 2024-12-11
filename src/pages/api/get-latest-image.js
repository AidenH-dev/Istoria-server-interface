import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            console.log('Received GET request');

            // Fetch the media list
            console.log('Fetching media list...');
            const curlMediaList = await execPromise('curl -s http://10.5.5.9/gp/gpMediaList');
            let mediaList;
            try {
                mediaList = JSON.parse(curlMediaList.stdout);
            } catch (err) {
                console.error('Error parsing JSON:', err);
                res.status(500).json({ error: 'Failed to parse media list' });
                return;
            }

            console.log('Media list fetched successfully:', mediaList);

            const latestDir = mediaList.media[0]?.d;
            const files = mediaList.media[0]?.fs || [];
            const latestFile = files[files.length - 1]?.n;

            if (!latestDir || !latestFile) {
                console.error('No valid directory or file found.');
                res.status(404).json({ error: 'No images found in media list' });
                return;
            }

            const imageUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;
            console.log('Constructed image URL:', imageUrl);

            // Generate a unique filename
            const uniqueFilename = `${uuidv4()}.jpg`;
            const savePath = path.join(process.cwd(), 'public', uniqueFilename);

            // Use curl to download the image and save it
            console.log('Downloading image and saving to:', savePath);
            const curlProcess = exec(`curl -s "${imageUrl}"`);

            const writeStream = fs.createWriteStream(savePath);
            curlProcess.stdout.pipe(writeStream);

            writeStream.on('finish', () => {
                console.log('Image saved successfully:', savePath);
                res.status(200).json({ message: 'Image saved successfully', filePath: `/public/${uniqueFilename}` });
            });

            writeStream.on('error', (error) => {
                console.error('Error saving image:', error);
                res.status(500).json({ error: 'Failed to save image' });
            });

            curlProcess.stderr.on('data', (error) => {
                console.error('Error streaming image:', error.toString());
                res.status(500).json({ error: 'Failed to stream image' });
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
