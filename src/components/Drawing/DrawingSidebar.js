import { useState, useEffect } from 'react';
import { RiHome2Line, RiSettings3Line, RiLogoutBoxRLine } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import { PiTreeStructure } from "react-icons/pi";
import { CgWebsite } from "react-icons/cg";
import { TbLogs } from "react-icons/tb";


export default function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="h-full w-64 bg-[#02040a] shadow-lg text-white border-r border-[#b7bdc8]">
      <div className="flex items-center justify-between px-4 py-6 border-b border-[#b7bdc8]">
        <h1 className="text-2xl font-bold">Guide</h1>
      </div>

      <ul className="mt-4 mx-4 space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-md font-medium bg-[#394452] hover:bg-[#4b5563] rounded-lg transition"
          >
            <PiTreeStructure className="mr-4" size={24} />
            Map
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-md font-medium bg-[#394452] hover:bg-[#4b5563] rounded-lg transition"
          >
            <CgWebsite className="mr-4" size={24} />
            Resources
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-md font-medium bg-[#394452] hover:bg-[#4b5563] rounded-lg transition"
          >
            <TbLogs className="mr-4" size={24} />
            Log
          </a>
        </li>
      </ul>
    </div>
  );
}
