import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function GoProStream() {
    const [imageSrc, setImageSrc] = useState(null); // State to store the image URL
    const [loading, setLoading] = useState(false); // State to show loading status

    const handleTakePhoto = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/take-photo');
            if (!response.ok) {
                throw new Error('Failed to take photo.');
            }
            const { imagePath } = await response.json();
            setImageSrc(imagePath); // Update the image source
        } catch (error) {
            console.error('Error:', error);
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
                        <h2 className="text-xl font-semibold">Live</h2>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleTakePhoto}
                            disabled={loading}
                        >
                            {loading ? 'Taking Photo...' : 'Take Photo'}
                        </button>
                    </div>
                    <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                        {imageSrc ? (
                            <Image src={imageSrc} alt="GoPro Image" layout="fill" objectFit="contain" />
                        ) : (
                            <p className="text-gray-400">No image available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
