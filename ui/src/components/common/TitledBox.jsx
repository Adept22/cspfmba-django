import React, { useState } from 'react';
import { Box, Stack, Divider, Typography, Collapse, Badge, Skeleton } from '@mui/material';

import ExpandMoreButton from './ExpandMoreButton';

const Content = props => {
    const { collapse, expanded, children, ...other } = props;

    return React.createElement(
        collapse ? Collapse : React.Fragment, 
        collapse ? { in: expanded, timeout: "auto", unmountOnExit: true, ...other } : { }, 
        children
    );
};

const TitledBox = props => {
    const { 
        component, 
        title, 
        titleProps, 
        badge, 
        subtitle, 
        subtitleProps, 
        deviderProps, 
        contentProps, 
        link, 
        toolbar, 
        children, 
        sx, 
        collapse, 
        ...other
    } = props;

    const useCollapse = typeof collapse === 'object';

    let defaultExpanded = false;
    let newCollapseProps = {};

    if (useCollapse) {
        const { expanded, ...collapseProps } = collapse;

        defaultExpanded = expanded ?? false;
        newCollapseProps = collapseProps ?? {};
    }

    const [expanded, setExpanded] = useState(defaultExpanded);

    const newChildren = (
        <>
            <Stack
                spacing={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                alignItems="center"
                justifyContent="space-between"
            >
                <Box sx={{ flex: '1 0' }}>
                    <Badge 
                        color="primary" 
                        badgeContent={badge ?? 0} 
                        sx={{ '& > .MuiBadge-badge': { right: -20, top: 16 } }}
                    >
                        <Typography 
                            variant="h5" 
                            {...titleProps} 
                            title={title}
                        >
                            {
                                !title ? (
                                    <Skeleton
                                        animation="wave"
                                        width={300}
                                        height="100%"
                                    />
                                ) : title
                            }
                        </Typography>
                    </Badge>
                    {
                        typeof subtitle !== 'undefined' ? (
                            <Typography 
                                variant="subtitle1" 
                                color="text.secondary" 
                                {...subtitleProps} 
                                title={subtitle}
                            >
                                {subtitle}
                            </Typography>
                        ) : null
                    }
                </Box>
                {toolbar}
                {
                    collapse ? (
                        <ExpandMoreButton
                            expand={expanded}
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                        />
                    ) : null
                }
            </Stack>
            <Content 
                {...newCollapseProps} 
                collapse={useCollapse} 
                expanded={expanded}
            >
                <Divider sx={{ my: 2 }} {...deviderProps} />
                <Box overflow="auto" {...contentProps}>
                    {children}
                </Box>
            </Content>
        </>
    );

    return React.createElement(
        component ?? Box,
        {
            ...other,
            sx: {
                px: 2,
                py: 3,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                boxSizing: 'border-box',
                ...sx
            }
        },
        newChildren
    );
};

export default TitledBox;