import React from "react";

const DrawingTreeGraph = () => {
  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="p-4 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          {/* Root Node */}
          <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-md text-center">
            <p className="font-bold">Learn to Draw</p>
          </div>

          {/* Branches */}
          <div className="flex justify-between w-full mt-6">
            {/* Basics Branch */}
            <div className="flex flex-col items-center w-1/4">
              <div className="bg-green-500 text-white px-4 py-2 rounded shadow-md text-center">
                <p className="font-bold">Basics</p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="bg-green-300 px-3 py-1 rounded shadow">Shapes</div>
                <div className="bg-green-300 px-3 py-1 rounded shadow">Lines</div>
                <div className="bg-green-300 px-3 py-1 rounded shadow">Shading</div>
              </div>
            </div>

            {/* Tools Branch */}
            <div className="flex flex-col items-center w-1/4">
              <div className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md text-center">
                <p className="font-bold">Tools</p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="bg-yellow-300 px-3 py-1 rounded shadow">Pencils</div>
                <div className="bg-yellow-300 px-3 py-1 rounded shadow">Erasers</div>
                <div className="bg-yellow-300 px-3 py-1 rounded shadow">Sketchpads</div>
              </div>
            </div>

            {/* Techniques Branch */}
            <div className="flex flex-col items-center w-1/4">
              <div className="bg-red-500 text-white px-4 py-2 rounded shadow-md text-center">
                <p className="font-bold">Techniques</p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="bg-red-300 px-3 py-1 rounded shadow">Perspective</div>
                <div className="bg-red-300 px-3 py-1 rounded shadow">Anatomy</div>
                <div className="bg-red-300 px-3 py-1 rounded shadow">Textures</div>
              </div>
            </div>

            {/* Practice Branch */}
            <div className="flex flex-col items-center w-1/4">
              <div className="bg-purple-500 text-white px-4 py-2 rounded shadow-md text-center">
                <p className="font-bold">Practice</p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="bg-purple-300 px-3 py-1 rounded shadow">Daily Sketches</div>
                <div className="bg-purple-300 px-3 py-1 rounded shadow">Art Challenges</div>
                <div className="bg-purple-300 px-3 py-1 rounded shadow">Feedback</div>
              </div>
            </div>
          </div>

          {/* Connecting Lines */}
          <div className="relative w-full mt-6">
            <div className="absolute top-0 left-1/4 w-1 h-16 bg-gray-400"></div>
            <div className="absolute top-0 left-1/2 w-1 h-16 bg-gray-400"></div>
            <div className="absolute top-0 left-3/4 w-1 h-16 bg-gray-400"></div>
            <div className="absolute top-0 left-full w-1 h-16 bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingTreeGraph;
