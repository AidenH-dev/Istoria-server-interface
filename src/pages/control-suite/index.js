import { useEffect, useState } from 'react';

import Head from 'next/head';
import Navbar from '../components/Navbar';
import { renderToString } from 'react-dom/server';
import { CiServer } from 'react-icons/ci';
import { BiNetworkChart } from 'react-icons/bi';
import { HiOutlineCommandLine } from "react-icons/hi2";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import WeatherInterface from '@/components/WeatherInterface'; // Adjust path as needed
import UsersOnline from '@/components/UsersOnline';
import SecurityCamStatus from '@/components/SecurityCamStatus';
import SystemStorage from '@/components/AvailableStorage';
import FileSidebar from '@/components/FileSidebar';


export default function IoTDataPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/api/iot-data')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching IoT data:', error));
    }, []);


    const [isDarkMode, setIsDarkMode] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connected', 'disconnected', or 'connecting'
    const [selectedTab, setSelectedTab] = useState('hub'); // Default tab is 'hub'

    useEffect(() => {
        // Simulate connection status changes
        const connectionTimeout = setTimeout(() => {
            setConnectionStatus(Math.random() > 0.5 ? 'connected' : 'disconnected');
        }, 3000);

        return () => clearTimeout(connectionTimeout);
    }, [connectionStatus]);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);


    const faviconSvg = encodeURIComponent(
        renderToString(
            <CiServer size={64} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        )
    );

    const ConnectionStatus = () => {
        if (connectionStatus === 'connected') {
            return (
                <div className="flex items-center text-[#2ad853] text-xs rounded-full">
                    <RiArrowDropUpLine className="w-6 h-6" />
                </div>
            );
        } else if (connectionStatus === 'disconnected') {
            return (
                <div className="flex items-center text-[#ff4d4d] text-xs rounded-full">
                    <RiArrowDropDownLine className="w-6 h-6" />
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-[#ffc107] text-xs px-1 rounded-full">
                    <TbDots className="w-6 h-6 animate-pulse" />
                </div>
            );
        }
    };

    return (
        <div className="h-screen bg-[#02040a]">
            <Head>
                <title>Istoria Interface</title>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={`data:image/svg+xml,${faviconSvg}`}
                />
            </Head>
            <Navbar />
            <div className="container mx-24 mt-16 bg-[#02040a]">
                <div>
                    <h1>IoT Data</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>UUID</th>
                                <th>Temperature</th>
                                <th>Humidity</th>
                                <th>Timestamp</th>
                                <th>Device</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.uuid}</td>
                                    <td>{row.temperature}</td>
                                    <td>{row.humidity}</td>
                                    <td>{row.timestamp}</td>
                                    <td>{row.device_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
