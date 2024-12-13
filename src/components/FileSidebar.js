// components/Sidebar.js
import { BiNetworkChart } from "react-icons/bi";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { RiArrowDropUpLine, RiArrowDropDownLine, RiArrowDownLine, RiArrowRightLine } from "react-icons/ri";
import { TbDots } from "react-icons/tb";
import { AiOutlineSearch, AiOutlineFolder, AiOutlineFile } from "react-icons/ai";
import { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { LuHardDriveDownload } from "react-icons/lu";
import { MdOutlineSdStorage } from "react-icons/md";
import { LuPanelTopOpen } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";



export default function Sidebar({ selectedTab, setSelectedTab, connectionStatus }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [focusedDrive, setFocusedDrive] = useState(null);

    const [folders, setFolders] = useState({
        "Storage 1": { open: false, files: ["File1.txt", "File2.jpg"] },
        "Storage 2": { open: false, files: ["Doc1.pdf", "Image1.png"] },
        "Storage 3": { open: false, files: [] },
    });

    const toggleFolder = (folderName) => {
        setFolders((prevFolders) => ({
            ...prevFolders,
            [folderName]: { ...prevFolders[folderName], open: !prevFolders[folderName].open },
        }));
    };

    const ConnectionStatus = () => {
        if (connectionStatus === "connected") {
            return (
                <div className="flex items-center text-[#2ad853] text-xs rounded-full">
                    <RiArrowDropUpLine className="w-6 h-6" />
                </div>
            );
        } else if (connectionStatus === "disconnected") {
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

    const [isOpen, setIsOpen] = useState(false);

    const nasDrives = [
        "V1",
        "V2",
        "V4",
        "V5",
        "V7"
    ];

    const setFocus = (folderName) => {
        setFolders((prev) =>
            Object.keys(prev).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: { ...prev[key], focused: key === folderName },
                }),
                {}
            )
        );
    };

    const clearFocus = (folderName) => {
        setFolders((prev) => ({
            ...prev,
            [folderName]: { ...prev[folderName], focused: false },
        }));
    };


    return (
        <div className="h-full bg-[#02040a] text-white flex flex-col w-[22%] border-r border-[#b7bdc8]">
            {/* Header */}
            <div className="mt-5 p-4">
                <div className="">
                    <div
                        className="flex items-center "

                    >
                        <div
                            className="flex items-center cursor-pointer justify-center h-9 w-9 rounded-md bg-[#29313c] mr-2 "
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <LuPanelTopOpen className="h-6 w-6 text-white" />
                            ) : (
                                <MdOutlineSdStorage className="h-6 w-6 text-white" />
                            )}
                        </div>
                        <h1 className="text-lg font-bold text-white">File System</h1>
                    </div>
                    {isOpen && (
                        <div className="mt-4 grid grid-cols-5 gap-2">
                            {nasDrives.map((drive, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center justify-center text-xs font-medium rounded-md px-2 py-2 cursor-pointer ${focusedDrive === drive
                                            ? "font-semibold transition-all brightness-110 duration-500 text-transparent bg-[#394452] bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ring-1 ring-white "
                                            : "text-white bg-[#394452]"
                                        }`}
                                    onClick={() => setFocusedDrive(drive)}
                                >
                                    {drive}
                                </button>
                            ))}
                        </div>
                    )}
                </div>



                <div className="mt-3 relative">
                    <AiOutlineSearch className="absolute top-2.5 left-3 h-5 w-5 text-[#b7bdc8]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search files..."
                        className="pl-9 w-full bg-[#02040a] active:outline-sky-600 text-sm px-3 py-2 rounded-md text-white border border-[#b7bdc8] focus:outline-sky-600 focus:border-sky-600 focus:ring focus:ring-sky-600"
                    />
                </div>
            </div>

            {/* Folder Structure */}
            <div className="flex flex-col flex-1 overflow-auto">
                {Object.keys(folders).map((folderName) => (
                    <div
                        key={folderName}
                        className={`relative px-4 pb-1 ${folders[folderName].focused ? "pl-4" : ""}`}
                    >
                        {folders[folderName].focused && (
                            <div
                                className="absolute left-2 mt-1 w-1 rounded-md bg-[#74b9ff] pointer-events-none"
                                style={{ height: '30px', top: '0', transform: 'none' }}
                            />
                        )}
                        <button
                            className={`flex items-center justify-between w-full text-left hover:bg-[#29313c] focus:bg-[#29313c] text-sm px-3 py-2 rounded-md ${folders[folderName].focused ? "bg-[#29313c]" : ""}`}
                            onClick={() => toggleFolder(folderName)}
                            onFocus={() => setFocus(folderName)}
                            onBlur={() => clearFocus(folderName)}
                        >
                            <div className="flex items-center pl-3">
                                <div className="absolute left-5">
                                    {folders[folderName].open ? (
                                        <FaAngleDown className="text-[#b7bdc8] w-3 h-3" />
                                    ) : (
                                        <FaAngleRight className="text-[#b7bdc8] w-3 h-3" />
                                    )}
                                </div>
                                <FaFolder className="text-[#b7bdc8] w-4 h-4 mr-2" />
                                {folderName}
                            </div>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${folders[folderName].open ? "max-h-screen" : "max-h-0"}`}
                            style={{ paddingLeft: "1.5rem" }}
                        >
                            {folders[folderName].files.length > 0 ? (
                                folders[folderName].files.map((file) => (
                                    <div
                                        key={file}
                                        className="flex items-center text-sm text-[#b7bdc8] hover:text-white py-1 cursor-pointer"
                                    >
                                        <AiOutlineFile className="w-4 h-4 mr-2" />
                                        {file}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-[#b7bdc8]">No files</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>



            {/* Footer */}
            <div className="p-4 border-t border-[#b7bdc8]">
                <div className="flex items-center justify-between">
                    <span className="text-xs">Connection Status</span>
                    <ConnectionStatus />
                </div>
            </div>
        </div>
    );
}
