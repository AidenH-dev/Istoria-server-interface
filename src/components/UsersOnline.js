import React, { useEffect, useState } from "react";
import { TbUser } from "react-icons/tb";

const UsersOnline = () => {
    const [usersOnline, setUsersOnline] = useState(0);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.50.154:8080"); // Update the URL if needed

        socket.onopen = () => {
            console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "USERS_COUNT_UPDATE") {
                console.log("Users online:", data.usersOnline);
                setUsersOnline(data.usersOnline);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="relative group cursor-default my-4 flex items-center text-white px-1 pr-1 py-0.5 rounded-lg border border-[#b7bdc8] w-fit">
            <div className="text-2xl">
                <TbUser className="h-4 text-green-300" />
            </div>
            <div className="text-sm font-medium mr-1">
                {usersOnline}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white text-sm text-black px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Users Active
            </div>
        </div>
    );
};

export default UsersOnline;
