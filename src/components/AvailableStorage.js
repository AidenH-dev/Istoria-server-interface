import React, { useState, useEffect } from "react";
import { AiOutlineDatabase } from "react-icons/ai";

const SystemStorage = () => {
    const [storageInfo, setStorageInfo] = useState({ totalStorage: 0, usedStorage: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStorageInfo() {
            try {
                const response = await fetch("/api/storage");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setStorageInfo({
                    totalStorage: parseFloat(data.totalStorage),
                    usedStorage: parseFloat(data.usedStorage),
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching storage info:", error);
                setLoading(false);
            }
        }

        fetchStorageInfo();
    }, []);

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    const { totalStorage, usedStorage } = storageInfo;

    // Calculate percentage used
    const percentageUsed = totalStorage > 0
        ? Math.min(Math.max((usedStorage / totalStorage) * 100, 0), 100)
        : 0;

    const progressBarLength = 10; // Fixed length for the progress bar
    const filledBars = Math.max(Math.floor((percentageUsed / 100) * progressBarLength), 1);
    const emptyBars = progressBarLength - filledBars;
    const progressBar = "[" + "=".repeat(filledBars) + "‎ ".repeat(emptyBars) + "]";

    return (
        <div className="relative group cursor-default my-4 flex items-center text-white px-1 pr-1 py-0.5 rounded-md border border-[#b7bdc8] w-fit">
            <div className="text-2xl">
                <AiOutlineDatabase className="h-4 text-green-300" />
            </div>
            <div className="text-sm font-medium mr-1" style={{ fontFamily: "'Courier New', monospace" }}>
                {`Used: ${usedStorage.toFixed(2)} / ${totalStorage.toFixed(2)} GB`}
            </div>
            <div className="text-sm font-mono text-green-300">
                {progressBar}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Storage Usage
            </div>
        </div>
    );
};

export default SystemStorage;
