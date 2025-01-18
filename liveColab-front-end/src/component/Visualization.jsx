import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    
} from 'chart.js';
import { Line, Bar, Scatter, Pie, Radar } from 'react-chartjs-2';
import data from '../data.json'; // Import the JSON data
import '../Visualization.css'; // Import CSS for styling

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    
);

const Visualization = () => {
    const [chartType, setChartType] = useState('bar');
    const [selectedData, setSelectedData] = useState('sales'); // Default data to display
    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                label: selectedData.charAt(0).toUpperCase() + selectedData.slice(1), // Capitalize label
                data: data.map(item => item[selectedData]), // Use selected data
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };
    const handleDataChange = (event) => {
        setSelectedData(event.target.value);
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} />;
            case 'line':
                return <Line data={chartData} />;
            case 'scatter':
                return <Scatter data={chartData} />;
            case 'pie':
                return <Pie data={chartData} />;
            case 'radar':
                return <Radar data={chartData} />;
            default:
                return null;
        }
    };

    return (
        <div className="visualizations-container">
            <h1>Data Visualization</h1>
            <div className="chart-controls">
                <label htmlFor="chartType">Select Chart Type:</label>
                <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="scatter">Scatter Plot</option>
                    <option value="pie">Pie Chart</option>
                    <option value="radar">Radar Chart</option>
                </select>

                <label htmlFor="dataType">Select Data:</label>
                <select id="dataType" value={selectedData} onChange={handleDataChange}>
                    <option value="sales">Sales</option>
                    <option value="profit">Profit</option>
                    <option value="customers">Customers</option>
                </select>
            </div>
            <div className="chart-area">
                {renderChart()}
            </div>
        </div>
    );
};

export default Visualization;