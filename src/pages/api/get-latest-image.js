import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Step 1: Fetch the media list using `curl`
            exec('curl -s "http://10.5.5.9/gp/gpMediaList"', (error, stdout) => {
                if (error) {
                    console.error('Error fetching media list:', error);
                    return res.status(500).json({ error: 'Failed to fetch media list' });
                }

                try {
                    // Parse the JSON response
                    const mediaList = JSON.parse(stdout);
                    const latestDir = mediaList.media[0]?.d;
                    const files = mediaList.media[0]?.fs || [];
                    const latestFile = files[files.length - 1]?.n;

                    if (!latestDir || !latestFile) {
                        return res.status(404).json({ error: 'No images found in media list' });
                    }

                    // Construct the file URL
                    const fileUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;

                    // Step 2: Download the file using curl
                    const downloadPath = path.join(process.cwd(), 'public', 'latest_photo.jpg');
                    exec(`curl -s -o ${downloadPath} "${fileUrl}"`, (downloadError) => {
                        if (downloadError) {
                            console.error('Error downloading image:', downloadError);
                            return res.status(500).json({ error: 'Failed to download image' });
                        }

                        // Step 3: Serve the downloaded image
                        fs.readFile(downloadPath, (readError, data) => {
                            if (readError) {
                                console.error('Error reading image:', readError);
                                return res.status(500).json({ error: 'Failed to read image' });
                            }

                            res.setHeader('Content-Type', 'image/jpeg');
                            res.send(data);
                        });
                    });
                } catch (parseError) {
                    console.error('Error parsing media list JSON:', parseError);
                    return res.status(500).json({ error: 'Invalid media list JSON' });
                }
            });
        } catch (generalError) {
            console.error('Unexpected error:', generalError);
            return res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
