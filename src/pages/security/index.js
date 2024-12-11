import { useState } from 'react';

export default function LatestGoProImage() {
    const [latestImageUrl, setLatestImageUrl] = useState(null);
    const [error, setError] = useState(null);

    const fetchLatestImage = async () => {
        try {
            const response = await fetch('/api/get-latest-image');
            const data = await response.json();
            if (response.ok) {
                setLatestImageUrl(data.imageUrl);
            } else {
                setError(data.error || 'Failed to fetch the latest image');
            }
        } catch (err) {
            setError('An unexpected error occurred while fetching the image');
        }
    };

    return (
        <div>
            <button onClick={fetchLatestImage}>Fetch Latest Image</button>
            {latestImageUrl && <img src={latestImageUrl} alt="Latest GoPro Image" />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
