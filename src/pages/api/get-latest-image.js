import { exec } from 'child_process';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Use curl command to fetch the media list
            exec('curl -s "http://10.5.5.9/gp/gpMediaList"', (error, stdout, stderr) => {
                if (error) {
                    console.error('Error executing curl:', error);
                    return res.status(500).json({ error: 'Failed to fetch media list using curl' });
                }

                if (stderr) {
                    console.error('stderr from curl:', stderr);
                    return res.status(500).json({ error: 'Curl command failed' });
                }

                try {
                    // Parse the response
                    const mediaList = JSON.parse(stdout);
                    const latestDir = mediaList.media[0]?.d;
                    const files = mediaList.media[0]?.fs || [];
                    const latestFile = files[files.length - 1]?.n;

                    if (!latestDir || !latestFile) {
                        return res.status(404).json({ error: 'No images found in media list' });
                    }

                    // Construct the URL for the latest image
                    const fileUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;
                    res.status(200).json({ imageUrl: fileUrl });
                } catch (parseError) {
                    console.error('Error parsing media list:', parseError);
                    res.status(500).json({ error: 'Failed to parse media list response' });
                }
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
