// Frontend  Rcollab.js - React Component)
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import 'chart.js/auto';
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
    
    LogarithmicScale,
    TimeScale,
    
    
} from 'chart.js';
import { Line, Bar, Scatter, Pie, Radar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
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
    
    LogarithmicScale,
    TimeScale,
    
    zoomPlugin
);

const socket = io('http://localhost:5000'); // Connect to backend

const Rcollab = ({ data }) => {
    const [chartType, setChartType] = useState('bar');
    const [selectedDataX, setSelectedDataX] = useState(Object.keys(data[0] || {})[0]);
    const [selectedDataY, setSelectedDataY] = useState(Object.keys(data[0] || {})[1]);
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

    useEffect(() => {
        // Listen for updates from other clients
        socket.on('chartUpdated', (updatedChartData) => {
            setChartType(updatedChartData.chartType);
            setSelectedDataX(updatedChartData.selectedDataX)
            setSelectedDataY(updatedChartData.selectedDataY)
        });

        socket.on('interactionUpdated', (updatedInteraction) => {
           // Handle interaction updates if needed
        });

        return () => {
            socket.off('chartUpdated');
            socket.off('interactionUpdated');
        };
    }, []);

    const handleChartTypeChange = (event) => {
        const newChartType = event.target.value;
        setChartType(newChartType);
        emitChartUpdate(newChartType, selectedDataX, selectedDataY);
    };
    const handleDataXChange = (event) => {
        const newSelectedDataX = event.target.value;
        setSelectedDataX(newSelectedDataX);
        emitChartUpdate(chartType, newSelectedDataX, selectedDataY);
    };

    const handleDataYChange = (event) => {
        const newSelectedDataY = event.target.value;
        setSelectedDataY(newSelectedDataY);
        emitChartUpdate(chartType, selectedDataX, newSelectedDataY);
    };


    const emitChartUpdate = (chartType, selectedDataX, selectedDataY) => {
        socket.emit('chartUpdate', { chartType, selectedDataX, selectedDataY });
    };

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    };

    const renderChart = () => {
        const isTimeData = (data, key) => {
            if (!data || data.length === 0) return false;
            const firstValue = data[0][key];
            return moment(firstValue, moment.ISO_8601, true).isValid();
        };
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                zoom: {
                    zoom: {
                        wheel: { enabled: true },
                        pinch: { enabled: true },
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
                    type: isTimeData(filteredData, selectedDataX) ? 'time' : 'category',
                    time: {
                        unit: 'day'
                    },
                    adapters: {
                        date: {
                            locale: 'en-GB'
                        }
                    }
                },
                y: { type: 'linear' }
            }
        };

        switch (chartType) {
            case 'bar': return <Bar data={chartData} options={chartOptions} ref={chartRef} />;
            case 'line': return <Line data={chartData} options={chartOptions} ref={chartRef} />;
            case 'scatter': return <Scatter data={chartData} options={chartOptions} ref={chartRef} />;
            case 'pie': return <Pie data={chartData} options={chartOptions} ref={chartRef} />;
            case 'radar': return <Radar data={chartData} options={chartOptions} ref={chartRef} />;
            default: return null;
        }
    };

    const availableKeys = Object.keys(data[0] || {});

    return (
        <div className="visualizations-container">
            <h1>Real-Time Collaboration</h1>
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
    )
}

export default Rcollab;

