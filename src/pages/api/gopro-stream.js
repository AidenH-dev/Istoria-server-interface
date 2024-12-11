import http from 'http';
import { Readable } from 'stream';

export default async function handler(req, res) {
  // Set headers to allow streaming
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for stricter policies if needed

  // Forward the GoPro stream from the Linux server
  const goproStreamUrl = 'http://10.5.5.100:8554'; // Updated GoPro stream address

  try {
    const response = await fetch(goproStreamUrl);
    if (!response.ok) {
      res.status(response.status).end('Failed to fetch GoPro stream');
      return;
    }

    const stream = Readable.from(response.body);
    stream.pipe(res);
  } catch (error) {
    console.error('Error fetching GoPro stream:', error);
    res.status(500).end('Internal server error');
  }
}
