import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Drawing/DrawingSidebar';
import {
  ReactFlow,
  addEdge,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

export default function Home() {
  const GroupNode = ({ data, style }) => {
    return (
      <div style={{ ...style, position: 'relative' }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '4px', 
        fontWeight: 'bold', 
        color: '#FFFFFF' // White text color 
      }}>
        {data.label}
      </div>
    </div>
    );
  };
  

  const initialNodes = [
    {
      id: 'root',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 0, y: 0 },
      sourcePosition: 'right',
    },
    {
      id: '1',
      data: { label: 'Fundamental Drawing Skills' },
      position: { x: 200, y: 100 },
      sourcePosition: 'right',
      targetPosition: 'left',
    },
    {
      id: '2',
      data: { label: 'Observational Skills' },
      position: { x: 400, y: 200 },
      sourcePosition: 'right',
      targetPosition: 'left',
    },
    {
      id: '3',
      data: { label: 'Color and Composition Skills' },
      position: { x: 600, y: 300 },
      sourcePosition: 'right',
      targetPosition: 'left',
    },
    {
      id: '4',
      data: { label: 'Anatomy and Specialized Knowledge' },
      position: { x: 800, y: 400 },
      sourcePosition: 'right',
      targetPosition: 'left',
    },
    {
      id: '5',
      data: { label: 'Stylistic and Advanced Techniques' },
      position: { x: 1000, y: 500 },
      targetPosition: 'left',
    },
    {
      id: '6-1',
      type: 'group',
      data: { label: 'Fundementals of Drawing' },
      position: { x: 15, y: 120 },
      style: {
        width: 400,
        height: 400,
        backgroundColor: 'rgba(128, 0, 128, 0.2)', // Purple with 20% opacity
        border: '2px solid rgba(128, 0, 128, 0.5)', // Semi-transparent purple border
        borderRadius: '8px',
      },
    },
    {
      id: '6-2',
      data: {},
      type: 'tools',
      position: { x: 50, y: 50 },
      style: {
        width: 80,
        height: 80,
      },
      parentId: '6-1',
      extent: 'parent',
    },
    {
      id: '6-3',
      type: 'resizer',
      data: {
        label: 'Resize Me',
      },
      position: { x: 250, y: 50 },
      style: {
        width: 80,
        height: 80,
      },
      parentId: '6-1',
      extent: 'parent',
    },
  ];

  const initialEdges = [
    { 
      id: 'e-root-1', 
      source: 'root', 
      target: '1', 
      type: 'smoothstep',
      markerEnd: { type: 'arrowclosed' } // Add this line for a closed arrow at the end
    },
    { 
      id: 'e-1-2', 
      source: '1', 
      target: '2', 
      type: 'smoothstep',
      markerEnd: { type: 'arrowclosed' } 
    },
    { 
      id: 'e-2-3', 
      source: '2', 
      target: '3', 
      type: 'smoothstep',
      markerEnd: { type: 'arrowclosed' } 
    },
    { 
      id: 'e-3-4', 
      source: '3', 
      target: '4', 
      type: 'smoothstep',
      markerEnd: { type: 'arrowclosed' } 
    },
    { 
      id: 'e-4-5', 
      source: '4', 
      target: '5', 
      type: 'smoothstep',
      markerEnd: { type: 'arrowclosed' } 
    },
  ];
  

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const nodeTypes = { group: GroupNode }; // Register the custom node

  return (
    <div className="h-screen bg-[#02040a] flex flex-col">
      <Head>
        <title>Istoria Interface</title>
      </Head>
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex flex-grow">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="flex-grow p-10 bg-[#02040a] text-white">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              style={{ height: '100%', backgroundColor: '#02040a' }}
              nodeTypes={nodeTypes} // Use the custom node types
            >
              <Background color="#E6E6E6" />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
