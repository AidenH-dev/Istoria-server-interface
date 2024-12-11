import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function GoProStream() {
    const [latestPhoto, setLatestPhoto] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLatestPhoto = async () => {
        try {
            const response = await fetch('/api/gopro-take-photo', { method: 'POST' });
            const data = await response.json();
            if (response.ok) {
                setLatestPhoto(data.photoPath);
            } else {
                console.error('Error fetching photo:', data.error);
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestPhoto();
        const interval = setInterval(fetchLatestPhoto, 10000); // Update every 10 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen bg-[#02040a]">
            <Head>
                <title>GoPro Live Stream</title>
            </Head>
            <Navbar />
            <div className="container mx-auto mt-16">
                <h1 className="text-3xl font-bold text-white">GoPro Live Stream Interface</h1>
                <div className="mt-4 bg-gray-800 text-white p-4 border border-[#b7bdc8] rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Live Stream</h2>
                    </div>
                    <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden">
                        {loading ? (
                            <p className="text-white text-center">Loading latest photo...</p>
                        ) : (
                            latestPhoto ? (
                                <img src={latestPhoto} alt="Latest GoPro Photo" style={{ maxWidth: '100%' }} />
                            ) : (
                                <p className="text-white text-center">No photo available.</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
