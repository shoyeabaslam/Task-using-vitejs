import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {Container,Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Data {
  department: string;
  sub_departments: string[];
}

const data: Data[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];


const dictionaryData: { [key: string]: { department: boolean; sub_departments: { [key: string]: boolean } } } = {};

data.forEach(({ department, sub_departments }) => {
  const subDeptObj = sub_departments.reduce((acc, subDept) => ({ ...acc, [subDept]: false }), {});
  dictionaryData[department] = {
    department: false,
    sub_departments: subDeptObj,
  };
});





const Componet2: React.FC = () => {
//  console.log(dictionaryData['customer_service'].department)

  const [dictionaryDataState,setDictionaryDataState] = useState(dictionaryData);


  const handleParentFuntion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked: isChecked } = event.target;

    // Create a new copy of dictionaryData
    const updatedDictionaryData = {
      ...dictionaryDataState,
      [name]: {
        ...dictionaryDataState[name],
        department: isChecked,
        sub_departments: {
          ...dictionaryDataState[name].sub_departments,
        },
      },
    };

    // Update the sub_departments of the department
    if (isChecked) {
      Object.entries(updatedDictionaryData[name].sub_departments).forEach(([key]) => {
        updatedDictionaryData[name].sub_departments[key] = true;
      });
    } else {
      Object.entries(updatedDictionaryData[name].sub_departments).forEach(([key]) => {
        updatedDictionaryData[name].sub_departments[key] = false;
      });
    }

    // Update the state with the new copy
    setDictionaryDataState(updatedDictionaryData);
  };

  const handleChildFuntion = (event: React.ChangeEvent<HTMLInputElement>, department: string) => {
    const { name, checked: isChecked } = event.target;
    // Create a new copy of dictionaryData
    const updatedDictionaryData = {
      ...dictionaryDataState,
      [department]: {
        ...dictionaryDataState[department],
        sub_departments: {
          ...dictionaryDataState[department].sub_departments,
          [name]: isChecked,
        },
      },
    };

    // Update the state with the new copy
    setDictionaryDataState(updatedDictionaryData);

    // Check if all sub_departments[name] are true
  const allSubDepartmentsChecked = Object.values(updatedDictionaryData[department].sub_departments).every(Boolean);

  // Update the department if all sub_departments are true
  updatedDictionaryData[department].department = allSubDepartmentsChecked;

  // Update the state with the new copy
  setDictionaryDataState(updatedDictionaryData);

  };

  return (
    <Container style={{ width: '100%' ,padding:'20px'}}>
      <Typography variant='h5' padding={2} fontWeight='bold'>List of department and each department has sub departments</Typography>
      {data.map((items, key) => (
        <Box key={key}>
          <FormControlLabel
            label={items.department}
            control={
              <Checkbox
                name={items.department}
                onChange={handleParentFuntion}
                indeterminate={dictionaryDataState[items.department].department !== Object.values(dictionaryDataState[items.department].sub_departments).some(Boolean)}
                checked = {dictionaryDataState[items.department].department}
              />
            }
          />
          {items.sub_departments.map((subItems, subKey) => (
            <Box
              key={subKey}
              sx={{ display: "flex", flexDirection: "column", ml: 3 }}
            >
              <FormControlLabel
                label={subItems}
                control={
                  <Checkbox
                    name={subItems}
                    onChange={(event) => {
                      handleChildFuntion(event, items.department);
                    }}
                    checked={dictionaryDataState[items.department].sub_departments[subItems]}
                  />
                }
              />
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default Componet2;
