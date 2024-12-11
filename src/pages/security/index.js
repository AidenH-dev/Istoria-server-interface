import Navbar from '@/components/Navbar';
import Head from 'next/head';

export default function GoProMediaList() {
    const fetchMediaList = async () => {
        try {
            const response = await fetch('/api/gopro-media-list');
            const data = await response.json();
            if (response.ok) {
                console.log('Media List:', data.mediaList);
            } else {
                console.error('Error fetching media list:', data.error);
            }
        } catch (error) {
            console.error('Error fetching media list:', error);
        }
    };

    return (
        <div className="h-screen bg-[#02040a]">
            <Head>
                <title>GoPro Media List</title>
            </Head>
            <Navbar />
            <div className="container mx-auto mt-16">
                <h1 className="text-3xl font-bold text-white">GoPro Media List</h1>
                <div className="mt-4 bg-gray-800 text-white p-4 border border-[#b7bdc8] rounded-md">
                    <div className="flex justify-center">
                        <button
                            onClick={fetchMediaList}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Fetch Media List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
