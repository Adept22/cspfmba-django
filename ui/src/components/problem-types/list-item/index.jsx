import React from 'react';
import { Avatar, Card, CardHeader, Skeleton } from '@mui/material';

import OptionsButton from './OptionsButton';

const stringAvatar = name => ({
    children: `${name[0] ?? ''}`,
    alt: name,
    title: name
});

const ProblemTypeListItem = ({ id, index, name }) => {
    name = name ?? `Тип проблемы ${index}`;

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    name
                        ? <Avatar {...stringAvatar(name)} />
                        : <Skeleton variant="circular" animation="wave" width="40px" height="40px" />
                }
                action={<OptionsButton id={id} />}
                title={name ?? <Skeleton variant="text" animation="wave" width="200px" height="100%" />}
                subheader={<Skeleton variant="text" animation="wave" width="130px" height="100%" />}
            />
        </Card>
    )
};

export default ProblemTypeListItem;