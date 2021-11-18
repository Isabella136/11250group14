import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Button, Card, Accordion} from "react-bootstrap";
import {Link} from "react-router-dom";
import MainScreen from "../../components/main_screen";
import axios from "axios";

const MyData = () => {

  const [data, setData] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  //user authorization
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const deleteHandler = async(id) => {
    if (window.confirm("Are you sure?")) {
		try {
			const {res} = await axios.delete(`/api/data/${id}`, config);

		}
		catch(error) {
			console.log(error);
		}
    }
    fetchData();
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api/data", config);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [])

    return (
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name}!`}>
        <Link to='createnote'>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Add New Data
          </Button>
        </Link>
            {
              data.map(mockdata => (
                <Accordion key={mockdata._id}>
                  <Card style={{ margin:10 }}>
                    <Card.Header style={{ display: "flex" }}>
                      <span
                        style={{
                              color: "black",
                              textDecoration: "none",
                              flex: 1,
                              cursor: "pointer",
                              alignSelf: "center",
                              fontSize: 18,
                            }}
                        >
                        Created On: {mockdata.createdAt.substring(0,10)}
                        </span>
                      <div>
                        <Button href={`/dataedit/${mockdata._id}`}>Edit</Button>
                        <Button variant='danger' className="mx-2" onClick={() => deleteHandler(mockdata._id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>Electric Consumption: {mockdata.elecConsumption}</p>
                      <p>Electric Cost: {mockdata.elecCost}</p>
                      <p>Water Consumption: {mockdata.waterConsumption}</p>
                      <p>Water Cost: {mockdata.waterCost}</p>
                      <p>Gas Consumption: {mockdata.gasConsumption}</p>
                      <footer className="blockquote-footer">
                        Updated On : {mockdata.updatedAt.substring(0,10)}
                      </footer>
                    </blockquote>
                    </Card.Body>
                  </Card>
                </Accordion>
              ))
            }
      </MainScreen>
    );
};


export default MyData;
