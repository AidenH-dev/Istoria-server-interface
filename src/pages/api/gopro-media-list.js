export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://10.5.5.9/gp/gpMediaList');
            if (!response.ok) {
                console.error(`Error fetching media list: ${response.statusText}`);
                return res.status(response.status).json({ error: response.statusText });
            }
            const mediaList = await response.json();
            console.log('Media List:', mediaList);
            res.status(200).json({ mediaList });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch media list', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
