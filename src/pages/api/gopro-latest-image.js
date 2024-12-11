export default async function handler(req, res) {
  try {
      // Fetch the media list from the GoPro
      const response = await fetch("http://10.5.5.9/gp/gpMediaList");
      if (!response.ok) {
          throw new Error(`GoPro API error: ${response.statusText}`);
      }

      // Read and parse the response
      const textData = await response.text();
      let data;
      try {
          data = JSON.parse(textData);
      } catch (err) {
          throw new Error(`Failed to parse JSON: ${err.message}`);
      }

      // Navigate to the latest image
      const media = data.media?.[0]?.fs || [];
      const latestImage = media.reverse().find((item) => item.n.endsWith(".JPG"));

      if (!latestImage) {
          throw new Error("No image found in the media list.");
      }

      // Construct the full URL for the latest image
      const imageUrl = `http://10.5.5.9:8080/${data.media[0].d}/${latestImage.n}`;

      res.status(200).json({ url: imageUrl });
  } catch (error) {
      console.error("Error fetching GoPro latest image:", error.message);
      res.status(500).json({ error: error.message });
  }
}

