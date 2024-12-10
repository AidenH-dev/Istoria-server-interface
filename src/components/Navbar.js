import Link from 'next/link';
import { LuSquareActivity } from "react-icons/lu";
import { PiFilesDuotone } from "react-icons/pi";
import { PiVinylRecord } from "react-icons/pi";
import { TbHealthRecognition } from "react-icons/tb";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CiServer } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { IoMdAperture } from "react-icons/io";
import { TbHomeShield } from "react-icons/tb";
import { TbBellRinging } from "react-icons/tb";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuFilm } from "react-icons/lu";
import { FaPhotoFilm } from "react-icons/fa6";
import { PiFilmSlate } from "react-icons/pi";
import { IoFilmOutline } from "react-icons/io5";
import { ImFilm } from "react-icons/im";
import { RiMovieAiLine } from "react-icons/ri";
import { SiWebmoney } from "react-icons/si";
import { IoGlobeOutline } from "react-icons/io5";
import { IoHardwareChipOutline } from "react-icons/io5";
import { MdOutlineDriveFileMove } from "react-icons/md";







export default function Navbar() {
    return (
        <nav className="bg-[#02040a] text-white border-b border-[#b7bdc8]">
            <div className="w-full  flex justify-between items-right p-4">
                {/* Logo */}
                <div className="flex items-center space-x-1">
                    {/* Icon with Link */}
                    <a
                        href="http://192.168.50.154:19999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 flex items-center justify-center"
                    >
                        <CiServer className="w-full h-full cursor-pointer" />
                    </a>

                    {/* Link */}
                    <Link href="/">
                        <div className="text-sm font-semibold hover:bg-[#2f3742] hover:rounded-md px-2 py-1">
                            Istoria Interface
                        </div>
                    </Link>
                </div>

                {/* Links */}
                <div className="flex items-center space-x-3 mr-5">
                    {/* New Icon Section */}
                    <div className="flex items-center space-x-3 pr-3 border-r border-[#b7bdc8] h-full" style={{ height: '20px' }}>
                        {/* New Icon */}
                        <Link href="/new-feature">
                            <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                                <div className='flex'>
                                    <HiOutlinePlusSmall className="w-5 h-5 cursor-pointer mr-1" />
                                    <RiArrowDropDownLine className="w-5 h-5 cursor-pointer" />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                    Add
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* File Manager */}
                    <Link href="/file-manager">
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <PiFilesDuotone className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Storage System
                            </div>
                        </div>
                    </Link>

                    {/* Server Dashboard */}
                    <a
                        href="http://192.168.50.154:19999"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <TbActivityHeartbeat className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Monitor Activity
                            </div>
                        </div>
                    </a>

                    {/* Streaming Videos and Audio */}
                    <Link href="/stream">
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <RiMovieAiLine className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Stream Media
                            </div>
                        </div>
                    </Link>

                    {/* Security Camera & Sensor Systems */}
                    <Link href="/archive-viewer">
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <TbHomeShield className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Security Systems
                            </div>
                        </div>
                    </Link>

                    {/* Information Archive */}
                    <Link href="/archive-viewer">
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <IoGlobeOutline className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Information Archive
                            </div>
                        </div>
                    </Link>

                    {/* Media Log Archive */}
                    <Link href="/archive-viewer">
                        <div className="relative group text-sm hover:text-gray-300 hover:bg-[#2f3742] p-1 rounded-md border border-[#b7bdc8]">
                            <PiVinylRecord className="w-5 h-5 cursor-pointer" />
                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Log Archive
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </nav>
    );
}
