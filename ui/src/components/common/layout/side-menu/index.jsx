import React from "react";
import { Link } from "react-router-dom";

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

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
            <ListItem component={Link} button divider to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText  primary="Рабочий стол" />
            </ListItem>
            <ListItem component={Link} button to="/events">
                <ListItemIcon><EmojiEventsIcon /></ListItemIcon>
                <ListItemText primary="События" />
            </ListItem>
            <ListItem component={Link} button to="/users">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Пользователи" />
            </ListItem>
            <ListItem component={Link} button to="/problem-types">
                <ListItemIcon><ErrorOutlineIcon /></ListItemIcon>
                <ListItemText primary="Типы проблем" />
            </ListItem>
            <ListItem component={Link} button to="/event-user-problem-types">
                <ListItemIcon><SyncProblemIcon /></ListItemIcon>
                <ListItemText primary="Связи" />
            </ListItem>
        </List>
    </Drawer>
);

export default SideMenu;