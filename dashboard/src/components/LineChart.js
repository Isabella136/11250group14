import React from 'react'
import {Line} from 'react-chartjs-2'
import '../App.css'

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: 'Total Carbon Footprint',
            data: [1200, 1000, 1900, 300, 500, 200, 100],
            fill: false,
            borderColor: 'rgb(0, 200, 100)',
            backgroundColor: 'rgb(0, 200, 100)'
        },
        {
            label: 'Electricity Consumption (kWH)',
            data: [600, 500, 900, 100, 100, 100, 50],
            fill: false,
            borderColor: 'rgb(255, 215, 0)',
            backgroundColor: 'rgb(255, 215, 0)',
        }
    ]
}

const options = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Carbon Footprint (kg CO2)"
            }
        },
        x: {
            title: {
                display: true,
                text: "Date"
            }
        }
    }
}

const LineChart = () => {
    return (
        <div className="graphContainer">
            <p> Carbon Footprint Data Over Time</p>
            <div className="graph">
                <Line data={data} options={options}/>
            </div>
        </div>
    )
}

export default LineChart
