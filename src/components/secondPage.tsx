// SecondPage.tsx

import React from 'react';
import {Container} from '@mui/material';
import Component2 from './component2';
import Component1 from './component1';



const SecondPage: React.FC = () => {

  return (
    <Container style={{ width: '100%' }}>
        <Component1/>
        <Component2/>
    </Container>
  );
};

export default SecondPage;
