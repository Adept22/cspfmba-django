import React from 'react';
import { Typography } from '@mui/material';


const Home = () => (
    <Typography
        component="div"
        variant="h4"
        color="text.secondary"
        sx={{
            mt: 4,
            textAlign: 'center'
        }}
    >
        Пример простой админ-панели
    </Typography>
);

export default Home;
