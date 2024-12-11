import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState } from 'react';

export default function GoProStream() {
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLatestImage = async () => {
        setLoading(true);
        setError(null);
        try {
            setImageSrc(`/api/get-latest-image?t=${Date.now()}`); // Append timestamp to avoid caching
        } catch (err) {
            console.error('Error fetching image:', err);
            setError('Failed to fetch the latest image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-[#02040a]">
            <Head>
                <title>GoPro Image Viewer</title>
            </Head>
            <Navbar />
            <div className="container mx-auto mt-16">
                <h1 className="text-3xl font-bold text-white">GoPro Image Viewer</h1>
                <div className="mt-4 bg-gray-800 text-white p-4 border border-[#b7bdc8] rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Latest Image</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={fetchLatestImage}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Fetch Latest Image'}
                        </button>
                    </div>
                    <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                        {error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : imageSrc ? (
                            <img src={imageSrc} alt="Latest GoPro Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        ) : (
                            <p className="text-white text-center">{loading ? 'Loading image...' : 'No image to display'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
