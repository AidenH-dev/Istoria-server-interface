import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Step 1: Trigger the GoPro to take a photo
    const takePhotoCommand = `curl "http://10.5.5.9/gp/gpControl/command/shutter?p=1"`;

    await new Promise((resolve, reject) => {
      exec(takePhotoCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error taking photo: ${stderr}`);
          reject(error);
        } else {
          console.log(`Photo taken: ${stdout}`);
          resolve();
        }
      });
    });

    // Step 2: Fetch the latest media list
    const mediaListCommand = `curl "http://10.5.5.9/gp/gpMediaList"`;

    const mediaList = await new Promise((resolve, reject) => {
      exec(mediaListCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error fetching media list: ${stderr}`);
          reject(error);
        } else {
          resolve(JSON.parse(stdout));
        }
      });
    });

    // Step 3: Get the latest photo's path
    const mediaFolder = mediaList.media[0].d;
    const latestFile = mediaList.media[0].fs[0].n;
    const fileUrl = `http://10.5.5.9:8080/videos/DCIM/${mediaFolder}/${latestFile}`;

    // Step 4: Download the latest photo
    const downloadCommand = `curl -o ./public/${latestFile} "${fileUrl}"`;

    await new Promise((resolve, reject) => {
      exec(downloadCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error downloading photo: ${stderr}`);
          reject(error);
        } else {
          console.log(`Photo downloaded: ${stdout}`);
          resolve();
        }
      });
    });

    // Respond with the latest photo URL
    res.status(200).json({ photoUrl: `/public/${latestFile}` });
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Failed to take and save photo' });
  }
}
