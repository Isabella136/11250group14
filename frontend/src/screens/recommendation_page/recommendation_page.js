import MainScreen from "../../components/main_screen";
import Recommendations from "../../components/Recommendations";
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {Card, Accordion } from "react-bootstrap";
import axios from "axios";
import React from "react";

const RecommendationsPage = () => {
    const [data, setData] = useState([]);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };
    const fetchData = async () => {
        const { data } = await axios.get("/api/rec", config);
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <MainScreen title="Recommendations">
            <Accordion key={`Recommandation for ${userInfo && userInfo.name}`}>
                <Card style={{ margin: 10 }}>
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
                            AI's Assessment:
                        </span>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                            {
                                data.map(AI => (
                                    <p>{AI.reductionMessage}</p>
                                ))
                            }   
                            <footer className="blockquote-footer">
                                Usually takes less than 10sec to load
                            </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Accordion>
            <div className='rowC'>
                <Recommendations />
            </div>
        </MainScreen>

  )
};

export default RecommendationsPage;
