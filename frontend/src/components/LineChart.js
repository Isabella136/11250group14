import React from 'react';
import {Line} from 'react-chartjs-2';
import '../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

const LineChart = ({}) => {
  const [data, setData] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //user authorization
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api/data", config);
    setData(data);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [])

const elecConsumptions = data.map((mockdata) => mockdata.elecConsumption);
const elecCosts = data.map((mockdata) => mockdata.elecCost);
const waterConsumptions = data.map((mockdata) => mockdata.waterConsumption);
const waterCosts = data.map((mockdata) => mockdata.waterCost);
const gasConsumptions = data.map((mockdata) => mockdata.gasConsumption);

const chartData = {
    labels: data.map((mockdata) => (mockdata.createdAt)), //timestamps, find a function to get in different format
    datasets: [
        {
            label: "Total Carbon Footprint", //record type
            data: data.map((mockdata) => (mockdata.value)),
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

    return (
      <div className="graphContainer">
        <p> Carbon Footprint Data Over Time</p>
        <div className="graph">
          <div className="dataValues">
            Electric Consumptions: {elecConsumptions.map(elecConsumption => <p>{elecConsumption}</p>)}
            Electric Costs: {elecCosts.map(elecCost => <p>{elecCost}</p>)}
            Water Consumptions: {waterConsumptions.map(waterConsumption => <p>{waterConsumption}</p>)}
            Water Costs: {waterCosts.map(waterCost => <p>{waterCost}</p>)}
            Gas Consumptions: {gasConsumptions.map(gasConsumption => <p>{gasConsumption}</p>)}
          </div>
          <Line data={chartData} options={options}/>
        </div>
      </div>
    )
}

export default LineChart;
