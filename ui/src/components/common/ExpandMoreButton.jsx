import React from "react";
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ExpandMoreIcon } from '../../icon';

const ExpandMoreButton = styled(props => {
    const { expand, children, ...other } = props;

    return (
        <IconButton 
            {...other}
            aria-label={expand ? "Свернуть" : "Раскрыть"}
        >
            <ExpandMoreIcon />
        </IconButton>
    );
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default ExpandMoreButton;