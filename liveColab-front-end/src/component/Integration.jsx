import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../Integration.css'; // Import CSS

const Integration = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [uploading, setUploading] = useState(false); // Add uploading state
    const [saved, setSaved] = useState(false);

    const handleFileUpload = async (event) => {
        setUploading(true);
        setError(null);
        setData(null);
        const file = event.target.files[0];
        if (!file) {
            setUploading(false);
            return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const fileType = file.name.split('.').pop().toLowerCase();
                let parsedData;

                if (fileType === 'json') {
                    parsedData = JSON.parse(e.target.result);
                } else if (fileType === 'xlsx' || fileType === 'xls') {
                    const workbook = XLSX.read(e.target.result, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    parsedData = XLSX.utils.sheet_to_json(worksheet);
                } else {
                    throw new Error('Unsupported file type. Please upload JSON or Excel files.');
                }
                setData(parsedData);

            } catch (err) {
                setError(err.message);
            } finally {
                setUploading(false);
            }
        };

        if (file.type === 'application/json') {
            reader.readAsText(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
            reader.readAsBinaryString(file);
        } else {
            setError('Invalid file type.');
            setUploading(false);
        }
    };

    const handleSaveData = async () => {
        setUploading(true);
        try {
            const response = await fetch('/api/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save data');
            }
            setSaved(true);
            setTimeout(() => setSaved(false), 3000); // Reset saved state after 3 seconds
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="data-integration-container">
            <h1>Data Integration</h1>

            <div className="upload-section">
                <p className="instructions">Upload your data in JSON or Excel format (.xlsx, .xls).</p>
                <input type="file" accept=".json, .xlsx, .xls" onChange={handleFileUpload} className="file-upload" disabled={uploading} />
                {uploading && <div className="loading-spinner">Loading...</div>} {/* Loading spinner */}
                {error && <div className="error">{error}</div>}
            </div>

            {data && (
                <div className="data-display">
                    <h2>Uploaded Data:</h2>
                    <div className="data-content">
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(data[0] || {}).map(key => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, index) => (
                                            <td key={index}>{JSON.stringify(value)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={handleSaveData} className="save-button" disabled={uploading}>
                        {uploading ? "Saving..." : "Save Data"}
                    </button>
                    {saved && <div className="success-message">Data Saved!</div>}
                </div>
            )}
        </div>
    );
};

export default Integration;