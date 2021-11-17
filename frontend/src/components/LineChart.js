import React from 'react';
import {Line} from 'react-chartjs-2';
import '../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

const LineChart = () => {
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

// Adding to create total consumption
const totalConsumptions = [];
for (let i = 0; i < elecConsumptions.length; i++) {
  totalConsumptions[i] = elecConsumptions[i] + waterConsumptions[i] + gasConsumptions[i];
}

// Adding to create consumptions over time
const elecConsumptionsOverTime = elecConsumptions.map((s => a => s += a)(0));
const waterConsumptionsOverTime = waterConsumptions.map((s => a => s += a)(0));
const gasConsumptionsOverTime = gasConsumptions.map((s => a => s += a)(0));
const totalConsumptionsOverTime = totalConsumptions.map((s => a => s += a)(0));



const chartDataOverTime = {
  labels: data.map((mockdata) => (mockdata.createdAt).substring(0, 10)), 
  datasets: [
      {
          label: "Total Carbon Footprint", //record type
          data: totalConsumptionsOverTime,
          fill: false,
          borderColor: 'rgb(0, 200, 100)',
          backgroundColor: 'rgb(0, 200, 100)'
      },
      {
          label: 'Electricity Consumption',
          data: elecConsumptionsOverTime,
          fill: false,
          borderColor: 'rgb(255, 215, 0)',
          backgroundColor: 'rgb(255, 215, 0)',
      },
      {
        label: 'Water Consumption',
        data: waterConsumptionsOverTime,
        fill: false,
        borderColor: 'rgb(0, 100, 200)',
        backgroundColor: 'rgb(0, 100, 200)',
      },
      {
        label: 'Gas Consumption',
        data: gasConsumptionsOverTime,
        fill: false,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(0, 0, 0)',
      }
  ]
}

const optionsOverTime = {
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
      text: "Carbon Footprint Data Over Time",
    }
  }
}

const chartDataPerEntry = {
  labels: data.map((mockdata) => (mockdata.createdAt).substring(0, 10)), 
  datasets: [
      {
          label: "Total Carbon Footprint", //record type
          data: totalConsumptions,
          fill: false,
          borderColor: 'rgb(0, 200, 100)',
          backgroundColor: 'rgb(0, 200, 100)'
      },
      {
          label: 'Electricity Consumption',
          data: elecConsumptions,
          fill: false,
          borderColor: 'rgb(255, 215, 0)',
          backgroundColor: 'rgb(255, 215, 0)',
      },
      {
        label: 'Water Consumption',
        data: waterConsumptions,
        fill: false,
        borderColor: 'rgb(0, 100, 200)',
        backgroundColor: 'rgb(0, 100, 200)',
      },
      {
        label: 'Gas Consumption',
        data: gasConsumptions,
        fill: false,
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(0, 0, 0)',
      }
  ]
}

const optionsPerEntry = {
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
      text: "Carbon Footprint Data Entries",
    }
  }
}

// Consumptions per Entry graph
//<Line data={chartDataPerEntry} options={optionsPerEntry}/>

  return (
    <div className="graphContainer">
      <div className="graph">
        <Line data={chartDataOverTime} options={optionsOverTime}/>
      </div>
    </div>
  )
}

export default LineChart;