import React from 'react';
import {Line} from 'react-chartjs-2';
import '../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

const LineChart = ({history}) => {
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

const chartData = {
    labels: data.map((mockdata) => (mockdata.month)), //months
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
          <Line data={chartData} options={options}/>
        </div>
      </div>
    )
}

export default LineChart;
