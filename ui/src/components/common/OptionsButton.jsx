import React, { useRef, useState } from "react";
import { IconButton, Menu } from '@mui/material';

import { MoreVertIcon } from "../../icon";

const OptionsButton = ({ id, icon, children, IconButtonProps = {}, MenuProps = {} }) => {
    const optionsButtonRef = useRef();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <IconButton
                id={`options-button-${id}`}
                color="primary"
                aria-controls={`menu-${id}`}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={() => setMenuOpen(!menuOpen)}
                ref={optionsButtonRef}
                {...IconButtonProps}
            >
                {icon ?? <MoreVertIcon />}
            </IconButton>
            <Menu
                id={`menu-${id}`}
                anchorEl={optionsButtonRef.current}
                open={menuOpen}
                onClose={() => setMenuOpen(!menuOpen)}
                MenuListProps={{
                    'aria-labelledby': `options-button-${id}`,
                }}
                {...MenuProps}
            >
                {children}
            </Menu>
        </>
    );
};

export default OptionsButton;