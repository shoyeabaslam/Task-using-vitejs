// FirstPage.tsx

import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
  name: string;
  phoneNumber: string;
  email: string;
}

const FirstPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const navigator = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      if(localStorage.getItem("userDetails")){
        navigator('/secondPage')
      }
  };

  return (
    <Grid container minHeight="100vh" display="flex" justifyContent="center"   alignItems="center">
      <Grid item xs={10} sm={8} lg={5}>
        <Paper elevation={2} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Enter Your Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FirstPage;
