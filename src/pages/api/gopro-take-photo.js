import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  try {
    // Step 1: Trigger the GoPro to take a photo
    const takePhotoCommand = `curl -s "http://10.5.5.9/gp/gpControl/command/shutter?p=1"`;
    await execPromise(takePhotoCommand);

    // Step 2: Fetch the latest media list
    const mediaListCommand = `curl -s "http://10.5.5.9/gp/gpMediaList"`;
    const { stdout } = await execPromise(mediaListCommand);
    const mediaList = JSON.parse(stdout);

    if (!mediaList.media || mediaList.media.length === 0) {
      throw new Error("No media found on the GoPro.");
    }

    // Step 3: Locate the latest photo in the media folder
    const mediaFolder = mediaList.media[0]?.d; // e.g., '100GOPRO'
    const latestPhoto = mediaList.media[0]?.fs.find((file) => file.n.endsWith('.JPG'));

    if (!mediaFolder || !latestPhoto) {
      throw new Error("Failed to retrieve the latest photo information.");
    }

    // Step 4: Download the latest photo
    const fileUrl = `http://10.5.5.9:8080/DCIM/${mediaFolder}/${latestPhoto.n}`;
    const downloadCommand = `curl -o ./public/${latestPhoto.n} "${fileUrl}"`;
    await execPromise(downloadCommand);

    // Step 5: Respond with the latest photo URL
    res.status(200).json({ photoUrl: `/${latestPhoto.n}` });
  } catch (error) {
    console.error('Error in API:', error.message);
    res.status(500).json({ error: error.message });
  }
}
