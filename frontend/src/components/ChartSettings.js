import React from 'react';
import '../App.css';

const ChartSettings = () => {
    return(
        <form>
            <div className="container">

                <h2> Graph Settings </h2>
                <h3> Electricity </h3>
                <label><input id="elecConsumption" type="checkbox"/>Electricity Consumption (kWh)</label>
                <br />
                <label><input id="elecCost" type="checkbox"/>Electricity Bill Cost ($)</label>
                <br />
                <h3> Water </h3>
                <label><input id="waterConsumption" type="checkbox"/>Water Consumption (gallons)</label>
                <br />
                <label><input id="waterCost" type="checkbox"/>Water Bill Cost ($)</label>
                <br />
                <h3> Gas </h3>
                <label> <input id="gasConsumption" type="checkbox"/>Gas Consumption(gallons)</label>

            </div>
        </form>

    )
}

export default ChartSettings
