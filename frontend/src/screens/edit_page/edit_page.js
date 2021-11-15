import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import MainScreen from "../../components/main_screen";
import axios from "axios";
import { Button, Card, Accordion} from "react-bootstrap";
import React from "react";
import ReactMarkdown from "react-markdown";

const EditPage = ({match, history}) => {

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	
	//create state for edit page that holds the selected mockdata
	//const [data, setData] = useState();
	const [elecConsumption, setElecConsumption] = useState();
	const [elecCost, setElecCost] = useState();
	const [waterConsumption, setWaterConsumption] = useState();
	const [waterCost, setWaterCost] = useState();
	const [gasConsumption, setGasConsumption] = useState();
	const [date, setDate] = useState();
	const [error, setError] = useState();
	
	useEffect(() => {
		const fetchData = async() => {
			const {mockData} = await axios.get(`/api/data/${match.params.id}`);
			setElecConsumption(mockData.elecConsumption);
			setElecCost(mockData.elecCost);
			setWaterConsumption(mockData.waterConsumption);
			setWaterCost(mockData.waterCost);
			setGasConsumption(mockData.gasConsumption);
			setDate(mockData.updatedAt);
		}
		
		fetchData();
		setError("");
	}, [match.params.id, data.updatedAt]);
	
	const editHandler = (e) => 
		e.preventDefault;
		if (!elecConsumption || !elecCost || !waterConsumption || !waterCost || !gasConsumption) {
			setError("Please fill out all fields");
			return;
		}
		setError("");
		//FIXME: submit using axios
		
		history.push("/mydata");
	}
	
	return (
		<MainScreen title={`Editing Data from {date}`}
			<Card>
				<Card.Header>Edit Data</Card.Header>
				<Card.Body>
					<Form onSubmit={editHandler}>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						
						<Form.Group controlId="elecConsumption">
						<Form.Label>Electricity Consumption</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter electricity consumption in kWh"
							rows={1}
							value={elecConsumption}
							onChange={(e)=>setElecConsumption(e.target.value)}
							endAdornment={<InputAdornment position="end">
											kWh
										</InputAdornment>}
						/>
						</Form.Group>
						
						<Form.Group controlId="elecCost">
						<Form.Label>Electricity Cost</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter electricity cost in $"
							rows={1}
							value={elecCost}
							onChange={(e)=>setElecCost(e.target.value)}
							startAdornment={<InputAdornment position="start">
											$
										</InputAdornment>}
						/>
						</Form.Group>
						
						<Form.Group controlId="waterConsumption">
						<Form.Label>Water Consumption</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter water consumption in gallons"
							rows={1}
							value={waterConsumption}
							onChange={(e)=>setWaterConsumption(e.target.value)}
							endAdornment={<InputAdornment position="end">
											gal
										</InputAdornment>}
						/>
						</Form.Group>
						
						<Form.Group controlId="waterCost">
						<Form.Label>Water Cost</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter water cost in $"
							rows={1}
							value={waterCost}
							onChange={(e)=>setWaterCost(e.target.value)}
							startAdornment={<InputAdornment position="start">
											$
										</InputAdornment>}
						/>
						</Form.Group>
						
						<Form.Group controlId="gasConsumption">
						<Form.Label>Gas Consumption</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter gas consumption in gallons"
							rows={1}
							value={gasConsumption}
							onChange={(e)=>setGasConsumption(e.target.value)}
							endAdornment={<InputAdornment position="end">
											gal
										</InputAdornment>}
						/>
						</Form.Group>
						
						<Button variant="primary" type="submit">
							Update Data
						</Button>
					</Form>
				</Card.Body>
				
				<Card.Footer className="text-muted">
					Updated on = {date.substring(0, 10)}
				</Card.Footer>
			</Card>
		</MainScreen>
	);
};

export default EditPage;
