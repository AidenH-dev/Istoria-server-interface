import { useEffect, useState } from 'react';

export default function IoTDataPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/iot-data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching IoT data:', error));
  }, []);

  return (
    <div>
      <h1>IoT Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UUID</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Timestamp</th>
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.uuid}</td>
              <td>{row.temperature}</td>
              <td>{row.humidity}</td>
              <td>{row.timestamp}</td>
              <td>{row.device}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
