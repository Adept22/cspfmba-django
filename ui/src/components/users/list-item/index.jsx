import React from 'react';
import { Avatar, Card, CardHeader, Skeleton } from '@mui/material';

import OptionsButton from './OptionsButton';

const stringAvatar = name => ({
    children: `${name[0] ?? ''}`,
    alt: name,
    title: name
});

const UserListItem = ({ id, index, email }) => {
    email = email ?? `Пользователь ${index}`;

    return (
        <Card variant="outlined">
            <CardHeader
                avatar={
                    email
                        ? <Avatar {...stringAvatar(email)} />
                        : <Skeleton variant="circular" animation="wave" width="40px" height="40px" />
                }
                action={<OptionsButton id={id} />}
                title={email ?? <Skeleton variant="text" animation="wave" width="200px" height="100%" />}
                subheader={<Skeleton variant="text" animation="wave" width="130px" height="100%" />}
            />
        </Card>
    )
};

export default UserListItem;