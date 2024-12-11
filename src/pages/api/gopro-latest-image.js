export default async function handler(req, res) {
  try {
      const mediaListResponse = await fetch('http://10.5.5.9/gp/gpMediaList');
      const mediaList = await mediaListResponse.json();
      
      const latestMedia = mediaList.media[0].fs[0]; // Get the latest media file
      const imageUrl = `http://10.5.5.9:8080/videos/${mediaList.media[0].d}/${latestMedia.n}`;
      
      res.status(200).json({ imageUrl });
  } catch (error) {
      console.error('Error fetching GoPro media list:', error);
      res.status(500).json({ error: 'Failed to fetch latest image' });
  }
}
