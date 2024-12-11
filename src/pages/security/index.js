import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function GoProStream() {


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
