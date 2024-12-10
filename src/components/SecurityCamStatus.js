import React from "react";
import { PiSecurityCameraBold } from "react-icons/pi";

const SecurityCamStatus = ({ activeCameras, totalCameras }) => {
    return (
        <div className="relative group cursor-default mx-4 my-4 flex items-center text-white px-2 py-1 rounded-md border border-[#b7bdc8] w-fit">
            {/* Camera Status */}
            <div className="text-sm font-extralight mr-2">
                {activeCameras}{" / "}{totalCameras}
            </div>
            {/* Icon */}
            <div
                className="w-5 h-5 flex justify-center items-center"
                aria-label={`Active Security Cameras: ${activeCameras} out of ${totalCameras}`}
            >
                <PiSecurityCameraBold className="w-full h-full text-gray-300 " />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Cameras Online
            </div>
        </div>
    );
};

export default SecurityCamStatus;
