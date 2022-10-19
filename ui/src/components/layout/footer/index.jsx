import React from 'react';
import { Typography, Box, Link } from '@mui/material';

/**
 * Отображает футер страницы
 */
const Footer = () => (
    <Box component="footer" sx={{ position: 'relative', p: 2, flex: '0 0 auto' }}>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/Adept22">Vladislav Terenchuk</Link>
            {' '}{new Date().getFullYear()}
            {'.'}
        </Typography>
    </Box>
);

export default Footer;
