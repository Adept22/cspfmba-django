import React, { useRef, useState } from "react";
import { ButtonBase, IconButton, Menu, MenuItem } from '@mui/material';

import { MoreVertIcon } from "../../../icon";
import { Form } from "react-router-dom";

const OptionsButton = props => {
    const optionsButtonRef = useRef();

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <IconButton
                id={`event-user-problem-type-options-button-${props.id}`}
                color="primary"
                aria-label="Опции"
                aria-controls={`event-user-problem-type-menu-${props.id}`}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={() => setMenuOpen(!menuOpen)}
                ref={optionsButtonRef}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id={`event-user-problem-type-menu-${props.id}`}
                anchorEl={optionsButtonRef.current}
                open={menuOpen}
                onClose={() => setMenuOpen(!menuOpen)}
                MenuListProps={{
                    'aria-labelledby': `event-user-problem-type-options-button-${props.id}`,
                }}
            >
                <MenuItem onClick={props.onChange}>
                    Изменить
                </MenuItem>
                <Form
                    method="post"
                    action={`${props.id}/delete`}
                    onSubmit={e => e.preventDefault()}
                >
                    <MenuItem component={ButtonBase} type="submit" sx={{ width: '100%' }}>
                        Удалить
                    </MenuItem>
                </Form>
            </Menu>
        </>
    );
};

export default OptionsButton;