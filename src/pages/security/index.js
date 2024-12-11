import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function GoProStream() {


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
                    </div>
                    <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                    <Image src={"/latest_image_1733918688.jpg"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
