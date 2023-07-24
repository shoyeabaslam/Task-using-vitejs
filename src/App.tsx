// FirstPage.tsx

import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'; 
import FirstPage from './components/firstPage';
import SecondPage from './components/secondPage';
import {Typography,Container } from '@mui/material';

export const RestrictedComponent = ()=>{
  const [countDown,setCountDown] = useState(5);
  useEffect(() => {
    if(!localStorage.getItem("userDetails")){
      const x = setInterval(() => {
        if (countDown > 1) {
          setCountDown(countDown - 1);
        }
        if(countDown==1){
          localStorage.clear()
          window.location.href = "/"
        }
      }, 1000);
      return () => {
        clearInterval(x);
      };
    }
   
  }, [countDown,setCountDown]);
  
    return(
    <>
      {
        !localStorage.getItem("userDetails")?(
        <Container>
          <Typography textAlign="center" marginTop="50px" fontSize="2.5rem">Invalid Access</Typography>
          <Typography textAlign="center">Please Fill The Login Credentials To Access This Page</Typography>
          <Typography textAlign="center">{`Redirecting in ${countDown} sec`}</Typography>
        </Container>):
        <SecondPage/>
      }
    </>
  )
 
}

const App: React.FC = () => {


  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path="/secondPage" element={<RestrictedComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
