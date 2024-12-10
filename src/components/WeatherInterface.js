import React from "react";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";
import { TbSnowflake } from "react-icons/tb";
import { MdLinkedCamera } from "react-icons/md";


const WeatherInterface = ({ weather, temperature, region }) => {
    return (
        <div className="cursor-default m-4 flex items-center text-white px-1 pr-1 py-0.5 rounded-sm border border-gray-400 w-fit">
            <div className="text-2xl">
                {weather === "sunny" && <WiDaySunny className="text-yellow-300 mr-1" />}
                {weather === "cloudy" && <WiCloudy />}
                {weather === "rainy" && <WiRain className="text-blue-400 mr-1" />}
                {weather === "snow" && <TbSnowflake className="h-4 text-cyan-300" />}
            </div>
            <div className="text-sm font-medium pr-1">
                {region && <span>{region} · </span>}
                {temperature}°C · {weather.charAt(0).toUpperCase() + weather.slice(1)}
            </div>
            <div className="h-5 border-l border-white mx-1"></div>
            <div className="relative group cursor-pointer w-5 h-5 ">
                <MdLinkedCamera className="w-full h-full hover:text-cyan-400" />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    View Video Status
                </div>
            </div>

        </div>

    );
};

export default WeatherInterface;
