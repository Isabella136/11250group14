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

const elecCosts = data.map((mockdata) => mockdata.elecCost);
const waterCosts = data.map((mockdata) => mockdata.waterCost);

// Adding to create total costs
const totalCosts = [];
for (let i = 0; i < elecCosts.length; i++) {
  totalCosts[i] = elecCosts[i] + waterCosts[i];
}

// Adding to create costs over time
const elecCostsOverTime = elecCosts.map((s => a => s += a)(0));
const waterCostsOverTime = waterCosts.map((s => a => s += a)(0));
const totalCostsOverTime = totalCosts.map((s => a => s += a)(0));

const chartDataOverTime = {
    labels: data.map((mockdata) => (mockdata.createdAt).substring(0, 10)), //timestamps, find a function to get in different format
    datasets: [
        {
            label: "Total Costs", //record type
            data: totalCostsOverTime,
            fill: false,
            borderColor: 'rgb(0, 200, 100)',
            backgroundColor: 'rgb(0, 200, 100)'
        },
        {
            label: 'Electricity Costs',
            data: elecCostsOverTime,
            fill: false,
            borderColor: 'rgb(255, 215, 0)',
            backgroundColor: 'rgb(255, 215, 0)',
        },
        {
            label: "Water Costs",
            data: waterCostsOverTime,
            fill: false,
            borderColor: 'rgb(0, 100, 200)',
            backgroundColor: 'rgb(0, 100, 200)',
        }
    ]
}

const optionsOverTime = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Cost ($ US)"
            }
        },
        x: {
            title: {
                display: true,
                text: "Date"
            }
        }
    },
    transitions: {
        show: {
          animations: {
            x: {
              from: 0
            },
            y: {
              from: 0
            }
          }
        },
        hide: {
          animations: {
            x: {
              to: 0
            },
            y: {
              to: 0
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Total Costs over Time",
        }
      }
}

const chartDataPerEntry = {
    labels: data.map((mockdata) => (mockdata.createdAt).substring(0, 10)), //timestamps, find a function to get in different format
    datasets: [
        {
            label: "Total Costs", //record type
            data: totalCosts,
            fill: false,
            borderColor: 'rgb(0, 200, 100)',
            backgroundColor: 'rgb(0, 200, 100)'
        },
        {
            label: 'Electricity Costs',
            data: elecCosts,
            fill: false,
            borderColor: 'rgb(255, 215, 0)',
            backgroundColor: 'rgb(255, 215, 0)',
        },
        {
            label: "Water Costs",
            data: waterCosts,
            fill: false,
            borderColor: 'rgb(0, 100, 200)',
            backgroundColor: 'rgb(0, 100, 200)',
        }
    ]
}

const optionsPerEntry = {
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: "Cost ($ US)"
            }
        },
        x: {
            title: {
                display: true,
                text: "Date"
            }
        }
    },
    transitions: {
        show: {
          animations: {
            x: {
              from: 0
            },
            y: {
              from: 0
            }
          }
        },
        hide: {
          animations: {
            x: {
              to: 0
            },
            y: {
              to: 0
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Cost Entries",
        }
      }
}

// Costs Per Entry graph
// <Line data={chartDataPerEntry} options={optionsPerEntry}/>

    return (
      <div className="graphContainer">
        <div className="graph">
          <Line data={chartDataOverTime} options={optionsOverTime}/>
        </div>
      </div>
    )
}

export default LineChart;