import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function GoProStream() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [latestImageUrl, setLatestImageUrl] = useState("");

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener("change", handleChange);

        return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        // Simulate connection status changes
        const connectionTimeout = setTimeout(() => {
            setConnectionStatus("connected"); // Assume successful connection for demo
        }, 2000);

        return () => clearTimeout(connectionTimeout);
    }, []);

    useEffect(() => {
        if (connectionStatus === "connected") {
            // Fetch the latest image URL from the API
            fetch("/api/gopro-latest-image")
                .then((res) => res.json())
                .then((data) => {
                    if (data.url) {
                        setLatestImageUrl(data.url);
                    } else {
                        console.error("Failed to fetch latest image URL:", data.error);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching latest image URL:", error);
                });
        }
    }, [connectionStatus]);

    const ConnectionStatus = () => {
        if (connectionStatus === "connected") {
            return (
                <div className="flex items-center text-[#2ad853] text-xs rounded-full">
                    Connected
                </div>
            );
        } else if (connectionStatus === "disconnected") {
            return (
                <div className="flex items-center text-[#ff4d4d] text-xs rounded-full">
                    Disconnected
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-[#ffc107] text-xs px-1 rounded-full">
                    Connecting...
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
                    <div className="relative w-full h-96 bg-black border border-gray-700 rounded-md overflow-hidden">
                                <img
                                    src={"/GOPR0072.JPG"}
                                    alt="Latest GoPro"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                </div>
            </div>
        </div>
    );
}
