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
import dayjs from 'dayjs';

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IoTDataPage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedGraph, setSelectedGraph] = useState('temperature'); // 'temperature' or 'humidity'
    const [timeRange, setTimeRange] = useState('24h'); // Default range is 24 hours

    useEffect(() => {
        fetch('/api/iot-data')
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching IoT data:', error));
    }, []);

    const now = dayjs();

    let filteredData = data;

    if (timeRange === '30m') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(now.subtract(30, 'minute'))
        );
    } else if (timeRange === '1h') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(now.subtract(1, 'hour'))
        );
    } else if (timeRange === '4h') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(now.subtract(4, 'hour'))
        );
    } else if (timeRange === '10h') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(now.subtract(10, 'hour'))
        );
    } else if (timeRange === '24h') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(now.subtract(24, 'hour'))
        );
    } else if (timeRange === 'ytd') {
        filteredData = data.filter((row) =>
            dayjs(row.timestamp).isAfter(dayjs().startOf('year'))
        );
    }

    const graphData = {
        labels: filteredData.map((row) => dayjs(row.timestamp).format('hh:mm A')),
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
                {/* Summary Section */}
                <div className="cursor-default mb-4 flex items-center text-white px-4 py-2 rounded-sm border border-gray-400 w-fit">
                    <div className="flex-1 text-sm font-medium">
                        <div>
                            <span className="font-bold">Current Temperature:</span>{' '}
                            {data.length > 0
                                ? `${data[data.length - 1].temperature}°C · ${
                                      data[data.length - 1].temperature > 25
                                          ? 'Warm'
                                          : data[data.length - 1].temperature < 10
                                          ? 'Cold'
                                          : 'Moderate'
                                  }`
                                : 'N/A'}
                        </div>
                        <div>
                            <span className="font-bold">Current Humidity:</span>{' '}
                            {data.length > 0
                                ? `${data[data.length - 1].humidity}% · ${
                                      data[data.length - 1].humidity > 60
                                          ? 'High'
                                          : data[data.length - 1].humidity < 30
                                          ? 'Low'
                                          : 'Normal'
                                  }`
                                : 'N/A'}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="h-10 border-l border-white mx-2"></div>
                        <div className="text-sm font-medium">
                            <span className="font-bold">Last Updated:</span>{' '}
                            {data.length > 0
                                ? dayjs(data[data.length - 1].timestamp).format('hh:mm A')
                                : 'N/A'}
                        </div>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="flex justify-center space-x-4 mb-4">
                    {['30m', '1h', '4h', '10h', '24h', 'ytd'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded ${
                                timeRange === range ? 'bg-green-500' : 'bg-[#121212]'
                            }`}
                        >
                            {range.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="flex mt-4">
                    {/* Graph Section */}
                    <div className="w-full">
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
                        {/* Graph */}
                        <div className="h-[400px] w-full">
                            <Line
                                data={graphData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
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
        </div>
    );
}
