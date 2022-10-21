import React from "react";
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { HomeIcon, EmojiEventsIcon, AccountCircleIcon, ErrorOutlineIcon, SyncProblemIcon } from '../../../../icon';

const SideMenu = props => (
    <Drawer
        sx={{
            width: '240px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: '240px',
                boxSizing: 'border-box',
            },
        }}
        variant="temporary"
        anchor="left"
        open={props.open}
        onClose={props.onClose}
        ModalProps={{
            keepMounted: true,
        }}
    >
        <List>
            <ListItemButton component={NavLink} divider to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText  primary="Рабочий стол" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/events">
                <ListItemIcon><EmojiEventsIcon /></ListItemIcon>
                <ListItemText primary="События" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/users">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Пользователи" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/problem-types">
                <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
                <ListItemText primary="Типы проблем" />
            </ListItemButton>
            <ListItemButton component={NavLink} to="/event-user-problem-types">
                <ListItemIcon><SyncProblemIcon /></ListItemIcon>
                <ListItemText primary="Связи" />
            </ListItemButton>
        </List>
    </Drawer>
);

export default SideMenu;