import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execPromise = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Step 1: Trigger the GoPro to take a photo
            await execPromise('curl -X GET "http://10.5.5.9/gp/gpControl/command/shutter?p=1"');
            
            // Step 2: Fetch the latest image and save it to the public directory
            const { stdout: mediaUrl } = await execPromise(
                `curl -s "$(curl -s "http://10.5.5.9/gp/gpMediaList" | jq -r '.media[0] | "http://10.5.5.9:80/videos/DCIM/\\(.d)/\\(.fs[-1].n)"')"`
            );

            const uniqueFilename = `FASTlatest_image_${Date.now()}.jpg`;
            const imagePath = path.join(process.cwd(), 'public', uniqueFilename);

            const curlSaveCommand = `curl -s "${mediaUrl.trim()}" -o "${imagePath}"`;
            await execPromise(curlSaveCommand);

            // Step 3: Respond with the saved image URL
            const publicPath = `/${uniqueFilename}`;
            res.status(200).json({ imagePath: publicPath });
        } catch (error) {
            console.error('Error taking photo or saving image:', error);
            res.status(500).json({ error: 'Failed to take photo or save the image.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
