import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { CiServer } from 'react-icons/ci';
import { renderToString } from 'react-dom/server';



export default function StreamingPage() {
  const [selectedTab, setSelectedTab] = useState('shows'); // Default tab is 'shows'
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

  return (
    <div className="h-max bg-[#02040a] pb-20">
      <Head>
        <title>Streaming</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`data:image/svg+xml,${faviconSvg}`}
        />
      </Head>
      <Navbar />
      <div className="container mx-24 mt-16">
        <h1 className="text-3xl font-bold text-white">Streaming Hub</h1>
        <nav className="bg-[#02040a] w-fit text-white mt-2">
          <div className="w-full flex justify-between items-center p-4">
            <div className="flex items-center space-x-5 cursor-pointer">
              {/* Shows Tab */}
              <button
                className={`flex text-sm relative focus:outline-none group ${selectedTab === 'shows' ? 'text-white' : ''
                  }`}
                onClick={() => setSelectedTab('shows')}
              >
                <span className="px-2 py-1">Shows</span>
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[1px] ${selectedTab === 'shows' ? 'bg-blue-500' : 'bg-transparent'
                    } transition-all duration-200`}
                ></span>
              </button>

              {/* Music Tab */}
              <button
                className={`flex text-sm relative focus:outline-none group ${selectedTab === 'music' ? 'text-white' : ''
                  }`}
                onClick={() => setSelectedTab('music')}
              >
                <span className="px-2 py-1">Audio</span>
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[1px] ${selectedTab === 'music' ? 'bg-blue-500' : 'bg-transparent'
                    } transition-all duration-200`}
                ></span>
              </button>

              {/* Manga Tab */}
              <button
                className={`flex text-sm relative focus:outline-none group ${selectedTab === 'manga' ? 'text-white' : ''
                  }`}
                onClick={() => setSelectedTab('manga')}
              >
                <span className="px-2 py-1">Manga</span>
                <span
                  className={`absolute bottom-[-4px] left-0 w-full h-[1px] ${selectedTab === 'manga' ? 'bg-blue-500' : 'bg-transparent'
                    } transition-all duration-200`}
                ></span>
              </button>
            </div>
          </div>
        </nav>

        {/* Conditional Rendering for Tabs */}
        {selectedTab === 'shows' && (
          <div className="mt-2 text-white 2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-2">
                <img
                  src="/LookBack.jpg"
                  alt="Show 1"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-[50%_40%]"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Look Back
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2024 ‧ Film ‧ 57 mins"}
                  </span>
                </h3>

                <p className="text-sm text-gray-400">Fujino and Kyomoto couldn't be more different...</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/Frieren.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Frieren
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2024 ‧ TV Show ‧ 2 Seasons"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">Elf mage Frieren and her fellow adventurers...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/Jujutsu.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Jujutsu Kaisen
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2020 ‧ Show ‧ 2 Seasons"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">A boy swallows a cursed talisman - the finger of a demon...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/fullmetal.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Fullmetal Alchemist
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2009 ‧ Show ‧ 64 Episodes"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">Two brothers search for a Philosopher's Stone...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/yourname.png"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-top"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Your Name
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2016 ‧ Film ‧ 1h 50m"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">Two teenagers share a profound, magical connection...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/cowboybebop.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-top"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Cowboy Bebop
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"1998 ‧ Show ‧ 26 Episodes"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">A ragtag duo of spacefaring bounty-hunters...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/TnK.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-top"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Weathering With You
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2019 ‧ Film ‧ 1h 54m"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">A ragtag duo of spacefaring bounty-hunters...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/silentvoice.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-top"
                />
                <h3 className="text-lg font-bold flex items-center">
                  A Silent Voice
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2016 ‧ Film ‧ 2h 9m"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">A ragtag duo of spacefaring bounty-hunters...</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 hover:outline hover:outline-2 hover:outline-white hover:outline-offset-">
                <img
                  src="/edgerunners.jpg"
                  alt="Show 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover object-bottom"
                />
                <h3 className="text-lg font-bold flex items-center">
                  Edgerunners
                  <span className="px-1 py-0.25 rounded-md border border-gray-400 text-gray-400 inline-block text-sm ml-2">
                    {"2022 ‧ Show ‧ 1 Season"}
                  </span>
                </h3>
                <p className="text-sm text-gray-400">A Street Kid trying to survive in a city of the future...</p>
              </div>

            </div>
          </div>
        )}

        {selectedTab === 'music' && (
          <div className="mt-2 text-white">
            <h2 className="text-xl font-bold mb-4">Top Music</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <img
                  src="/music1.jpg"
                  alt="Music 1"
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold">Song Title 1</h3>
                <p className="text-sm text-gray-400">Artist Name</p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4">
                <img
                  src="/music2.jpg"
                  alt="Music 2"
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-lg font-bold">Song Title 2</h3>
                <p className="text-sm text-gray-400">Artist Name</p>
              </div>
              {/* Add more music as needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
