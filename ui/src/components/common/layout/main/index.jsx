import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';

import Header from '../header';
import Footer from '../footer';

const theme = createTheme({
    palette: {
        primary: {
            light: '#6EC1E4',
            main: '#42B3AB',
            dark: '#a6000d',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#e8eef8',
            main: '#54595F',
            dark: '#868c95',
            contrastText: '#7A7A7A'
        },
        background: {
            paper: '#ffffff',
            default: '#eef1f6',
        },
        skeleton: {
            primary: {
                main: 'rgba(255, 255, 255, 0.11)',
                light: 'rgba(255, 255, 255, 0.06)'
            },
            secondary: {
                main: 'rgba(0, 0, 0, 0.11)',
                light: 'rgba(0, 0, 0, 0.06)'
            }
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: "hover"
            }
        }
    }
});

/**
 * Отображает тело страницы
 */
const Main = props => (
    <ThemeProvider theme={theme}>
        <Header />
        <Box component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1 0 auto',
            pt: 3,
            px: 2,
            height: '100%',
            maxHeight: `calc(100% - 64px - 52px)`,
            ...props.sx
        }}>
            <CssBaseline />
            {props.children}
        </Box>
        <Footer />
    </ThemeProvider>
);

export default Main;