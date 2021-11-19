import React from 'react';
import {Line} from 'react-chartjs-2';
import '../App.css';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";

const LineChartDataTotal = () => {
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
    const waterConsumptions = data.map((mockdata) => mockdata.waterConsumption);
    const gasConsumptions = data.map((mockdata) => mockdata.gasConsumption);

    // Adding to create consumptions over time
    const elecConsumptionsOverTime = elecConsumptions.map((s => a => s += a)(0));
    const waterConsumptionsOverTime = waterConsumptions.map((s => a => s += a)(0));
    const gasConsumptionsOverTime = gasConsumptions.map((s => a => s += a)(0));

    // Converting to kg CO2
    // Elec: 0.386/kWh (Source: https://www.eia.gov/tools/faqs/faq.php?id=74&t=11)
    for (let i = 0; i < elecConsumptionsOverTime.length; i++) {
        elecConsumptionsOverTime[i] = elecConsumptionsOverTime[i] * 0.386
    }
    // Water: 0.00262/gallon(Source: https://awwa.onlinelibrary.wiley.com/doi/full/10.5942/jawwa.2012.104.0064)
    for (let i = 0; i < waterConsumptionsOverTime.length; i++) {
        waterConsumptionsOverTime[i] = waterConsumptionsOverTime[i] * 0.00262
    }
    // Gas: 8.50/gallon (Source: https://www.eia.gov/environment/emissions/co2_vol_mass.php)
    for (let i = 0; i < gasConsumptionsOverTime.length; i++) {
        gasConsumptionsOverTime[i] = gasConsumptionsOverTime[i] * 8.5
    }

    // Adding to create total consumption over time
    const totalConsumptionsOverTime = [];
    for (let i = 0; i < elecConsumptionsOverTime.length; i++) {
        totalConsumptionsOverTime[i] = elecConsumptionsOverTime[i] + waterConsumptionsOverTime[i] + gasConsumptionsOverTime[i];
    }

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

    return (
        <div className="graphContainer">
            <div className="graph">
                <Line data={chartDataOverTime} options={optionsOverTime} />
            </div>
        </div>
    )
}

export default LineChartDataTotal;