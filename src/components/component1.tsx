import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef,} from '@mui/x-data-grid';
import {Box,Typography,Paper} from '@mui/material';

import axios from 'axios';

// Define the TypeScript model/interface for the data
interface Post {
  userId:number;
  id: number;
  title: string;
  body: string;
}

const Component1:React.FC = () => {
    const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Define columns for the MUI Data Grid
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'USERID', width: 100 },
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];
  return (
    <Box>
         <Typography fontWeight="bold" variant='h5' textAlign="center" padding="10px 0 0 0">Welcome To React App</Typography>
      <Typography fontWeight="bold"  textAlign="center" padding={1} >Data Fetching Using API</Typography>
      <Paper elevation={2} sx={{height:450,borderRadius:"40px",position:'relative',overflow:'hidden'}}>
      <DataGrid
        sx={{padding:1}}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
      </Paper>

    </Box>
  )
}

export default Component1