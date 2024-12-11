import { useState } from 'react';

export default function LatestGoProImage() {
    const [latestPhoto, setLatestPhoto] = useState(null);
    const [error, setError] = useState(null);

    const fetchLatestImage = async () => {
        try {
            const response = await fetch('/api/fetch-latest-image');
            if (response.ok) {
                setLatestPhoto('/latest_photo.jpg'); // URL to the saved image
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.error || 'Failed to fetch the latest image');
            }
        } catch (fetchError) {
            setError('An unexpected error occurred while fetching the image');
        }
    };

    return (
        <div>
            <button onClick={fetchLatestImage}>Fetch Latest Image</button>
            {latestPhoto && <img src={latestPhoto} alt="Latest GoPro Image" />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
