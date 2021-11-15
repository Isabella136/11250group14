import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import MainScreen from "../../components/main_screen";
import axios from "axios";
import InputForm from "../../components/InputForm/InputForm";


const InputPage = ({ history }) => {
	
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
	  user: userInfo._id
    },
  };
 

    return (
      <MainScreen title={`Welcome Back ${userInfo && userInfo.name}!`}>
        <InputForm config={config} history={history}/>
      </MainScreen>
    );
};

export default InputPage;
