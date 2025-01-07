import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { renderToString } from 'react-dom/server';
import { CiServer } from 'react-icons/ci';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IoTDataPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedGraph, setSelectedGraph] = useState('temperature'); // 'temperature' or 'humidity'

    useEffect(() => {
        fetch('/api/iot-data')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching IoT data:', error));
    }, []);

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
        )
    );

    const graphData = {
        labels: filteredData.map((row) => row.timestamp),
        datasets: [
            {
                label: selectedGraph === 'temperature' ? 'Temperature (°C)' : 'Humidity (%)',
                data: filteredData.map((row) =>
                    selectedGraph === 'temperature' ? row.temperature : row.humidity
                ),
                borderColor: '#2ad853',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="h-screen bg-[#02040a] text-white">
            <Head>
                <title>Istoria Interface</title>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={`data:image/svg+xml,${encodeURIComponent(
                        renderToString(<CiServer size={64} color="#FFFFFF" />)
                    )}`}
                />
            </Head>
            <Navbar />
            <div className="container mx-auto mt-16 p-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">IoT Data</h1>
                    <input
                        type="text"
                        className="p-2 bg-[#121212] rounded text-white"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex mt-4">
                    <div className="w-3/5 overflow-auto max-h-[400px] border border-gray-600 rounded p-2">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#121212] text-gray-400">
                                <tr>
                                    <th className="py-2 px-4">ID</th>
                                    <th className="py-2 px-4">UUID</th>
                                    <th className="py-2 px-4">Temperature</th>
                                    <th className="py-2 px-4">Humidity</th>
                                    <th className="py-2 px-4">Timestamp</th>
                                    <th className="py-2 px-4">Device</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row) => (
                                    <tr key={row.id} className="border-t border-gray-600">
                                        <td className="py-2 px-4">{row.id}</td>
                                        <td className="py-2 px-4">{row.uuid}</td>
                                        <td className="py-2 px-4">{row.temperature}</td>
                                        <td className="py-2 px-4">{row.humidity}</td>
                                        <td className="py-2 px-4">{row.timestamp}</td>
                                        <td className="py-2 px-4">{row.device_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-2/5 ml-4">
                        <div className="flex justify-end mb-2">
                            <button
                                className={`px-4 py-2 rounded ${
                                    selectedGraph === 'temperature'
                                        ? 'bg-green-500'
                                        : 'bg-[#121212]'
                                }`}
                                onClick={() => setSelectedGraph('temperature')}
                            >
                                Temperature
                            </button>
                            <button
                                className={`px-4 py-2 rounded ml-2 ${
                                    selectedGraph === 'humidity'
                                        ? 'bg-green-500'
                                        : 'bg-[#121212]'
                                }`}
                                onClick={() => setSelectedGraph('humidity')}
                            >
                                Humidity
                            </button>
                        </div>
                        <Line
                            data={graphData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            color: '#444',
                                        },
                                        ticks: {
                                            color: '#FFF',
                                        },
                                    },
                                    y: {
                                        grid: {
                                            color: '#444',
                                        },
                                        ticks: {
                                            color: '#FFF',
                                        },
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#FFF',
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
