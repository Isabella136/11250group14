import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './InputForm.css'
import InputAdornment from '@mui/material/InputAdornment';
import ErrorMessage from "../error_message";
import axios from "axios";

const c_electUsage = "c_electUsage";
const c_electCost = "c_electCost";
const waterUsage = "waterUsage";
const c_waterCost = "c_waterCost";
const gasUsage = "gasUsage";
const date = "date";

export default class InputForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmitButton = this.handleSubmitButton.bind(this);
		this.state = {
			textFields : new Map(), //map of values for the input form's text fields. FIXME: initialize map values
			error : Error//tracks whether or not a submission error occurred
		};
	}
	
	handleTextChange(e, i) {
		//let newIterable = map.entries(this.state.textFields); //.slice();
		let arrayTemp = Array.from(this.state.textFields);
		let textFieldsNew = new Map(arrayTemp);
		textFieldsNew.set(i, e.target.value); //FIXME: might be event.target.value 
		this.setState( {
			textFields : textFieldsNew
			//date : date;
			//maintain all other state variables
		} );
	}
	
	
	async handleSubmitButton() {
		//write out stuff to API
		//this.props.userID
		//this.state.textFields
		let elecConsumption = this.state.textFields.get(c_electUsage);
		let elecCost = this.state.textFields.get(c_electCost);
		let waterConsumption = this.state.textFields.get(waterUsage);
		let waterCost = this.state.textFields.get(c_waterCost);
		let gasConsumption = this.state.textFields.get(gasUsage);
		
		elecConsumption = parseInt(elecConsumption);
		elecCost = parseInt(elecCost);
		waterConsumption = parseInt(waterConsumption);
		waterCost = parseInt(waterCost);
		gasConsumption = parseInt(gasConsumption);
		
		try {
			const { data } = await axios.post(
				"/api/data/add",
				{
					elecConsumption,
					elecCost,
					waterConsumption,
					waterCost,
					gasConsumption
				},
				this.props.config
			);
		
			this.props.history.push('/mydata');

		}
		catch(error) {
			this.setState( {
				error : error
			});
		}
	}
	
	
	render() {
		return (
		<div>
			<InputTextFields 
				textFields = {this.state.textFields}
				handleTextChange = {this.handleTextChange}
			/> 
		
			<SubmitButton
				error={this.state.error}
				textFields = {this.state.textFields}
				onClick = {this.handleSubmitButton}
			/>
		</div>
		);
		
	}
};

//props: textFields map, handleTextChange
class InputTextFields extends React.Component { 

		//constructor(props) {
		//	super(props);
		//}
		
		render() {
			/*
		const c_electUsage = "c_electUsage";
		const c_electCost = "c_electCost";
		const waterUsage = "waterUsage";
		const c_waterCost = "c_waterCost";
		const gasUsage = "gasUsage";
		const date = "date";
		*/
		return (
		<div className = "textFields">
			<div className = "text-row">
			<TextField
				hiddenlabel
				value={this.props.textFields.get(c_electUsage)}
				onChange={(e)=> {this.props.handleTextChange(e, c_electUsage)}}
				label="Electricity Usage"
				size="Normal"
				margin="normal"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							kWh
						</InputAdornment>
					)
				}}
			/>
			</div>
			<TextField
				label="Electricity Cost"
				size="Normal"
				value={this.props.textFields.get(c_electCost)}
				onChange={(e)=> this.props.handleTextChange(e, c_electCost)}
				margin="normal"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							$
						</InputAdornment>
					)
				}}
			/>
			<TextField
				label="Water Usage"
				size="Normal"
				value={this.props.textFields.get(waterUsage)}
				onChange={(e)=> this.props.handleTextChange(e, waterUsage)}
				margin="normal"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							gal
						</InputAdornment>
					)
				}}
			/>
			<TextField
				label="Water Cost"
				size="Normal"
				value={this.props.textFields.get(c_waterCost)}
				onChange={(e)=> this.props.handleTextChange(e, c_waterCost)}
				margin="normal"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							$
						</InputAdornment>
					)
				}}
			/>
			<TextField
				label="Gasoline Usage"
				size="Normal"
				value={this.props.textFields.get(gasUsage)}
				onChange={(e)=> this.props.handleTextChange(e, gasUsage)}
				margin="normal"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							gal
						</InputAdornment>
					)
				}}
			/>
			<TextField
				label="Date: MM/DD/YYYY"
				size="Normal"
				value={this.props.textFields.get(date)}
				onChange={(e)=> this.props.handleTextChange(e, date)}
				margin="normal"
				variant="outlined"
			/>
			
		</div>
		);
	}
};

class SubmitButton extends React.Component {
	render() {
		//check for proper date formatting
		let disableButton = false;
		if (this.props.textFields.get("date") === "") {
			disableButton = true;
		}
		return (
		<div className = "submitButton">
		{this.props.error.message && <ErrorMessage variant="danger">{this.props.error.message}</ErrorMessage>} //display message containing error information
		<Button 
			variant="contained"
			disabled={disableButton}
			onClick={()=> {
				this.props.onClick();
			}}
		>
			Submit
		</Button>
		</div>
		);
	}
}