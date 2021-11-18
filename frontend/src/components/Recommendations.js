import { Accordion, ListGroup } from "react-bootstrap";

const Recommendations = () => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Electricity Usage Recommendations</Accordion.Header>
                <Accordion.Body>
                    <ListGroup>
                        <ListGroup.Item> Turn off lights when they are not being used.</ListGroup.Item>
                        <ListGroup.Item> Switch to LED lights! They are more energy-efficient.</ListGroup.Item>
                        <ListGroup.Item> Unplug unusued electronics! Plugged electronics can utilize power even when off.</ListGroup.Item>
                        <ListGroup.Item> Turn off the A/C when you are not home. </ListGroup.Item> 

                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Water Usage Recommendations</Accordion.Header>
                <Accordion.Body>
                <ListGroup>
                        <ListGroup.Item> Do your laundry only on full loads.</ListGroup.Item>
                        <ListGroup.Item> Consider switching to a higher efficiency washing machine.</ListGroup.Item>
                        <ListGroup.Item> Take shorter showers! </ListGroup.Item>
                        <ListGroup.Item> Check faucets and pipes in your home for any leaks! </ListGroup.Item> 
                        
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Gas Usage Recommendations</Accordion.Header>
                <Accordion.Body>
                <ListGroup>
                        <ListGroup.Item> Switch to a hybrid vehicle. They consume less gasoline.</ListGroup.Item>
                        <ListGroup.Item> Avoid high speeds when driving! Higher speeds increase drag on your vehicle, increasing fuel consumption.</ListGroup.Item>
                        <ListGroup.Item> Take public transport options when available!</ListGroup.Item>
                        <ListGroup.Item> Use cruise control to maintain constant speeds over long distances. </ListGroup.Item> 
                        
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
};

export default Recommendations