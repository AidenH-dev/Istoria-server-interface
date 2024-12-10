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


export default function Home() {
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
      <div className="container mx-24 mt-16">
        <h1 className="text-3xl font-bold text-white">Istoria System Interface</h1>
        <nav className="bg-[#02040a] w-fit text-white border-b border-[#b7bdc8] mt-4">
          <div className="w-full flex justify-between items-center p-4">
            <div className="flex items-center space-x-5 cursor-pointer">
              {/* Hub Button */}
              <button
                className={`flex text-sm relative focus:outline-none group ${selectedTab === 'hub' ? 'text-white' : ''
                  }`}
                onClick={() => setSelectedTab('hub')}
              >
                <BiNetworkChart className="w-6 h-7" />
                <div className="text-sm font-semibold px-2 py-1">Hub</div>
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[1px] ${selectedTab === 'hub' ? 'bg-blue-500' : 'bg-transparent'
                    } transition-all duration-200`}
                ></span>
              </button>

              {/* Command Line Button */}
              <button
                className={`flex text-sm relative focus:outline-none group ${selectedTab === 'commandLine' ? 'text-white' : ''
                  }`}
                onClick={() => setSelectedTab('commandLine')}
              >
                <HiOutlineCommandLine className="w-7 h-7" />
                <div className="flex items-center text-sm font-semibold px-2 py-1">
                  <span>Command Line</span>
                  <ConnectionStatus />
                </div>
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[1px] ${selectedTab === 'commandLine' ? 'bg-blue-500' : 'bg-transparent'
                    } transition-all duration-200`}
                ></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Conditional Rendering */}
        {selectedTab === 'hub' && (
          <div className="mt-2 text-white">
            <div className='flex'>
              <WeatherInterface weather="sunny" temperature={-5} region="Kalamazoo" />
              <UsersOnline usersOnline={5} />
              <SecurityCamStatus activeCameras={5} totalCameras={6} />
              <SystemStorage totalStorage={500} usedStorage={200} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature Movie of the Month */}
              <div className="rounded-lg border border-[#b7bdc8] p-4 ">
                <h3 className="text-lg font-bold mb-2">Featured Media</h3>
                <div className=" w-full rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-top">
                  {/* Hover Effect as Outer Layer */}
                  <div className="flex group cursor-pointer relative">
                    <div className="absolute inset-0 rounded-lg border border-gray-700 group-hover:border-white group-hover:border-2 transition-all duration-500 pointer-events-none"></div>

                    {/* Image Section */}
                    <div className="relative z-10 flex-shrink-0 max-w-[50%]">
                      <img
                        src="/LookBack.jpg"
                        alt="Feature Movie"
                        className="border border-2 border-transparent w-full h-auto max-h-[400px] object-contain rounded-l-lg"
                      />
                    </div>

                    {/* Text Content */}
                    <div className="ml-4 mt-5 flex-1 relative z-10">
                      <div className="text-sm text-left">
                        <strong className="text-xl">Look Back</strong> <br />
                        <span className="px-1 py-0.25 rounded-md border border-gray-400 w-fit text-gray-400 mb-2 inline-block">
                          {"2024 ‧ Animation ‧ 57 mins"}
                        </span>
                        <br />
                        {/*<strong>Description:</strong>*/}
                        <div className='mr-6'>Fujino and Kyomoto couldn't be more different, yet their shared passion for drawing manga unites these two small-town girls.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent History of Updates */}
              <div className="rounded-lg border border-[#b7bdc8] p-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                  Latest Server Info
                </span>
                <div className="my-2"></div>
                <ul className="ml-3 space-y-2 text-sm list-disc list-inside">
                  <li>Update 1: Added new feature for seamless integration with external APIs.</li>
                  <li>Update 2: Improved UI responsiveness for better mobile compatibility.</li>
                  <li>Update 3: Fixed critical security vulnerabilities in the backend.</li>
                  <li>Update 4: Enhanced real-time connection stability under heavy load.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'commandLine' && (
          <div className="mt-4 bg-gray-900 text-white p-4 border border-[#b7bdc8] rounded-md">
            <div className="text-sm font-mono">
              <div>Command Line Interface:</div>
              <div className="mt-2 border border-gray-700 rounded p-2 bg-black">
                <textarea
                  className="w-full h-32 bg-black text-white font-mono p-2 outline-none resize-none"
                  placeholder="Type your commands here..."
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
