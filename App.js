import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function App() {
  const [file, setFile] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch responses from the Flask API on component mount
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('my_audio_file', file);

      // Assuming Flask server is running on localhost:8086
      const response = await axios.post('http://localhost:8086/api/file_tempo', formData);

      // Update responses state with the new response
      setResponses([...responses, response.data]);

      // Fetch updated responses after upload (optional, depending on your requirements)
      // fetchData();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(responses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    XLSX.writeFile(wb, 'responses.xlsx');
  };

  const fetchData = async () => {
    try {
      // Fetch responses from the Flask API
      const response = await axios.get('http://localhost:8086/api/file_tempo');
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>File Tempo App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      <button onClick={exportToExcel}>Export to Excel</button>
      <hr />
      <h2>Responses</h2>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.filename}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
