import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
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
import { AiOutlineSearch } from 'react-icons/ai';
import { FaPencilAlt, FaPaintBrush, FaCamera, FaSculpture, FaPenNib, FaMusic } from 'react-icons/fa6';
import { FcMusic } from "react-icons/fc";
import { FcOldTimeCamera } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { FcEditImage } from "react-icons/fc";
import { TiBrush } from "react-icons/ti";
import { FaMicrochip } from "react-icons/fa6";
import { FcComboChart } from "react-icons/fc";
import { FcSpeaker } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { FcCommandLine } from "react-icons/fc";
import { FcCellPhone } from "react-icons/fc";
import { FcMultipleCameras } from "react-icons/fc";
import { FcElectronics } from "react-icons/fc";
import { SiBlender } from "react-icons/si";
import { BsRouterFill } from "react-icons/bs";
import { FcStart } from "react-icons/fc";



export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    const items2 = [
        { name: 'Drawing', icon: <FcEditImage />, href: '/learning-hub/drawing' },
        { name: 'Music', icon: <FcMusic />, href: '/learning-hub/music' },
        { name: 'Writing', icon: <FcList />, href: '/learning-hub/writing' },
        { name: 'Media Analysis', icon: <FcStart />, href: '/learning-hub/media-analysis' },
        { name: 'AI', icon: <FaMicrochip className="text-yellow-600" />, href: '/learning-hub/ai' },
        { name: 'Painting', icon: <TiBrush className="text-sky-500" />, href: '/learning-hub/painting' },
        { name: 'Blender', icon: <SiBlender className="text-[#eb7700]" />, href: '/learning-hub/blender' },
        { name: 'Sound Design', icon: <FcSpeaker />, href: '/learning-hub/sound-design' },
        { name: 'Editing', icon: <FcFilm />, href: '/learning-hub/editing' },
        { name: 'Hacking', icon: <FcCommandLine className="shadow-lg" />, href: '/learning-hub/hacking' },
        { name: 'Photography', icon: <FcOldTimeCamera />, href: '/learning-hub/photography' },
        { name: 'Electronics', icon: <FcElectronics />, href: '/learning-hub/electronics' },
        { name: 'Statistics', icon: <FcComboChart />, href: '/learning-hub/statistics' },
    ];



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
            <div className="container mx-24 mt-16">
                <h1 className="text-3xl font-bold text-white">Learning Hub</h1>
                <div className="mt-2 text-white">
                    <div className="mt-3 relative w-1/2">
                        <AiOutlineSearch className="absolute top-2.5 left-3 h-5 w-5 text-[#b7bdc8]" />
                        {/*value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}*/}
                        <input
                            type="text"

                            placeholder="Search topics..."
                            className="pl-9 w-full bg-[#02040a] active:outline-sky-600 text-sm px-3 py-2 rounded-md text-white border border-[#b7bdc8] focus:outline-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-600"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 mt-10 mx-auto">
                        {items2.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="flex flex-row justify-center items-center text-lg w-fit text-gray-900 bg-gray-300 hover:bg-[#29313c] hover:text-white hover:scale-105 hover:shadow-lg focus:bg-[#29313c] transition-all duration-300 ease-in-out p-6 rounded-full font-semibold"
                            >
                                <div className="text-3xl mr-2">{item.icon}</div>
                                {item.name}
                            </a>
                        ))}
                    </div>


                </div>

            </div>
        </div>
    );
}
