import { useState } from 'react';

export default function GoProStream() {
  const [latestPhoto, setLatestPhoto] = useState(null);

  const takePhoto = async () => {
    const response = await fetch('/api/gopro-take-photo', { method: 'POST' });
    const data = await response.json();

    if (response.ok) {
      setLatestPhoto(data.photoUrl);
    } else {
      console.error('Error taking photo:', data.error);
    }
  };

  return (
    <div>
      <button onClick={takePhoto}>Take Photo</button>
      {latestPhoto && <img src={latestPhoto} alt="Latest GoPro Photo" />}
    </div>
  );
}

