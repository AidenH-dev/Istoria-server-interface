import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { BiCamera } from 'react-icons/bi';
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";

export default function GoProStream() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connected', 'disconnected', or 'connecting'

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        // Simulate connection status changes
        const connectionTimeout = setTimeout(() => {
            setConnectionStatus('connected'); // Assume successful connection for demo
        }, 2000);

        return () => clearTimeout(connectionTimeout);
    }, []);

    const ConnectionStatus = () => {
        if (connectionStatus === 'connected') {
            return (
                <div className="flex items-center text-[#2ad853] text-xs rounded-full">
                    <RiArrowDropUpLine className="w-6 h-6" /> Connected
                </div>
            );
        } else if (connectionStatus === 'disconnected') {
            return (
                <div className="flex items-center text-[#ff4d4d] text-xs rounded-full">
                    <RiArrowDropDownLine className="w-6 h-6" /> Disconnected
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-[#ffc107] text-xs px-1 rounded-full">
                    <TbDots className="w-6 h-6 animate-pulse" /> Connecting...
                </div>
            );
        }
    };

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
                        <ConnectionStatus />
                    </div>
                    {connectionStatus === 'connected' ? (
                        <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden">
                            <video
                                className="w-full h-full object-cover"
                                autoPlay
                                controls
                                src="/api/gopro-stream"
                            />

                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-96 bg-gray-700 rounded-md">
                            <p className="text-gray-400">Awaiting connection...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
