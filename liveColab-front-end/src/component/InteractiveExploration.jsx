import React, { useState, useRef } from 'react';
import '../Interaction.css'
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
    // LinearRegressionLine,
    LogarithmicScale,
    TimeScale,
    // LinearAxis,
    // TimeAxis
} from 'chart.js';
import { Line, Bar, Scatter, Pie, Radar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom'; // Import zoom plugin
import 'chartjs-adapter-moment';
import moment from 'moment';

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
    // LinearRegressionLine,
    LogarithmicScale,
    TimeScale,
    // LinearAxis,
    // TimeAxis,
    zoomPlugin
);

const InteractiveExploration = ({ data }) => {
    const [chartType, setChartType] = useState('bar');
    const [selectedDataX, setSelectedDataX] = useState(Object.keys(data[0] || {})[0]); // Default X data
    const [selectedDataY, setSelectedDataY] = useState(Object.keys(data[0] || {})[1]); // Default Y data
    const chartRef = useRef(null);
    const [filterValue, setFilterValue] = useState('');

    const filteredData = data.filter(item =>
        String(item[selectedDataX]).toLowerCase().includes(filterValue.toLowerCase()) ||
        String(item[selectedDataY]).toLowerCase().includes(filterValue.toLowerCase())
    );

    const chartData = {
        labels: chartType === 'pie' ? filteredData.map(item => item[selectedDataX]) : filteredData.map(item => item[selectedDataX]),
        datasets: [
            {
                label: selectedDataY.charAt(0).toUpperCase() + selectedDataY.slice(1),
                data: filteredData.map(item => item[selectedDataY]),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    const handleDataXChange = (event) => {
        setSelectedDataX(event.target.value);
    };

    const handleDataYChange = (event) => {
        setSelectedDataY(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const renderChart = () => {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy',
                }
              },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: ${context.formattedValue}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: isTimeData(data, selectedDataX) ? 'time' : 'category',
                    time: {
                        unit: 'day'
                    },
                    adapters: {
                        date: {
                            locale: 'en-GB'
                        }
                    }
                },
                y: {
                    type: 'linear',
                }
            }
        };

        function isTimeData(data, key) {
            if (!data || data.length === 0) return false;
            const firstValue = data[0][key];
            return moment(firstValue, moment.ISO_8601, true).isValid();
        }

        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} options={chartOptions} ref={chartRef} />;
            case 'line':
                return <Line data={chartData} options={chartOptions} ref={chartRef} />;
            case 'scatter':
                return <Scatter data={chartData} options={chartOptions} ref={chartRef} />;
            case 'pie':
                return <Pie data={chartData} options={chartOptions} ref={chartRef} />;
            case 'radar':
                return <Radar data={chartData} options={chartOptions} ref={chartRef} />;
            default:
                return null;
        }
    };

    const availableKeys = Object.keys(data[0] || {});

    return (
        <div className="visualizations-container">
            <h1>Interactive Exploration</h1>
            <div className="chart-controls">
                <label htmlFor="chartType">Select Chart Type:</label>
                <select id="chartType" value={chartType} onChange={handleChartTypeChange}>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="scatter">Scatter Plot</option>
                    <option value="pie">Pie Chart</option>
                    <option value="radar">Radar Chart</option>
                </select>

                <label htmlFor="dataX">Select X Data:</label>
                <select id="dataX" value={selectedDataX} onChange={handleDataXChange}>
                    {availableKeys.map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>

                <label htmlFor="dataY">Select Y Data:</label>
                <select id="dataY" value={selectedDataY} onChange={handleDataYChange}>
                    {availableKeys.map(key => (
                        <option key={key} value={key}>{key}</option>
                    ))}
                </select>
                <label htmlFor="filter">Filter:</label>
                <input type="text" id="filter" value={filterValue} onChange={handleFilterChange} />
            </div>
            <div className="chart-area">
                {renderChart()}
            </div>
        </div>
    );
};

export default InteractiveExploration;