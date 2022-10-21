import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { AppBar, Toolbar, IconButton, Breadcrumbs, Link as MuiLink } from '@mui/material';

import { MenuIcon } from '../../../../icon';

import SideMenu from '../side-menu';

/**
 * Отображает шапку страницы
 */
const Header = () => {
    const breadcrumbs = useBreadcrumbs();

    const [sideMenuOpen, setSideMenuOpen] = useState(false);

    return (
        <>
            <AppBar
                position="static"
                open={sideMenuOpen}
                sx={{
                    flex: '0 0 auto'
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: 'primary.contrastText' }}
                        onClick={() => setSideMenuOpen(!sideMenuOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'primary.contrastText', '& > ol': { alignItems: 'baseline' } }}>
                        {breadcrumbs.map(({ match, breadcrumb }) =>
                            <MuiLink
                                component={Link}
                                key={match.pathname}
                                to={match.pathname}
                                sx={{ color: 'primary.contrastText' }}
                            >
                                {breadcrumb}
                            </MuiLink>
                        )}
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
            <SideMenu open={sideMenuOpen} onClose={() => setSideMenuOpen(!sideMenuOpen)} />
        </>
    );
};

export default Header;
