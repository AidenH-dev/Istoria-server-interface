import { promises as fs } from "fs";
import path from "path";
import fetch from "node-fetch";

export default async function handler(req, res) {
    try {
        // Fetch the media list from the GoPro
        const mediaListResponse = await fetch("http://10.5.5.9/gp/gpMediaList");
        const mediaList = await mediaListResponse.json();

        // Ensure the media list is valid
        if (!mediaList.media || mediaList.media.length === 0) {
            return res.status(500).json({ error: "No media found in GoPro response." });
        }

        // Extract the latest photo
        const folder = mediaList.media[0].d;
        const latestPhoto = mediaList.media[0].fs
            .filter(file => file.n.endsWith(".JPG"))
            .sort((a, b) => parseInt(b.cre) - parseInt(a.cre))[0];

        if (!latestPhoto) {
            return res.status(404).json({ error: "No photos found in the media list." });
        }

        const photoUrl = `http://10.5.5.9:80/videos/DCIM/${folder}/${latestPhoto.n}`;

        // Download the latest photo
        const photoResponse = await fetch(photoUrl);
        if (!photoResponse.ok) {
            return res.status(500).json({ error: "Failed to download the photo." });
        }

        // Save the photo to the public folder
        const photoBuffer = await photoResponse.buffer();
        const photoPath = path.join(process.cwd(), "public", "latest_photo.jpg");
        await fs.writeFile(photoPath, photoBuffer);

        res.status(200).json({ message: "Latest photo downloaded successfully.", photoPath: "/latest_photo.jpg" });
    } catch (error) {
        console.error("Error in API:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
}
