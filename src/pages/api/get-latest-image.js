import https from 'https';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch the media list
            const response = await fetch('http://10.5.5.9/gp/gpMediaList');
            if (!response.ok) {
                return res.status(500).json({ error: 'Failed to fetch media list' });
            }

            const mediaList = await response.json();
            const latestDir = mediaList.media[0]?.d;
            const files = mediaList.media[0]?.fs || [];
            const latestFile = files[files.length - 1]?.n;

            if (!latestDir || !latestFile) {
                return res.status(404).json({ error: 'No images found in media list' });
            }

            const fileUrl = `http://10.5.5.9:80/videos/DCIM/${latestDir}/${latestFile}`;

            // Stream the image file directly to the response
            https.get(fileUrl, (imageResponse) => {
                res.setHeader('Content-Type', imageResponse.headers['content-type']);
                res.setHeader('Content-Length', imageResponse.headers['content-length']);
                imageResponse.pipe(res);
            }).on('error', (err) => {
                console.error('Error streaming image:', err);
                res.status(500).json({ error: 'Failed to stream image' });
            });
        } catch (error) {
            console.error('Error fetching media list:', error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
