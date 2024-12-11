export default async function handler(req, res) {
  try {
      // Fetch media list from GoPro as raw text
      const response = await fetch("http://10.5.5.9/gp/gpMediaList");

      if (!response.ok) {
          throw new Error(`GoPro API error: ${response.statusText}`);
      }

      const textData = await response.text();

      // Truncate or sanitize the response
      const sanitizedData = textData.replace(/[^ -~\n\r]+/g, ""); // Remove non-printable characters

      let parsedData;
      try {
          parsedData = JSON.parse(sanitizedData);
      } catch (err) {
          throw new Error(`Failed to parse JSON: ${err.message}`);
      }

      // Extract the latest image from the parsed data
      const media = parsedData.media?.[0]?.fs || [];
      const latestImage = media.reverse().find((item) => item.n.endsWith(".JPG"));

      if (!latestImage) {
          throw new Error("No image found in the media list.");
      }

      // Construct the image URL
      const imageUrl = `http://10.5.5.9:8080/${parsedData.media[0].d}/${latestImage.n}`;

      res.status(200).json({ url: imageUrl });
  } catch (error) {
      console.error("Error fetching GoPro latest image:", error.message);
      res.status(500).json({ error: error.message });
  }
}

