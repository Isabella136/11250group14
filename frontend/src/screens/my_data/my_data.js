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

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {

    }
  };

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

    return (
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name}!`}>
        <Link to='createnote'>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Note
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
                        {mockdata.month}
                        </span>
                      <div>
                        <Button href={`/data/${mockdata._id}`}>Edit</Button>
                        <Button variant='danger' className="mx-2" onClick={() => deleteHandler(data._id)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>{mockdata.type}</p>
                      <p>{mockdata.value}</p>
                      <footer className="blockquote-footer">
                        Created On -{mockdata.createdAt}
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
